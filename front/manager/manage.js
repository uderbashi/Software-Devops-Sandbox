const socket = io.connect("http://localhost:4001");

// Overlay
const overlay = document.getElementById("overlay");

// Hire Modal
const newUser = document.getElementById("newUser");
const newPass = document.getElementById("newPass");
const newPassConfirm = document.getElementById("newPassConfirm");
const radioM = document.getElementById("radioM");
const radioI = document.getElementById("radioI");
const radioP = document.getElementById("radioP");

// Fire Modal
const firedUser = document.getElementById("firedUser");

// New Project Modal
const newP = document.getElementById("newP");

// Undeploy Modal
const undeployed = document.getElementById("undeployed");



function closeHire() {
	newUser.value = "";
	newPass.value = "";
	newPassConfirm.value = "";
	radioP.checked = true;
	closeModal("hireModal");
}

async function addNewUser() {
	if (newUser.value === "" || newPass.value === "" || newPassConfirm.value === ""){
		openModal("emptyFieldError");
	} else if (newPass.value !== newPassConfirm.value) {
		openModal("passwordMismatchError");
	} else if (await checkUser(newUser.value)) {
		openModal("userAlreadyExistsError");
	} else {
		socket.emit("addNewUser", {
			user: newUser.value,
			pass: newPass.value,
			role: getRole()
		});
		closeHire();
	}
}

function checkUser(user) {
	return new Promise(function(resolve, reject){
		socket.emit("checkUser", {
			user: user
		}, function (res) {
			resolve(res);
		});
	});
}

function getRole(){
	if (radioM.checked) {return "M"}
	if (radioI.checked) {return "I"}
	if (radioP.checked) {return "P"}
}

async function fireUser(){
	if (firedUser.value === ""){
		openModal("emptyFieldError");
	} else if (await checkUser(firedUser.value) === false) {
		openModal("userDoesntExistError");
	} else {
		socket.emit("fireUser", {
			user: firedUser.value
		});
		closeFire();
	}
}

function closeFire() {
	firedUser.value = "";
	closeModal("fireModal");
}

function newProject(){
	if (newP.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("newProject", {
			project: newP.value
		});
		closeNewProject();
	}
}

function closeNewProject(){
	newP.value = "";
	closeModal("newProject");
}

function undeploy(){
	if (undeployed.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("undeploy", {
			project: undeployed.value
		});
		closeUndeploy();
	}
}

function closeUndeploy(){
	undeployed.value = "";
	closeModal("undeploy");
}