var express = require('express');
var socket = require('socket.io');
var request = require('request');



//*************************//
//Ports and their listeners//
//*************************//
var front = express();
var frontListener = front.listen(4001, function(){
	console.log("localhost:4001 to access the front end")
});
front.use(express.static('front'));

var back = express();
var backListener = back.listen(4000, function(){
	console.log("other groups send to localhost:4000")
});
back.use(express.json());




//*****************//
//Frontend's socket//
//*****************//
var io = socket(frontListener);

io.on('connection', function(socket){
	socket.on('undeploy', function(data){
		undeployPost(data)
	});

	socket.on('auth', function(data){
		var authInfo = auth(data);
		socket.emit('authRes', {
			token: data.token,
			success: authInfo.success,
			role: authInfo.role
		});
	});

	socket.on('checkUser', function(data){
		socket.emit('userChecked', {
			result: checkUser(data)
		});
	});
});

back.post('/', function(req, res){
	io.emit('postIncoming', req.body);
	res.send(req.body);
});	



//****************//
//Helper Functions//
//****************//
function undeployPost(jsonData){
	request.post(
		'http://localhost:8081',
		{ json: jsonData },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// no problems
			} else {
				console.log("Error!!!!");
			}
		}
	);
}


//*******//
// Users //
//*******//
var users = [{user:'admin', pass:'admin', role:'M'}];

function auth(data){
	var found = null;

	for (var i = 0; i < users.length; i++) {
		if (users[i].user == data.user && users[i].pass == data.pass){
			found = users[i];
			break;
		}
	}

	return (found == null) ? {success: false, role:'N'} : {success: true, role: found.role};
}

function checkUser(data){
	for (var i = 0; i < users.length; i++) {
		if (users[i].user == data){
			return true;
		}
	}

	return false;
}