var userLoginData = [{
  name: 'Škravan Krisztina',
  email: 'skrisztina@brainoverflow.com',
  password: 'skrisztina88'
},
{
  name: 'Lajos-Kovács Kriszina',
  email: 'lkkrisztina@brainoverflow.com',
  password: 'lkkrisztina14'
},
{
  name: 'Pál Sára',
  email: 'psara@brainoverflow.com',
  password: 'psara13'
},
{
  name: 'Szentiványi András Viktor',
  email: 'kisszenty@brainoverflow.com',
  password: 'iddqd666'
},
{
  name: 'Katkó György',
  email: 'veneration218@brainoverflow.com',
  password: 'resistanceisfutile'
}
];

// Ez ellenőrzi az email input mezőt.
function searchUserEmailName() {
  var result = [];
  var inputEmailName = document.querySelector('#inputEmailName').value;
  // console.log('Email input értéke: ', inputUserEmail);

  for (var i = 0; i < userLoginData.length; i++) {
    if (userLoginData[i].email === inputEmailName || userLoginData[i].name === inputEmailName) {
      result.push(userLoginData[i]);
      searchUserPassword(result);
      break;
    }
  }
  return result;
}

// Ez ellenőrzi a jelszó input mezőt.
function searchUserPassword(param) {
  var result = false;
  var inputPassword = document.querySelector('#inputPassword').value;

  if (param[0].password === inputPassword) {
    result = true;
    navigateToIndexHTML(result);
  }
  return result;
}

function navigateToIndexHTML(param) {
  if (param === true) {
    location.href = 'https://index.hu/';
  }
}


/* function brainLogin(userLoginData) {
  if (userLoginData.name === userLoginData.name.value || userLoginData.email === userLoginData.email.value) {
    if (userLoginData.password === userLoginData.password.value) {
      location = '/views/indexsara.html';
    }
  } else {
    alert('Hibás felhasználónév vagy jelszó!');
  }
} */

/* var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function brainLogin(userLoginData) {
  var username = document.getElementsByName('emailname').value;
  var password = document.getElementsByName('password').value;
  if ((username == userLoginData.name || userLoginData.email == userLoginData.email) && password == userLoginData.password) {
    prompt('Szezám tárulj!');
    location = '/views/projektSara.js';
    return false;
  }
  attempt--; // Decrementing by one.
  alert('You have left ' + attempt + ' attempt;');
  // Disabling fields after 3 attempts.
  if (attempt == 0) {
    document.getElementById('username').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('submit').disabled = true;
    return false;
  }
} */
