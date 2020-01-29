var socket = io.connect('http://localhost:4001');

//Buttons
const hire = document.getElementById('hire');
const fire = document.getElementById('fire');
const newP = document.getElementById('newP');
const undeploy = document.getElementById('undeploy');
const logout = document.getElementById('logout');

//overlay
const overlay = document.getElementById('overlay');

//Hire Modal
const hireModal = document.getElementById('hireModal');
const newUser = document.getElementById('newUser');
const newPass = document.getElementById('newPass');
const newPassConfirm = document.getElementById('newPassConfirm');
const radioM = document.getElementById('radioM');
const radioI = document.getElementById('radioI');
const radioP = document.getElementById('radioP');


function closeHire() {
    newUser.value = "";
    newPass.value = "";
    newPassConfirm.value = "";
    radioP.checked = true;
    closeModal('hireModal');
}

function addNewUser() {
    if (newPass.value !== newPassConfirm.value) {
        openModal('passwordMismatchError');
    } else if (checkUser(newUser.value)) {
        openModal('userAlreadyExistsError');
    } else {
        socket.emit('addNewUser', {
            user: newUser.value,
            pass: newPass.value,
            role: getRole()
        });
        closeHire();
    }
}

/**
 *
 * @param user
 * @returns {Promise<void>}
 */
async function checkUser(user) {
    await socket.emit('checkUser', {
        user: user
    }, function (res) {
        console.log("checkUser", res);
        return res;
    });
}

function getRole() {
    if (radioM.checked) {
        return 'M'
    }
    if (radioI.checked) {
        return 'I'
    }
    if (radioP.checked) {
        return 'P'
    }
}

function openModal(modal) {
    document.getElementById(modal).classList.add('active');
    overlay.classList.add('active');
    if (document.getElementById(modal).classList.contains('error')) {
        overlay.classList.add('error');
    }
}

function closeModal(modal) {
    document.getElementById(modal).classList.remove('active');
    if (overlay.classList.contains('error')) {
        overlay.classList.remove('error');
    } else {
        overlay.classList.remove('active');
    }
}
