let answer = ["україна", "будинок", "пес", "кран", "сковорідка", "нікотинамідаденіндинуклеотидфосфат", "діаманд", "код", "лвів", "пташка"]
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 10)
console.log(answer[num - 1])

$(document).ready(function() {
    $(".progress").knob({
        "min": 0,
        "max": 5,
        "angleOffset": -60,
        "angleArc": 120,
        "readOnly": true
    })

    startRebus(num)
    $("#btnTask1").click(function(){
        if($("#inputTask1").val().toLowerCase() == `${answer[num - 1]}`) {
            alertify.success("Right answer")
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger('change')
            was.push(num)
            console.log(was)
            if (progress < 5) {
                do {
                    num = Math.floor(1 + Math.random() * 10)
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
    $("#pictureSlide").attr("src", `img/${arg}.png`)
}