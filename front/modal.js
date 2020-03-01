
function openModal(modal) {
	document.getElementById(modal).classList.add("active");
	overlay.classList.add("active");
	if (document.getElementById(modal).classList.contains("error")) {
		overlay.classList.add("error");
	}
}

function closeModal(modal) {
	document.getElementById(modal).classList.remove("active");
	if (overlay.classList.contains("error")) {
		overlay.classList.remove("error");
	} else {
		overlay.classList.remove("active");
	}
}