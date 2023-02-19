import sqlite3

API_TOKEN = '6137327470:AAEIAsQxDAn96TPr5-7r940-Y39mqE9mK18'
ADMINS = [549408350]

conn = sqlite3.connect("../Chatbot-Widget-master/bot/questions.db")
cursor = conn.cursor()
cursor.execute('SELECT question, key_words FROM Questions')
questions = cursor.fetchall()
conn.close()

print(questions)