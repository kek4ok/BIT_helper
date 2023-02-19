import sqlite3
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.utils import executor
import config

bot = Bot(token=config.API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)


# Состояния сообщений
class Form(StatesGroup):
    question = State()
    answer = State()
    category = State()
    key_words = State()


# Хэндлер стартовой команды
@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE id = ?', (message.from_user.id,))
    id = cursor.fetchone()
    conn.close()
    if id is None:
        await create_user_profile(message.from_user.id)
        await message.answer(
            text=f'🤖 Привет, я специально обученный Бот, который поможет добавить новые вопросы в Базу Данных с вопросами!\n\nЧтобы добавить новый вопрос воспользуйся командой /add_question')
    else:
        await message.answer(
            text=f'📚 Чтобы добавить новый вопрос, воспользуйся командой - /add_question\n\nЧтобы посмотреть статистику, воспользуйся - /stat')


# Хэндлер команды добавления вопроса
@dp.message_handler(commands=['add_question'])
async def add_question(message: types.Message):
    if message.from_user.id not in config.ADMINS:
        await Form.question.set()
        await message.answer(text=f'🤖 Отправь вопрос, который хочешь добавить в Базу Данных:')
    else:
        await message.answer(text='🤖 К сожалению, ты не можешь воспользоваться данной командой :c')


# Хэндлер команды для получения статистики
@dp.message_handler(commands=['stat'])
async def add_question(message: types.Message):
    if message.from_user.id not in config.ADMINS:
        questions = await take_questions()
        sorted(questions)
        await message.answer(
            text=f'🤖 Топ 5 самых популярных вопросов:\n\n1.   {questions[0][0]} - {questions[0][1]} запросов\n2.   {questions[1][0]} - {questions[1][1]} запросов\n3.   {questions[2][0]} - {questions[2][1]} запросов\n4.   {questions[3][0]} - {questions[3][1]} запросов\n5.   {questions[4][0]} - {questions[4][1]} запросов\n')
    else:
        await message.answer(text='🤖 К сожалению, ты не можешь воспользоваться данной командой :c')


# Хэндлер отмены добавления нового вопроса
@dp.message_handler(state='*', commands='cancel')
@dp.message_handler(Text(equals='Отмена', ignore_case=True), state='*')
async def cancel_handler(message: types.Message, state: FSMContext):
    current_state = await state.get_state()
    if current_state is None:
        return

    await state.finish()
    await message.reply('🤖 Ок')


# Хэндлер добавления вопроса
@dp.message_handler(state=Form.question)
async def process_question(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['question'] = message.text

    await Form.next()
    await message.reply('🤖 Введи ответ на заданный вопрос:')


# Хэндлер добавления ответа на вопрос
@dp.message_handler(state=Form.answer)
async def process_answer(message: types.Message, state: FSMContext):
    await state.update_data(answer=message.text)

    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    markup.add('Технический', 'Финансовый', 'Форма')
    markup.add('Другое')

    await Form.next()
    await message.reply('🤖 Выбери категорию из предложенных на клавиатуре', reply_markup=markup)


# @dp.message_handler(lambda message: message.text not in ['Технический', 'Финансовый', 'Форма', 'Другое'], state=Form.category)
# async def process_category_invalid(message: types.Message):
# return await message.reply('🤖 Не знаю такую категорию, выбери из предложенных')


# Хэндлер добавления категории вопроса
@dp.message_handler(state=Form.category)
async def process_category(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['category'] = message.text
        markup = types.ReplyKeyboardRemove()
        await Form.next()
        await message.answer(text='🤖 Отправь ключевые слова через запятую, которые относятся к добавленному вопросу:',
                             reply_markup=markup)


# Хэндлер добавления ключевых слов
@dp.message_handler(state=Form.key_words)
async def process_key_words(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['key_words'] = message.text
        await add_new_question(data['question'], data['answer'], data['category'], data['key_words'])
        await message.answer(text='🤖 Вопрос был успешно добавлен!')

        await state.finish()


# Создание профиля пользователя
async def create_user_profile(id: int) -> None:
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (id) VALUES (?)', [id])
    conn.commit()
    conn.close()


# Функция добавления инф-ции в БД
async def add_new_question(question: str, answer: str, category: str, key_words: str) -> None:
    conn = sqlite3.connect("questions.db")
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO Questions (question, answer, category, count, key_words, status) VALUES (?, ?, ?, ?, ?, ?)',
        [question, answer, category, key_words, 1, 0])
    conn.commit()
    conn.close()


# Функция получения вопросов
async def take_questions():
    conn = sqlite3.connect("questions.db")
    cursor = conn.cursor()
    cursor.execute('SELECT question, key_words FROM Questions')
    questions = cursor.fetchall()
    conn.close()

    return questions


# иницаилизация БД пользователей
def init_db():
    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users')
        cursor.close()
        conn.close()
        print('База данных найдена, начинаю работу!'.encode('utf-8'))
    except Exception:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        cursor.execute(
            'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL)'
        )
        conn.commit()
        conn.close()
        print('База данных не найдена, создаю и начинаю работу!'.encode('utf-8'))


if __name__ == '__main__':
    init_db()
    executor.start_polling(dp, skip_updates=True)
