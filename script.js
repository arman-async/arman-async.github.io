let startBTN = document.querySelector('.start')
const xValues = [0, 2, 4, 6, 8];

var chart = new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [
            {
                data: [0],
                borderColor: "green",
                fill: false
            }
        ]
    },
    options: {
        legend: { display: false }
    }
});

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}

function sleepThenAct(){
    sleepFor(2000);
    console.log("Hello, JavaScript sleep!");
}


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// color_stop = "#808080"
// color_start = "#007a00"


text_run = "برداشت"
text_start = "شروع"
text_exit = "ثبت شرط"

var present = 0
var count_run_start_stop_loop = 0 
function start_stop() {
    var X = document.getElementById('X')
    var price = document.getElementById('price-input').value

    if (startBTN.innerHTML == text_start){
        startBTN.innerHTML = text_run
    }
    else{
        
        startBTN.innerHTML = text_start
    }
    
    max_coefficient = 4
    max_setp = 0.08
    auto_coefficient = 2

    coefficient = getRandomNumber(0.5, max_coefficient)
    button_convert = getRandomNumber(0.8, (max_coefficient - 0.5))
    var loop_runer = null

    function loop(){

        count_run_start_stop_loop += 1

        setp = getRandomNumber(0.1, max_setp)
        next = getRandomNumber(present, (setp + present))
        console.log(present)
        chart.data.datasets[0].data.push(next)
        if (count_run_start_stop_loop > 7){
            chart.data.labels.push(
                chart.data.labels[chart.data.labels.length-1] + 2)
        }
        
        present = next
        
        startBTN.innerHTML = text_run + "<br>" + Number(Number(price) * present).toFixed(3)
        X.innerHTML = present.toFixed(2) + 'X'
        chart.update()

        if (auto_coefficient <= present){
            startBTN.classList.add("exit")
            startBTN.innerHTML = text_exit
            X.classList.add('color-black')
        }

        if (present > coefficient){
            clearInterval(loop_runer)
            X.classList.add('color-red')
            X.innerHTML = "بسته شد" + "<br>" + "@" + X.innerHTML  

            
        }
    }
    loop_runer = setInterval(loop, 150)

}