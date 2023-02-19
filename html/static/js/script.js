// ========================== пользователь ========================
$(document).ready(function() {

    action_name = "action_greet_user";
    user_id = "jitesh97";

    action_trigger();

})

// ========================== перезапустить разговор ========================
function restartConversation() {
    $(".usrInput").val("");
    send("/restart");
}

// ========================== бот начинает разговор ========================
function action_trigger() {

    let xhr = new XMLHttpRequest();

    xhr.open("get", "http://45.95.202.88:8000/questions_send_start", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = function() {
        setBotResponse(JSON.parse(xhr.response));
    };
}


//=====================================	пользователь вводит или отправляет сообщение =====================
$(".usrInput").on("keyup keypress", function(e) {
    var keyCode = e.keyCode || e.which;

    var text = $(".usrInput").val();
    if (keyCode === 13) {

        if (text == "" || $.trim(text) == "") {
            e.preventDefault();
            return false;
        } else {
            $("#paginated_cards").remove();
            $(".suggestions").remove();
            $(".quickReplies").remove();
            $(".usrInput").blur();
            setUserResponse(text);
            send(text);
            e.preventDefault();
            return false;
        }
    }
});

$("#sendButton").on("click", function(e) {
    var text = $(".usrInput").val();
    if (text == "" || $.trim(text) == "") {
        e.preventDefault();
        return false;
    } else {
        $(".suggestions").remove();
        $("#paginated_cards").remove();
        $(".quickReplies").remove();
        $(".usrInput").blur();
        setUserResponse(text);
        send(text);
        e.preventDefault();
        return false;
    }
})


//==================================== показать ответ пользователя =====================================
function setUserResponse(message) {
    var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.png" + '><p class="userMsg">' + message + ' </p><div class="clearfix"></div>';
    $(UserResponse).appendTo(".chats").show("slow");

    $(".usrInput").val("");
    scrollToBottomOfResults();
    showBotTyping();
    $(".suggestions").remove();
}

//=========== Прокрутите вниз чаты после добавления нового сообщения в чат ======
function scrollToBottomOfResults() {

    var terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

//============== отправить сообщение пользователя на сервер =============================================
function send(message) {

    item = {
        question: message,
        user_id: 312312,
        question_id: 1
    };
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://45.95.202.88:8000/questions_send", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(item));

    xhr.onload = function() {
        setBotResponse(JSON.parse(xhr.response));
    };

}

//=================== установить ответ бота в чатах ===========================================
function setBotResponse(response) {
    response = response.data

    setTimeout(function() {
        hideBotTyping();

        for (i = 0; i < response.length; i++) {

            if (response[i].hasOwnProperty("text")) {
                var BotResponse = '<img class="botAvatar" src="https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png"/><p class="botMsg">' + response[i].text + '</p><div class="clearfix"></div>';
                $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            }

            if (response[i].hasOwnProperty("buttons")) {
                addSuggestion(response[i].buttons);
            }

            scrollToBottomOfResults();

        }
    }, 300);
};

function setBotResponse_mic(response) {
    setTimeout(function() {
        hideBotTyping();

        var BotResponse = '<img class="botAvatar" src="https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png"/><p class="botMsg">' + response + '</p><div class="clearfix"></div>';
        $(BotResponse).appendTo(".chats").hide().fadeIn(1000);

        scrollToBottomOfResults();
    }, 300);
}

//====================================== Переключить чат-бот =======================================
$("#profile_div").click(function() {
    $(".profile_div").toggle();
    $(".widget").toggle();
});

//====================================== Предложения о посещения вкладок ===========================================

function addSuggestion(textToAdd) {
    setTimeout(function() {
        $(' <div class="singleCard"> <div class="suggestions"><div class="menu"><a href="https://grants.myrosmol.ru/events" target="_blank">Мероприятия</a></div></div></diV>').appendTo(".chats").hide().fadeIn(1000);
        $(' <div class="singleCard"> <div class="suggestions"><div class="menu"><a href="https://grants.myrosmol.ru/projects/create/386d79e1-1fa9-4e9d-9357-f8777644bcde:1c49a8d0-35c1-43c3-894e-ed03087dceaa" target="_blank">Создать проект</a></div></div></diV>').appendTo(".chats").hide().fadeIn(1000);
        scrollToBottomOfResults();
    }, 500);
}

$(document).on("click", ".menu .menuChips", function() {
    var text = this.innerText;
    var payload = this.getAttribute('data-payload');
    console.log("payload: ", this.getAttribute('data-payload'))
    setUserResponse(text);
    send(payload);

    $(".suggestions").remove();

});


$("#close").click(function() {
    $(".profile_div").toggle();
    $(".widget").toggle();
    scrollToBottomOfResults();
});

$("#restart").click(function() {
    restartConversation()
});

//====================================== анимация открытия =========================================

function showCardsCarousel(cardsToAdd) {
    var cards = createCardsCarousel(cardsToAdd);

    $(cards).appendTo(".chats").show();


    if (cardsToAdd.length <= 2) {
        $(".cards_scroller>div.carousel_cards:nth-of-type(" + i + ")").fadeIn(3000);
    } else {
        for (var i = 0; i < cardsToAdd.length; i++) {
            $(".cards_scroller>div.carousel_cards:nth-of-type(" + i + ")").fadeIn(3000);
        }
        $(".cards .arrow.prev").fadeIn("3000");
        $(".cards .arrow.next").fadeIn("3000");
    }


    scrollToBottomOfResults();

    const card = document.querySelector("#paginated_cards");
    const card_scroller = card.querySelector(".cards_scroller");
    var card_item_size = 225;

    card.querySelector(".arrow.next").addEventListener("click", scrollToNextPage);
    card.querySelector(".arrow.prev").addEventListener("click", scrollToPrevPage);


    // Для постраничной прокрутки просто прокрутите карточку на один элемент в заданном
    // направление и позволить привязке прокрутки css обрабатывать конкретное выравнивание.
    function scrollToNextPage() {
        card_scroller.scrollBy(card_item_size, 0);
    }

    function scrollToPrevPage() {
        card_scroller.scrollBy(-card_item_size, 0);
    }

}

function createCardsCarousel(cardsData) {

    var cards = "";

    for (i = 0; i < cardsData.length; i++) {
        title = cardsData[i].name;
        ratings = Math.round((cardsData[i].ratings / 5) * 100) + "%";
        data = cardsData[i];
        item = '<div class="carousel_cards in-left">' + '<img class="cardBackgroundImage" src="' + cardsData[i].image + '"><div class="cardFooter">' + '<span class="cardTitle" title="' + title + '">' + title + "</span> " + '<div class="cardDescription">' + '<div class="stars-outer">' + '<div class="stars-inner" style="width:' + ratings + '" ></div>' + "</div>" + "</div>" + "</div>" + "</div>";

        cards += item;
    }

    var cardContents = '<div id="paginated_cards" class="cards"> <div class="cards_scroller">' + cards + '  <span class="arrow prev fa fa-chevron-circle-left "></span> <span class="arrow next fa fa-chevron-circle-right" ></span> </div> </div>';

    return cardContents;
}

// по щелчку быстрых ответов получаем значение и отправляем
$(document).on("click", ".quickReplies .chip", function() {
    var text = this.innerText;
    var payload = this.getAttribute('data-payload');
    console.log("chip payload: ", this.getAttribute('data-payload'))
    setUserResponse(text);
    send(payload);

    //delete the quickreplies
    $(".quickReplies").remove();

});


//======================================анимация набора текста ботом ======================================
function showBotTyping() {

    var botTyping = '<img class="botAvatar" id="botAvatar" src="https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png"/><div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>'
    $(botTyping).appendTo(".chats");
    $('.botTyping').show();
    scrollToBottomOfResults();
}

function hideBotTyping() {
    $('#botAvatar').remove();
    $('.botTyping').remove();
}



// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';
var question;
var answer;
// Используем колбек для обработки результатов
recognizer.onresult = function(event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        question = result[0].transcript;
        setUserResponse(question);
        sendQuestion();

    }
};

function speech() {
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
}

function sendQuestion() {
    item = {
        question: question,
        user_id: 312312,
        question_id: 1
    };
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://45.95.202.88:8000/questions_send", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(item));

    xhr.onload = function() {
        answer = JSON.parse(xhr.response).data[0].text;
        setBotResponse_mic(answer);
    };
    setTimeout(function() {
        speakText();
    }, 300);
}

function speakText() {
    // остановим все, что уже синтезируется в речь
    window.speechSynthesis.cancel();

    // прочитать текст
    const text = answer;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}