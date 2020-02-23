const socket = io.connect("http://localhost:4001");

const form = document.getElementById("form");
const user = document.getElementById("user");
const pass = document.getElementById("pass");

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");


form.addEventListener("submit", function (self) {
	self.preventDefault();
	userAuth();
});

function openModal() {
	modal.classList.add("active");
	overlay.classList.add("active");
}

function closeModal() {
	modal.classList.remove("active");
	overlay.classList.remove("active");
}

function userAuth() {
	socket.emit("auth", {
		user: user.value,
		pass: pass.value,
		}, function (data) {
			if (data.role !== "N") {
				if (data.role === "M") {
					window.location.href = "./manager/";
				} else if (data.role === "I") {
					window.location.href = "./it/";
				}  else if (data.role === "P") {
					window.location.href = "./prog/";
				} 
			} else {
				openModal();
			}
	});
	pass.value = "";
}
