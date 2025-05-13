let timeStorage = localStorage
let time = 0

if(timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 300
    timeStorage.setItem("time", time)
}

let progress = 0

let first_card = null

let second_card = null

let cards = [
    { 
        name: "html",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/330px-HTML5_logo_and_wordmark.svg.png",  
        id: 1
    },
    { 
        name: "css",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfj7-gq11u-a8ebYdxnDF-fIy6cBIJ-Mn2Lg&s",  
        id: 2
    },
    { 
        name: "python",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/330px-Python_logo_and_wordmark.svg.png",  
        id: 3
    },
    { 
        name: "jquery",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmLME0hpAJOqBGhaVjcgkk8hIKS3S4GAqrLg&s",  
        id: 4
    },
    { 
        name: "php",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/330px-PHP-logo.svg.png",  
        id: 5
    },
    { 
        name: "c#",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/C_Sharp_Logo_2023.svg/300px-C_Sharp_Logo_2023.svg.png",  
        id: 6
    },
    { 
        name: "c++",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/260px-ISO_C%2B%2B_Logo.svg.png",  
        id: 7
    },
    { 
        name: "java",
        img: "https://upload.wikimedia.org/wikipedia/uk/8/85/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_Java.png",  
        id: 8
    },
    { 
        name: "javascript",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/250px-Unofficial_JavaScript_logo_2.svg.png",  
        id: 9
    },
    { 
        name: "pascal",
        img: "https://alefragnani.gallerycdn.vsassets.io/extensions/alefragnani/pascal/9.9.0/1738545183646/Microsoft.VisualStudio.Services.Icons.Default",  
        id: 10
    },
    { 
        name: "ada",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ada_horizon_green_logo_with_slogan.svg/280px-Ada_horizon_green_logo_with_slogan.svg.png",  
        id: 11
    },
    { 
        name: "visualbasic",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/VB.NET_Logo.svg/250px-VB.NET_Logo.svg.png",  
        id: 12
    }
]

$(document).ready(function() {
    $(".progress").knob({
        "min": 0,
        "max": 12,
        "angleOffset": -60,
        "angleArc": 120,
        "readOnly": true
    })

    $(".time").knob({
        "min": 0,
        "max": 300,
        "angleOffset": -60,
        "angleArc": 120,
        "readOnly": true
    })

    $(".start").click(function() {
        $(".start").css('display', 'none') 
        $(".taskProgress, .timeProgress, .sound, .answer").css('display', 'block')
        startTime()
        fillboard()
        $(".card").on("click", cardClicked)
    })
})

function fillboard() {
    let board = shuffle([...cards, ...cards])
    for (i = 0; i< board.length; ++i) {
        let cardHTML = 
        `<div class="card" data-id="${board[i].id}">
                <div class="front">ROBOCODE</div>
                <div class="back">
                    <img src="${board[i].img}" alt="">
                </div>
        </div>`
        $('.gameBoard').append(cardHTML)
    }
}

function shuffle(array) {
    var m = array.length, t, i;
  
    while (m) {
  
      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function cardClicked(event) {
    console.log(event)
    if (second_card || $(this).hasClass('matched')) {
        return
    }
    if (!first_card) {
        first_card = $(this)
        first_card.addClass("flip")
        return
    }
    if (first_card) {
        second_card = $(this)
        second_card.addClass("flip")
        if (first_card.attr("data-id") == second_card.attr("data-id")) {
            first_card.addClass("matched")
            second_card.addClass("matched")
            first_card = null
            second_card = null
            progress++
            $(".progress").val(progress).trigger('change')
            if (progress == 12) {
                alertify.alert("You Won")
            }
        } else {
            setTimeout(function() {
                first_card.removeClass("flip")
                second_card.removeClass("flip")
                first_card = null
                second_card = null 
            }, 600)
        }
    }
}

function startTime() {
    setInterval(function() {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger('change')
        if (time == 0) {
            alertify.error("Your time is out!")
            setTimeout(()=>window.open("../Task1/html.html", "_self", false), 2000)
            localStorage.removeItem('time')
        } else if (time > 0) {
            localStorage.setItem("time", time)
        }
    }, 1000)
}