function showProjects() {
    // находим ссылку на проекты и остальные ссылки
    const projectsLink = document.querySelector('a[href="/projects"]');
    const otherLinks = document.querySelectorAll('a:not([href="/projects"])');

    const get_projectsLink = document.querySelector('.projects-select_wrapper_hcRmb');
    const get_otherLinks = document.querySelectorAll(':not(.projects-select_wrapper_hcRmb)');

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
    `;
    document.body.appendChild(message);

    // блокируем другие кнопки на странице
    otherLinks.forEach(link => {
        link.style.pointerEvents = 'none';
        link.style.opacity = 0.5;
    });

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('click', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();

        // активируем все кнопки
        otherLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = 1;
        });

        // подсказка
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
        `;
        document.body.appendChild(message);

        // блокируем другие кнопки на странице
        get_otherLinks.forEach(link => {
            link.style.pointerEvents = 'none';
            link.style.opacity = 0.5;
        });

        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('click', onProjectsLinkClick);
    });

    // добавляем обработчик события для ссылки на проекты
    get_projectsLink.addEventListener('click', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();

        // активируем все кнопки
        get_otherLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = 1;
        });

        // удаляем обработчик события для ссылки на проекты
        get_projectsLink.removeEventListener('click', onProjectsLinkClick);
    });
};

function showProjects1() {
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
    `;
    document.body.appendChild(message);

    // блокируем другие кнопки на странице
    otherLinks.forEach(link => {
        link.style.pointerEvents = 'none';
        link.style.opacity = 0.5;
    });

    // добавляем обработчик события для ссылки на проекты
    projectsLink.addEventListener('click', function onProjectsLinkClick() {
        // удаляем текстовое сообщение
        message.remove();

        // активируем все кнопки
        otherLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = 1;
        });

        // удаляем обработчик события для ссылки на проекты
        projectsLink.removeEventListener('click', onProjectsLinkClick);
    });
};


// вызываем функцию
showProjects();