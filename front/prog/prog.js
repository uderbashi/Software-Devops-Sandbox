const socket = io.connect("http://localhost:4001");

// Overlay
const overlay = document.getElementById("overlay");

// Code Modal
const codeProject = document.getElementById("codeProject");
const codePath = document.getElementById("codePath");


// SQL Modal
const sqlProject = document.getElementById("sqlProject");
const sqlPath = document.getElementById("sqlPath");



function closeCode() {
	codeProject.value = "";
	codePath.value = "";
	closeModal("codeModal");
}

function commitCode() {
	if (codeProject.value === "" || codePath.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("commitCode", {
			project: codeProject.value,
			path: codePath.value
		});
		closeCode();
	}
}

function closeSQL() {
	sqlProject.value = "";
	sqlPath.value = "";
	closeModal("sqlModal");
}

function commitSQL() {
	if (sqlProject.value === "" || sqlPath.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("commitSQL", {
			project: sqlProject.value,
			path: sqlPath.value
		});
		closeSQL();
	}
}
