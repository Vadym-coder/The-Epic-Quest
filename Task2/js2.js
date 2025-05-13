let timeStorage = localStorage
let time = 0

if(timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 300
    timeStorage.setItem("time", time)
}

let answer = [
    ["Гаррі Поттер", "Harry Potter"],
    ["Губка Боб", "Spongebob Squarepants"],
    ["Пірати Карибського моря", "Pirates of The Carribean"],
    ["Сімпсони", "Simpsons"],
    ["Зоряні війни", "Star Wars"],
    ["Король лев", "Lion King"],
    ["Заморожене серце", "Frozen"],
    ["Шрек", "Shrek"],
    ["Шрек", "Shrek"],
    ["Рокі", "Rocky"],
    ["Індіана Джонс", "Indiana Johnes"],
    ["Oдин Вдома", "Home Alone"],
    ["Термінатор 2", "Terminator 2"],
    ["Назад у майбутнє", "Back to The Future"],
    ["Мисливці за привидами", "Ghost Busters"]
]
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 15)
console.log(answer[num - 1])

$(document).ready(function() {
    $(".progress").knob({
        "min": 0,
        "max": 15,
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
        startRebus(num)
        startTime()
    })

    startRebus(num)
    $("#btnTask1").click(function(){
        if(answer[num - 1].indexOf($("#inputTask1").val()) != -1 ) {
            alertify.success("Right answer")
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger('change')
            was.push(num)
            console.log(was)
            if (progress < 15) {
                do {
                    num = Math.floor(1 + Math.random() * 15)
                } while (was.includes(num))
                console.log(answer[num - 1])
                startRebus(num)
            } else {
                $(".img1, .answer, .taskProgress").css({
                    'display': 'none'
                })

                $("#nextTask").css({
                    'display': 'flex'
                })
            }
        } else {
            alertify.error("Wrong answer, try again")
        }

    })
})

function startRebus(arg) {
    $("#melody").attr("src", `sound/${arg}.mp3`)
}

function startTime() {
    setInterval(function() {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger('change')
        if (time == 0) {
            alertify.error("Your time is out!")
            setTimeout(()=>window.open("../Task1/html.html", "_self", false), 2000)
            localStorage.removeItem
        } else if (time > 0) {
            localStorage.setItem("time", time)
        }
    }, 1000)
}