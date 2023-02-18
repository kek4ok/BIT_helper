import requests

url = 'http://127.0.0.1:8000/questions_send'
data = {
    "question": "dasdasds",
    "user_id": 312312,
    'question_id': 1
}

res = requests.post(url, json=data)
print(res.text)