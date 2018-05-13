//define UI
const form=document.querySelector('#agregar-temperatura');
const tareainput=document.querySelector('#tarea-input');

$('#imagenes').append('<img src="images/encendido.png" alt="" id="Encendido-img">');

var modal = document.querySelector('.modal');
var modalInstance = M.Modal.init(modal);
var modalTrigger=document.querySelector('#modal1-trigger')
modalTrigger.addEventListener('click',activarModal);

var modalError=document.querySelector('#modal-error');
var modalErrorInstance=M.Modal.init(modalError);

function modalErrorOn(params) {
	modalErrorInstance.open();
}

function activarModal(params) {
	modalInstance.open();
	params.preventDefault();
	// console.log("modal activado")
}

form.addEventListener('click',function(e){
	
	var valor=Number(tareainput.value);
	if (isNaN(valor)) {
		modalErrorOn();
		// alert('error');
	}
	if (valor===0) {
		modalErrorOn();
	}else{
		socket.emit('temp',tareainput.value);
	}
	tareainput.value="";
	e.preventDefault();
	
});