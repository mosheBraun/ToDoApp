const TITLE = 'Welcome to our ToDo App!!!';


// function loginBtnClicked() {
//   let inputEl = document.querySelector("#user-name-input");
//   let userName = inputEl.value;
//   console.log(`${userName} logged into our app...`)

//   setTimeout(displayApp, 100);

//   let loginBtn = document.querySelector('#login-btn');

//   loginBtn.innerText = 'Logging In...';


// }

function displayApp(UserId) {
  let container = document.querySelector(".todo-container");
  container.style.display = "block";

  let welcomeCtr = document.querySelector(".Login-Page");
  welcomeCtr.style.display = "none";
  let welcomeSignup = document.querySelector(".Sign-up-Page");
  welcomeSignup.style.display = "none";

  displayTitle();
  displayTasks(UserId);
}

function displayTitleTillIndex(index) {
  let subTitle = TITLE.substring(0, index + 1);
  let h1El = document.querySelector('#app-title');
  if (index < TITLE.length - 1) subTitle += '_';
  h1El.innerText = subTitle;
}


function displayTitle() {
  for (let i = 0; i < TITLE.length; i++) {
    setTimeout(function () {
      displayTitleTillIndex(i);
    }, i * 100);
  }

}