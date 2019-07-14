window.addEventListener('load', windowLoadHandler, false);

function windowLoadHandler() {
  User.init();
}

var User = {
  data: [],
  torolniKivantSzar: 0,
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
          if (memberName === 'id') {
            usersTemplate += `<td><input type="text" class="input--disabled inputID" disabled value="${users[i][memberName]}"></td>`;
          } else {
            usersTemplate += `<td><input type="text" class="input--disabled" disabled value="${users[i][memberName]}"></td>`;
          }
        }
      }
      usersTemplate += `<td><button onclick="User.edit()" dataid="${users[i].id}">Szerkesztés</button>
      <button onclick="User.save()" class="display--none" dataid="${users[i].id}">✓</button>
      <button onclick="User.cancel()" class="display--none" dataid="${users[i].id}">X</button></td>`;
      usersTemplate += `<td><button onclick="User.torles()" dataid="${users[i].id}">Törlés</button></td>`;
      usersTemplate += '</tr>';
    }

    document.querySelector('.users__data').innerHTML = usersTemplate;
  },

  torles() {
    var nodeTD = event.target;
    var nodeTDID = parseInt(nodeTD.getAttribute('dataid'), 10);
    User.torolniKivantSzar = nodeTDID;
    var nodeDeleteDiv = document.querySelector('#deleteDiv');
    nodeDeleteDiv.style.display = 'inline';
  },

  applyDelete(bool) {
    if (bool === 'true') {
      User.remove(this.torolniKivantSzar);
      var nodeDeleteDiv = document.querySelector('#deleteDiv');
      nodeDeleteDiv.style.display = 'none';

      var nodeUzenet = document.querySelector('#felhasznaloSikeresenTorolve');
      nodeUzenet.setAttribute('class', 'uzenetBoxGreen');
      setTimeout(function idozito() { nodeUzenet.setAttribute('class', 'display--none'); }, 4000);
    } else {
      nodeDeleteDiv = document.querySelector('#deleteDiv');
      nodeDeleteDiv.style.display = 'none';
    }
  },

  remove(ID) {
    for (var i = 0; i < this.data.length; i++) {
      if (ID === this.data[i].id) {
        this.data.splice(i, 1);
        break;
      }
    }
    this.showAll(this.data);
  },

  calculateMaxOfId() {
    var maxId = 0;
    for (var i = 0; i < this.data.length; i += 1) {
      if (maxId < this.data[i].id) {
        maxId = this.data[i].id;
      }
    }
    return maxId;
  },

  maxOfUserIdUzenet() {
    var nodeUzenet = document.querySelector('#maxOfId');
    nodeUzenet.setAttribute('class', 'uzenetBoxGreen');
    nodeUzenet.innerText = `A legnagyobb felhasználóID pillanatnyilag: ${this.calculateMaxOfId()}`;
    setTimeout(function idozito() { nodeUzenet.setAttribute('class', 'display--none'); }, 4000);
  },

  create() {
    var newUser = {};

    newUser.id = this.calculateMaxOfId() + 1;

    var newUserName = document.querySelector('#newUser').value;
    if (newUserName !== null && newUserName !== '') {
      newUser.name = newUserName;
    }

    var newUserEmail = document.querySelector('#newUserEmail').value;
    if (newUserEmail !== null && newUserEmail !== '') {
      newUser.emailAddress = newUserEmail;
    }

    var newUserAddress = document.querySelector('#newUserAddress').value;
    if (newUserAddress !== null && newUserAddress !== '') {
      newUser.address = newUserAddress;
    }

    if (newUser.name !== null && newUser.name !== '' &&
      newUserEmail !== null && newUserEmail !== '' &&
      newUserAddress !== null && newUserAddress !== '') {
      this.data.push(newUser);
      this.clear();
      var nodeUzenet = document.querySelector('#ujFelhasznaloSikeresenRogzitve');
      nodeUzenet.setAttribute('class', 'uzenetBoxGreen');
      setTimeout(function idozito() { nodeUzenet.setAttribute('class', 'display--none'); }, 4000);
    }

    if (newUser.name === null || newUser.name === '' ||
      newUserEmail === null || newUserEmail === '' ||
      newUserAddress === null || newUserAddress === '') {
      nodeUzenet = document.querySelector('#ujFelhasznaloUresMezok');
      nodeUzenet.setAttribute('class', 'uzenetBoxRed');
      setTimeout(function idozito() { nodeUzenet.setAttribute('class', 'display--none'); }, 4000);
    }
    this.showAll(this.data);
  },

  clear() {
    document.querySelector('#newUser').value = '';
    document.querySelector('#newUserEmail').value = '';
    document.querySelector('#newUserAddress').value = '';
  },

  store() {

  },
  edit() {
    var nodeTD = event.target;
    var nodeTRID = parseInt(nodeTD.getAttribute('dataid'), 10);
    var nodeTR = document.getElementById(`${nodeTRID}`);
    nodeTR.children[4].children[0].setAttribute('class', 'display--none');
    nodeTR.children[4].children[1].setAttribute('class', 'display');
    nodeTR.children[4].children[2].setAttribute('class', 'display');
    // var nodeSzerkesztButton = nodeTR.children[]
    var nodeUzenet = document.querySelector('#felhasznaloSikeresenModositva');
    nodeUzenet.setAttribute('class', 'uzenetBoxGreen');
    setTimeout(function idozito() { nodeUzenet.setAttribute('class', 'display--none'); }, 4000);

    for (var i = 1; i < 4; i++) {
      var nodeInput = nodeTR.children[i].children[0];
      nodeInput.disabled = false;
    }
  },
  save() {
    var nodeTD = event.target;
    var nodeTRID = parseInt(nodeTD.getAttribute('dataid'), 10);
    var nodeTR = document.getElementById(`${nodeTRID}`);
    nodeTR.children[4].children[0].setAttribute('class', 'display');
    nodeTR.children[4].children[1].setAttribute('class', 'display--none');
    nodeTR.children[4].children[2].setAttribute('class', 'display--none');
  },
  cancel() {
    var nodeTD = event.target;
    var nodeTRID = parseInt(nodeTD.getAttribute('dataid'), 10);
    var nodeTR = document.getElementById(`${nodeTRID}`);
    nodeTR.children[4].children[0].setAttribute('class', 'display');
    nodeTR.children[4].children[1].setAttribute('class', 'display--none');
    nodeTR.children[4].children[2].setAttribute('class', 'display--none');
  }

};

User.init();

