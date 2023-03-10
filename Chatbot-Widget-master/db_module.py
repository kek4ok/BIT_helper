import sqlite3


def get_keywords():
    conn = sqlite3.connect("bot/questions.db")
    cursor = conn.cursor()
    cursor.execute('SELECT question, count FROM Questions')
    result = cursor.fetchall()
    conn.close()

    return result


def get_answer(question):
    if question is None:
        return 'Не получилось найти ответ на ваш вопрос... Я позову человека!'
    else:
        conn = sqlite3.connect("bot/questions.db")
        cursor = conn.cursor()
        cursor.execute(f"SELECT answer FROM Questions WHERE question like '{question}'")
        result = cursor.fetchone()
        conn.close()

    return result[0]

