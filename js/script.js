var inputName = document.querySelector("#name");
var inputEmail = document.querySelector("#email");
var inputPassword = document.querySelector("#password");
var error = document.querySelector("#error");
var signBtn = document.querySelector("#sign");
var loginBtn = document.querySelector("#login");
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var wel = document.querySelector("#wel");
var userName = localStorage.getItem("userName");

var userInput = (userInput = JSON.parse(localStorage.getItem("users")) || []);

if (signBtn) {
  signBtn.addEventListener("click", () => {
    var emailExists = false;
    for (var i = 0; i < userInput.length; i++) {
      if (userInput[i].email === inputEmail.value) {
        emailExists = true;
        break;
      }
    }

    if (!inputName.value || !inputEmail.value || !inputPassword.value) {
      error.innerHTML = `All inputs is required`;
      error.style.color = "red";
      setTimeout(() => {
        error.innerHTML = "";
      }, 8000);
      return;
    }

    if (emailExists) {
      error.innerHTML = `Email already exists`;
      error.style.color = "red";
      setTimeout(() => {
        error.innerHTML = "";
      }, 8000);
      return;
    } else {
      sign();
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    var emailFound = false;
    for (var i = 0; i < userInput.length; i++) {
      if (
        userInput[i].email === loginEmail.value &&
        userInput[i].password === loginPassword.value
      ) {
        emailFound = true;

        localStorage.setItem("userName", userInput[i].name);
        localStorage.setItem("loggedIn", "true");
        location.replace("home.html");
      }
    }

    if (!loginEmail.value || !loginPassword.value) {
      error.innerHTML = `All inputs is required`;
      error.style.color = "red";
      setTimeout(() => {
        error.innerHTML = "";
      }, 8000);
      return;
    }

    if (!emailFound) {
      error.innerHTML = `incorrect email or password`;
      error.style.color = "red";
      setTimeout(() => {
        error.innerHTML = "";
      }, 8000);
      return;
    }
  });
}

var logOut = document.querySelector("#logOut");

if (logOut) {
  logOut.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    location.replace("index.html");
  });
}

if (wel && userName) {
  wel.innerHTML = `Welcome ${userName}`;
}

function sign() {
  if (
    validateInput(inputName) &&
    validateInput(inputEmail)
  ) {
    var input = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };
    userInput.push(input);
    localStorage.setItem("users", JSON.stringify(userInput));
    clearForm();
    error.innerHTML = `Registration successful`;
    error.style.color = "green";
    setTimeout(() => {
      error.innerHTML = "";
    }, 8000);
  }
}

function validateInput(element) {
  var regex = {
    name: /^[A-Za-z ]{4,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

function clearForm() {
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
}

