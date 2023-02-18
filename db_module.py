import sqlite3


def get_keywords():
    conn = sqlite3.connect("bot/questions.db")
    cursor = conn.cursor()
    cursor.execute('SELECT question, key_words FROM Questions')
    result = cursor.fetchall()
    conn.close()

    return result


def get_answer(question):
    if question is None:
        return 'NO ANSWER TO THIS QUESTION'
    else:
        conn = sqlite3.connect("bot/questions.db")
        cursor = conn.cursor()
        cursor.execute(f"SELECT answer FROM Questions WHERE question like '{question}'")
        result = cursor.fetchone()
        conn.close()

    return result[0]
