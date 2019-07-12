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

window.addEventListener('load', window_LoadHandler);

function window_LoadHandler() {
  var nodeLogInInput = document.querySelector('#loginBtn');
  nodeLogInInput.addEventListener('click', logIn_ClickHandler);
}

function logIn_ClickHandler() {
  var inputEmail = document.getElementById('inputEmail').value;
  var inputPassword = document.getElementById('inputPassword').value;

  for (var i = 0; i < userLoginData.length; i++) {
    if (inputEmail == userLoginData[i].email && inputPassword == userLoginData[i].password) {
      window.open('/views/indexSara.html', '_self');
      return;
    }
  }
  var nodeHibak = document.querySelector('#failedLogin');
  nodeHibak.style.display = 'block';
}
