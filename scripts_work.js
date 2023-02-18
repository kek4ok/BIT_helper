function showProjects1() {
    // находим ссылку на проекты и остальные ссылки
    const projectsLink = document.querySelector('a[href="/projects"]');
    const otherLinks = document.querySelectorAll('a:not([href="/projects"])');

    // добавляем текстовое сообщение
    const message = document.createElement('div');
    message.textContent = 'Нажми на МОИ ПРОЕКТЫ';
    message.style = `
      color: black;
      background-color: var(--color-primary);
      padding: 40px;
      border-radius: 20px 20px 0px 20px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      z-index: 10;
      width: 600px;
    `;
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png'; // ссылка на картинку
    image.style = `
      position: fixed;
      top: 70%;
      left: 70%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 150px;
      border-radius: 50px;
    `;

    document.body.appendChild(message);
    document.body.appendChild(image);

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('click', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();
        image.remove();


        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('click', onProjectsLinkClick);
        setTimeout(() => {
            showProjects2();
        }, "1000")
    });

};


function showProjects2() {
    // находим ссылку на проекты и остальные ссылки
    const projectsLink = document.querySelector('.projects-select_wrapper_hcRmb');
    const otherLinks = document.querySelectorAll(':not(.projects-select_wrapper_hcRmb)');

    // добавляем текстовое сообщение
    const message = document.createElement('div');
    message.textContent = 'Нажми на ДОБАВИТЬ ПРОЕКТ';
    message.style = `
      color: black;
      background-color: var(--color-primary);
      padding: 40px;
      border-radius: 20px 20px 0px 20px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      z-index: 10;
      width: 600px;
    `;
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png'; // ссылка на картинку
    image.style = `
      position: fixed;
      top: 70%;
      left: 70%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 150px;
      border-radius: 50px;
    `;

    document.body.appendChild(message);
    document.body.appendChild(image);
    // блокируем другие кнопки на странице
    otherLinks.forEach(link => {
        //link.style.pointerEvents = 'none';
        //link.style.opacity = 0.5;
    });

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('mouseup', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();
        image.remove();

        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('mouseup', onProjectsLinkClick);

        setTimeout(() => {
            showProjects3();
        }, "1000")
    });
};

// вызываем функцию



function showProjects3() {
    // находим ссылку на проекты и остальные ссылки
    const projectsLink = document.querySelector('.projects-select_list_224Hp');

    // добавляем текстовое сообщение
    const message = document.createElement('div');
    message.textContent = 'Выбери машатаб вашего проекта. И выбери шаблон.';
    message.style = `
      color: black;
      background-color: var(--color-primary);
      padding: 40px;
      border-radius: 20px 20px 0px 20px;
      position: fixed;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      z-index: 10;
      width: 600px;
    `;
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png'; // ссылка на картинку
    image.style = `
      position: fixed;
      top: 85%;
      left: 75%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 150px;
      border-radius: 50px;
    `;

    document.body.appendChild(message);
    document.body.appendChild(image);
    // блокируем другие кнопки на странице

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('click', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();
        image.remove();

        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('click', onProjectsLinkClick);

        setTimeout(() => {
            showProjects4();
        }, "1000")
    });
};



function showProjects4() {
    // находим ссылку на проекты и остальные ссылки
    const projectsLink = document.querySelector("input[name='projectName']");
    projectsLink.style.border = "5px solid var(--color-primary)"
        // добавляем текстовое сообщение
    const message = document.createElement('div');
    message.textContent = 'Заполни название вашего Проекта';
    message.style = `
      color: black;
      background-color: var(--color-primary);
      padding: 40px;
      border-radius: 20px 20px 0px 20px;
      position: fixed;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      z-index: 10;
      width: 600px;
    `;
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png'; // ссылка на картинку
    image.style = `
      position: fixed;
      top: 85%;
      left: 75%;
      transform: translate(-50%, -50%);
      z-index: 10;
      width: 150px;
      border-radius: 50px;
    `;

    document.body.appendChild(message);
    document.body.appendChild(image);
    // блокируем другие кнопки на странице

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('click', function onProjectsLinkClick() {
        projectsLink.style.border = ""
            // удаляем текстовое сообщение
        message.remove();
        image.remove();

        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('click', onProjectsLinkClick);
    });
};

// вызываем функцию


const nav = document.querySelector('div[class="user-card_header_2ZTRL"]');

let btn = document.createElement('BUTTON');

btn.innerHTML = 'ОБУЧЕНИЕ';

btn.addEventListener('click', () => {
    showProjects1();
});
btn.classList.add('base-button', 'base-button--primary', 'base-button--flat', 'projects-select_add_1cLJs');

nav.appendChild(btn);