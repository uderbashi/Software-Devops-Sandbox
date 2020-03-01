//******************//
//Required Libraries//
//******************//
var express = require("express");
var socket = require("socket.io");
var request = require("request");



//*************************//
//Ports and their listeners//
//*************************//
var front = express();
var frontListener = front.listen(4001, function () {
	console.log("localhost:4001 to access the front end")
});
front.use(express.static("front"));

var back = express();
var backListener = back.listen(4000, function () {
	console.log("other groups send to localhost:4000")
});
back.use(express.json());



//*****************//
//Frontend"s socket//
//*****************//
var io = socket(frontListener);

io.on("connection", function (socket) {

	// Login page
	socket.on("auth", function (data, res) {
		res(auth(data));
	});


	// Manager page
	socket.on("checkUser", function (data, res) {
		res(users.has(data.user));
	});

	socket.on("addNewUser", function (data) {
		addUser(data);
	});

	socket.on("fireUser", function (data) {
		fireUser(data);
	});

	socket.on("newProject", function (data) {
		postNewProject(data)
	});

	socket.on("undeploy", function (data) {
		postUndeploy(data)
	});

	// IT Specialist Page
	socket.on("realise", function (data) {
		postRealise(data)
	});

	socket.on("newTask", function (data) {
		postNewTask(data)
	});
	
	
});



//**********//
//Back Calls//
//**********//
back.post("/", function (req, res) {
	console.log(req.body);
	io.emit("postIncoming", req.body);
	res.send(req.body);
});



//****************//
//Helper Functions//
//****************//
function postNewProject(data) {
	request.post(
		"http://localhost:8081",
		{json: {
			origin:"4",
			destination: "2",
			action: "newProject",
			newProjectName: data.project
		}},
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// no problems
			} else {
				console.log("Error!!!!");
			}
		}
	);
}

function postUndeploy(data) {
	request.post(
		"http://localhost:8081",
		{json: {
			origin:"4",
			destination: "2",
			action: "undeploy",
			projectName: data.project
		}},
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// no problems
			} else {
				console.log("Error!!!!");
			}
		}
	);
}

function postRealise(data) {
	request.post(
		"http://localhost:4000",
		{json: {
			origin:"4",
			destination: "2",
			action: "assignment",
			projectName: data.project,
			projectDescription: data.description
		}},
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// no problems
			} else {
				console.log("Error!!!!");
			}
		}
	);
}

function postNewTask(data) {
	request.post(
		"http://localhost:4000",
		{json: {
			origin:"4",
			destination: "2",
			action: "newtask",
			projectName: data.project,
			projectDescription: data.description
		}},
		function (error, response, body) {
			if (!error && response.statusCode === 200) {
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
let users = new Map();
users.set("admin", {user: "admin", pass: "admin", role: "M"});

function auth(data) {
	var result = users.get(data.user);

	if (!result || result.pass !== data.pass) {
		return {role: "N"};
	}

	return {role: result.role};
}

function addUser(data) {
	users.set(data.user, data);
}

function fireUser(data) {
	users.delete(data.user);
}
