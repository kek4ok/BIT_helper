import sqlite3

conn = sqlite3.connect('bot/questions.db')


def init_db():
    try:
        conn = sqlite3.connect('bot/questions.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * DEOM users')
        cursor.close()
        conn.close()
        print('БД найдена')
    except Exception:
        conn = sqlite3.connect('bot/questions.db')
        cursor = conn.cursor()
        cursor.execute(
            'create table if not exists Questions(id INT PRIMARY KEY AUTOINCREMENT,question VARCHAR(255) NOT NULL,answer VARCHAR(255) NOT NULL,category VARCHAR(30) NOT NULL,count INT NOT NULL DEFAULT 1,key_words VARCHAR(255) NOT NULL,status VARCHAR(255) NOT NULL DEFAULT 0);')
        conn.commit()
        conn.close()
        print('БД не найдена, создаю новую')


if __name__ == '__main__':
    init_db()
