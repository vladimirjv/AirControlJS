var ctx = document.getElementById("myChart").getContext('2d');
var dataset=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["", "", "", "", "","", "", "", "", "","", "", "", "", "",""],
        datasets: [{
            label: 'Temperatura',
            data: dataset,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration: 10, // general animation time
        },
        responsive:true,
        scales: {
            yAxes: [{
                display:true,
                scaleLabel: {
                    display: true,
                    labelString: 'Voltaje'
                },
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
// actualizar grafica
// myChart.data.labels.push("")
// myChart.update()
// myChart.data.datasets[0]["data"].push(20)
// myChart.update()
// myChart.data.labels.pop()
// myChart.data.datasets[0]["data"].shift();
// myChart.update()