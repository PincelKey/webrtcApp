var portAux = process.env.PORT || 615;

//Traer el modulo
var WebSocketServer = require("ws").Server;

//Crear mi WebSocketServer
var wss = new WebSocketServer({port: portAux});

//Defino mi stack de clientes
var clientes=[];

//Trabajo los eventos de mi Socket
///Verifico si hay una conexion a mi servidor
wss.on('connection',function(wsCliente){
	//0. Almacenar esa nueva conexion a mi stack
	console.log("[------NEW CLIENTE-----]");
	clientes.push(wsCliente);
 
	//Desplegar mas eventos
	//1. Cierre de la conexion
	wsCliente.on('close', function(){
		//Desapilo el cliente que se ha desconectado
		//cliente.splice();---Pendiente --URgente
		console.log("CLIENTE X DESCONECTADO")
		clientes.splice(clientes.indexOf(wsCliente),1);
	});

	//2. La existenca de un mensaje en el servidor
	wsCliente.on('message', function(message){
		var msg = JSON.parse(message);
		console.log("()SERVER-Msg: "+msg.from+" --> "+msg.to+" action: "+msg.action);
		for(var iCliente=0; iCliente<clientes.length; iCliente++){
			console.log(" [   Msg    ]")
			clientes[iCliente].send(message);
		}
	});	
});

//
var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/static'));
app.listen(80);
