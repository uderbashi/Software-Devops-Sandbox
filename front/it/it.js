const socket = io.connect("http://localhost:4001");

// Overlay
const overlay = document.getElementById("overlay");

// Realise Modal
const realisedProject = document.getElementById("realisedProject");
const description = document.getElementById("description");

// New Task Modal
const taskProject = document.getElementById("taskProject");
const taskDescription = document.getElementById("taskDescription");



function realise(){
	if (realisedProject.value === "" || description.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("realise", {
			project: realisedProject.value,
			description: description.value
		});
		closeRealise();
	}
}

function closeRealise() {
	realisedProject.value = "";
	description.value = "";
	closeModal("realiseModal");
}

function newTask() {
	if (taskProject.value === "" || taskDescription.value === ""){
		openModal("emptyFieldError");
	} else {
		socket.emit("newTask", {
			project: taskProject.value,
			description: taskDescription.value
		});
		closeNewTask();
	}
}

function closeNewTask() {
	taskProject.value = "";
	taskDescription.value = "";
	closeModal("newTaskModal");
}

function monitor() {
	window.open("http://localhost:9091/docker");
}