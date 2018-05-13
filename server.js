const express = require('express');
const chartjs=require('chart.js')
var sleep = require('sleep');
const http=require('http');
const hbs=require('hbs');
const socketIO =require('socket.io');
var five=require('johnny-five');
const port =process.env.PORT || 3000;

var app = express();
var server=http.createServer(app);
var io=socketIO(server)

const path=require('path');
const publicPath=path.join(__dirname,'/public');
const viewPath=path.join(__dirname,'/views');
app.use(express.static(publicPath));
app.set('views', viewPath);
app.set('view engine', 'hbs');

//404 nt found
// app.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

//index
app.get('/',(req,res)=>{
  res.render('index.hbs')
});

// charts 
app.get('/chart',(req,res)=>{
  res.render('chart.hbs')	
});

// arduino
var board=new five.Board({
  repl:false
});

funciones={graficar:function(){}};

board.on('ready', function (){
  // constantes
  var temperaturaSet=0;
  const tempCriCompresor=2;
  // elementos
  var led=new five.Led(13);
  var clima=new five.Pin(12);
  var compresor=new five.Pin(11);
  var sensorAmbiente=new five.Sensor("A0");
  var sensorCompresor= new five.Sensor("A1");
  // 
  led.on();
  

  io.on('connection',(socket)=>{
    // console.log('New user connection');

    // socket.on('disconnect',()=>{
    //   console.log('User Desconected');
    // });
    socket.on('enciende',function (params) {
      console.log('Enciende Led');
      led.on();
      socket.emit('prendido');
    });
    socket.on('temp',function (temp) {
      temperaturaSet=parseInt(temp);
    })
    socket.on('apagar',function (params) {
      console.log('Apagando');
      led.off();
      socket.emit('apagado');
    });
    funciones.graficar=function(temp){
      socket.emit('grafica',{data:temp});
    }
  });
  
  sensorAmbiente.on("change", function() {
    // temperatura del ambiente
    var lecturaAmbiente=sensorAmbiente.raw;
    var voltajeAmbiente=lecturaAmbiente*(5.0/1023);
    var temperaturaAmbiente=((voltajeAmbiente*-21.133)+78.018);
    // temperatura del compresor
    var lecturaCompresor=sensorCompresor.raw;
    var voltajeCompresor=lecturaCompresor*(5.0/1023);
    var temperaturaCompresor=((voltajeCompresor*-21.133)+78.018);

    console.log(temperaturaAmbiente);
    funciones.graficar(temperaturaAmbiente);
    console.log(temperaturaSet);
    console.log(temperaturaCompresor);
    

    if (temperaturaAmbiente>(temperaturaSet+3)) {
      // if
      clima.high();
      console.log('Clima encendido');
      if (temperaturaCompresor<tempCriCompresor) {
        compresor.low();
        console.log('Compresor Apagado');
      }else{
        compresor.high();
        console.log('Compresor Encendido');
      }
      // ifend
    } else if(temperaturaAmbiente<(temperaturaSet-3)) {
      // else if
      clima.low();
      compresor.low();
      console.log('clima apagado');
      console.log('Compresor Encendido');
      // else ifend
    }
    sleep.msleep(150);  

  });

});



server.listen(port, () => {
  console.log('Server is up on port '+port);
  console.log(publicPath);

});
