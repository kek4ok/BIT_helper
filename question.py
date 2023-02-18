import re
from db_module import get_keywords, get_answer


def check_keywords(question: str):
    question_and_keywords = get_keywords()

    for part in question_and_keywords:
        db_question = part[0]
        key_words = part[1].split(', ')
        r = '|'.join(rf'\b{x}\b' for x in key_words).replace(' ', r'\s+')

        for text in question.split(' '):
            res = re.findall(r, text, re.IGNORECASE)
            if res:
                print(f'Совпадения из списка найдены в вопросе `{text}`: `{db_question}`')
                return db_question



def answer_to_question(user_question='Привет как какать?'):
    question = check_keywords(user_question)
    print(question)
    answer = get_answer(question)
    return answer
