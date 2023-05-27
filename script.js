let cont = document.querySelector('.root');
let arr = [];

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(res => {
    createCards(res);
    localStorage.setItem('list', JSON.stringify(res));
  })
  .catch(err => {
    console.log(err);
  });

function createCards(arg) {
  arg.forEach(el => {
    let div = document.createElement('div');
    div.className = 'cont';
    div.innerHTML = `
      <h3>${el.name};</h3>        
      <span>Username: ${el.username}</span>
      <span>Phone: ${el.phone}</span>
      <span>Website: ${el.website}</span>
      <span class='paragraph' style='display:none;'>id: ${el.id}</span>   
      <button class='more'>Learn More</button> 
      <button class='add'>Add Friend</button>
    `;
    cont.appendChild(div);

    let moreBtn = div.querySelector('.more');
    let paragraph = div.querySelector('.paragraph');
    let addBtn = div.querySelector('.add');

    addBtn.addEventListener('click', () => {
      arr.push(el.name);
      isFriends();
    });

    moreBtn.addEventListener('click', () => {
      if (paragraph.style.display === 'none') {
        paragraph.style.display = 'block';
      } else {
        paragraph.style.display = 'none';
      }
    });
  });
}

function isFriends() {
  let Fcont = document.querySelector('.f-cont');
  if (!Fcont) {
    Fcont = document.createElement('div');
    Fcont.className = 'f-cont';
    Fcont.innerHTML = `
      <h3>Friends</h3>
      <p class='list'></p>
    `;
    cont.appendChild(Fcont);
  }

  let list = Fcont.querySelector('.list');
  list.innerHTML = '';

  let uniqueFriends = arr.filter((friend, i) => arr.indexOf(friend) === i);
  uniqueFriends.forEach(friend => {
    list.innerHTML += `${friend}<br>`;
  });
}

window.addEventListener('load', function() {
  isFriends();
});
