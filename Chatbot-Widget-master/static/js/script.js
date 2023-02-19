// ========================== greet user proactively ========================
$(document).ready(function() {

    // showBotTyping();
    // $("#userInput").prop('disabled', true);
    //global variables
    action_name = "action_greet_user";
    user_id = "jitesh97";

    //if you want the bot to start the conversation
    action_trigger();

})

// ========================== restart conversation ========================
function restartConversation() {
    $(".usrInput").val("");
    send("/restart");
}

// ========================== let the bot start the conversation ========================
function action_trigger() {
    // send an event to the bot, so that bot can start the conversation by greeting the user
    let xhr = new XMLHttpRequest();

    xhr.open("get", "http://127.0.0.1:8000/questions_send_start", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = function() {
        setBotResponse(JSON.parse(xhr.response));
    };
}


//=====================================	user enter or sends the message =====================
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


//==================================== Set user response =====================================
function setUserResponse(message) {
    var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.png" + '><p class="userMsg">' + message + ' </p><div class="clearfix"></div>';
    $(UserResponse).appendTo(".chats").show("slow");

    $(".usrInput").val("");
    scrollToBottomOfResults();
    showBotTyping();
    $(".suggestions").remove();
}

//=========== Scroll to the bottom of the chats after new message has been added to chat ======
function scrollToBottomOfResults() {

    var terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

//============== send user message to rasa server =============================================
function send(message) {

    item = {
        question: message,
        user_id: 312312,
        question_id: 1
    };
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:8000/questions_send", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(item));

    xhr.onload = function() {
        setBotResponse(JSON.parse(xhr.response));
    };

}

//=================== set bot response in the chats ===========================================
function setBotResponse(response) {
    response = response.data
        //display bot response after 500 milliseconds
    setTimeout(function() {
        hideBotTyping();

        //if we get response from Rasa
        for (i = 0; i < response.length; i++) {

            //check if the response contains "text"
            if (response[i].hasOwnProperty("text")) {
                var BotResponse = '<img class="botAvatar" src="https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png"/><p class="botMsg">' + response[i].text + '</p><div class="clearfix"></div>';
                $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            }

            //check if the response contains "buttons" 
            if (response[i].hasOwnProperty("buttons")) {
                addSuggestion(response[i].buttons);
            }

            scrollToBottomOfResults();

        }
    }, 300);
};

function setBotResponse_mic(response) {
    //display bot response after 500 milliseconds
    setTimeout(function() {
        hideBotTyping();


        //check if the response contains "text"

        var BotResponse = '<img class="botAvatar" src="https://raw.githubusercontent.com/kek4ok/BIT_helper/main/img/avatar1.png"/><p class="botMsg">' + response + '</p><div class="clearfix"></div>';
        $(BotResponse).appendTo(".chats").hide().fadeIn(1000);


        scrollToBottomOfResults();
    }, 300);
}

//====================================== Toggle chatbot =======================================
$("#profile_div").click(function() {
    $(".profile_div").toggle();
    $(".widget").toggle();
});

//====================================== Suggestions ===========================================

function addSuggestion(textToAdd) {
    setTimeout(function() {
        $(' <div class="singleCard"> <div class="suggestions"><div class="menu"><a href="https://grants.myrosmol.ru/events" target="_blank">Мероприятия</a></div></div></diV>').appendTo(".chats").hide().fadeIn(1000);
        $(' <div class="singleCard"> <div class="suggestions"><div class="menu"><a href="https://grants.myrosmol.ru/projects/create/386d79e1-1fa9-4e9d-9357-f8777644bcde:1c49a8d0-35c1-43c3-894e-ed03087dceaa" target="_blank">Создать проект</a></div></div></diV>').appendTo(".chats").hide().fadeIn(1000);
        scrollToBottomOfResults();
    }, 500);
}

// on click of suggestions, get the value and send to rasa
$(document).on("click", ".menu .menuChips", function() {
    var text = this.innerText;
    var payload = this.getAttribute('data-payload');
    console.log("payload: ", this.getAttribute('data-payload'))
    setUserResponse(text);
    send(payload);

    //delete the suggestions
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

//====================================== Cards Carousel =========================================

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


    // For paginated scrolling, simply scroll the card one item in the given
    // direction and let css scroll snaping handle the specific alignment.
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

//====================================== Quick Replies ==================================================

function showQuickReplies(quickRepliesData) {
    var chips = ""
    for (i = 0; i < quickRepliesData.length; i++) {
        var chip = '<div class="chip" data-payload=\'' + (quickRepliesData[i].payload) + '\'>' + quickRepliesData[i].title + '</div>'
        chips += (chip)
    }

    var quickReplies = '<div class="quickReplies">' + chips + '</div><div class="clearfix"></div>'
    $(quickReplies).appendTo(".chats").fadeIn(1000);
    scrollToBottomOfResults();
    const slider = document.querySelector('.quickReplies');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

}

// on click of quickreplies, get the value and send to rasa
$(document).on("click", ".quickReplies .chip", function() {
    var text = this.innerText;
    var payload = this.getAttribute('data-payload');
    console.log("chip payload: ", this.getAttribute('data-payload'))
    setUserResponse(text);
    send(payload);

    //delete the quickreplies
    $(".quickReplies").remove();

});

//====================================== Get User Location ==================================================
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserPosition, handleLocationAccessError);
    } else {
        response = "Geolocation is not supported by this browser.";
    }
}

function getUserPosition(position) {
    response = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
    console.log("location: ", response);

    //here you add the intent which you want to trigger 
    response = '/inform{"latitude":' + position.coords.latitude + ',"longitude":' + position.coords.longitude + '}';
    $("#userInput").prop('disabled', false);
    send(response);
    showBotTyping();
}

function handleLocationAccessError(error) {

    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }

    response = '/inform{"user_location":"deny"}';
    send(response);
    showBotTyping();
    $(".usrInput").val("");
    $("#userInput").prop('disabled', false);


}

//======================================bot typing animation ======================================
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

    xhr.open("POST", "http://127.0.0.1:8000/questions_send", true);
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