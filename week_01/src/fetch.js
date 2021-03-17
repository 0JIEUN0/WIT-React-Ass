fetchUser();

function fetchUser() {
  const url = 'https://jsonplaceholder.typicode.com/posts/';
  fetch(url)
    .then(response => response.json())
    .then(json => userInfo(json))
}

function userInfo(users){
  let div = document.createElement('fetchResult');
  users
    .filter(user => user.userId === 1)
    .map(user => {
      var childDiv = document.createElement('userId_1');
      childDiv.innerHTML += (makeUserText(user));
      div.append(childDiv);
  })
  document.body.append(div);
}

const makeUserText = (arg) => {
  return "userId : " + arg.userId
  + "<br>id : " + arg.id
  + "<br>title : " + arg.title
  + "<br>body : " + arg.body
  + "<br><br>";
};
