var socket = io.connect('http://localhost:4001');

const form = document.getElementById('form');
const user = document.getElementById('user');
const pass = document.getElementById('pass');

const modal = document.getElementById('modal');
const close = document.getElementById('closePopUp');
const overlay = document.getElementById('overlay');

var token = -1;


form.addEventListener('submit', function(self){
	self.preventDefault();
	token = Math.random() * 1000 + 1;
	socket.emit('auth', {
		user: user.value,
		pass: pass.value,
		token : token
	});
	pass.value = '';
});

socket.on('authRes', function(data){
	if (data.token == token) {
		if (data.success) {
			alert(data.role);
		} else {
			openModal();
		}
	}
});

function openModal() {
	modal.classList.add('active');
	overlay.classList.add('active');
}

function closeModal() {
	modal.classList.remove('active');
	overlay.classList.remove('active');
}