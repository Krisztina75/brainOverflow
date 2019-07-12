window.addEventListener('load', windowLoadHandler, false);

function windowLoadHandler() {
  User.init();
}
var User = {
  data: [],
  init() {
    this.getData();
  },
  callback(jsonContent) {
    this.data = JSON.parse(jsonContent).users;
    this.showAll(this.data);
  },
  getData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.callback(request.responseText);
      }
    };
    request.open('GET', '/data/users.json');
    request.send();
  },
  showAll(users) {
    var usersTemplate = '';
    for (var i = 0; i < users.length; i += 1) {
      usersTemplate += `<tr id="${users[i].id}">`;

      for (var memberName in users[i]) {
        if (users[i].hasOwnProperty(memberName)) {
          // if (memberName === 'id') {
          //   continue;
          // }
          usersTemplate += `<td><input type="text" class="input--disabled" disabled value="${users[i][memberName]}"></td>`;
        }
      }
      usersTemplate += `<td><button  dataid="${users[i].id}">Szerkesztés</button> <button class="display--none" dataid="${users[i].id}">x</button><button class="display--none" dataid="${users[i].id}">✓</button></td>`;
      usersTemplate += `<td><button onclick="User.remove()" dataid="${users[i].id}">Törlés</button></td>`;
      usersTemplate += '</tr>';
    }

    document.querySelector('.users__data').innerHTML = usersTemplate;
  },
  remove() {
    var nodeTD = event.target;
    var nodeTDID = parseInt(nodeTD.getAttribute('dataid'), 10);
    for (var i = 0; i < this.data.length; i++) {
      if (nodeTDID === this.data[i].id) {
        this.data.splice(i, 1);
        break;
      }
    }
    this.showAll(this.data);
  },

  create() {
    var newUser = {};

    newUser.id = 103;
    newUser.name = document.querySelector('#newUser').value;
    newUser.emailAddress = document.querySelector('#newUserEmail').value;
    newUser.address = document.querySelector('#newUserAddress').value;

    this.data.push(newUser);
    this.showAll(this.data);
  },
  store() {

  },
  edit() {

  }

};

User.init();

