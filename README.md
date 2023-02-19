<h1>Цифровой ассистент</h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<div>
    <h4>Реализованная функциональность</h4>
    <ul>
        <li>Путеводитель по сайту;</li>
        <li>Синтез речи;</li>
        <li>Умный помощник чат-бот, отвечающий на вопросы пользователей;</li>
      <li>Админ панель через телеграм для быстрого модерирования;</li>
    </ul> 
    <h4>Особенности проекта</h4>
    <ul>
     <li>Функционал для людей с ограниченными возможностями (распознавание речи);</li>
     <li>Масштабируемость;</li>
     </ul>
    <h4>Основной стек технологий:</h4>
    <ul>
      <li>HTML, CSS, JavaScript</li>
      <li>Python, SQLite3</li>
    </ul>
    <h4>Демо</h4>
    <p>Демо сервиса доступно по адресу: http://45.95.202.88/</p>
</div>

[![](https://github.com/kek4ok/BIT_helper/blob/main/img/demo.png)](https://github.com/kek4ok/BIT_helper/blob/main/img/demo.png)

Среда запуска
------------
<ul>
    <li>Unix-подобные ОС (Ubuntu, Debian, etc..);</li>
    <li>Web-сервер с поддержкой (Apache, Nginx);</li>
    <li>Интерпретатор Python 3.8+;</li>
    <li>Пакеты зависимостей requirements.txt;</li>
</ul>

Установка
------------

### Настройка и установка зависимостей проекта

Выполните

~~~
git clone https://github.com/kek4ok/BIT_helper
cd BIT_helper
pip3 install -r requirements.txt
cp -R /html /var/www/
~~~

### База данных

Решение использует локальную базу данных SQLite3, которая создается в автоматическом режиме при первом запуске.

Запуск
------------

После выполнения установки проекта, выполните:

~~~
cd Chatbot-Widget-master
uvicorn api:app --port=8000 --host='0.0.0.0' --reload
~~~

После выполнения данных операций, проект готов к работе!
