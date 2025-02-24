const loginBtn = document.querySelector(".toggle-box-1 .sign-in");

const signBtn = document.querySelector(".toggle-box-2 .login");

const container = document.querySelector(".main-container");

loginBtn.addEventListener("click", () => {
    container.classList.add("check");
})


signBtn.addEventListener("click", () => {
    container.classList.remove("check");
})


// For password check

const passwordEyeBtn = document.querySelectorAll(".password-eye-btn");

passwordEyeBtn.forEach((v) => {
    v.addEventListener("click", () => passwordChecker(v));
})

const passwordChecker = (v) => {

    let i = v.querySelector("i");

    let passwordBox = v.parentElement.parentElement.querySelector(".password")

    if (i.classList.contains("fa-eye-slash")) {

        passwordBox.type = "text";
        i.classList.replace("fa-eye-slash", "fa-eye");

    } else {

        passwordBox.type = "password";
        i.classList.replace("fa-eye", "fa-eye-slash");

    }

}

// For password check


// For login and sign in fields check

const loginFormBtn = document.getElementById("login-btn");

const signInFormBtn = document.getElementById("signIn-btn");

let uid = localStorage.getItem("uid");

loginFormBtn.addEventListener("click", () => {
    if (uid) {
        
    } else {
        alert("Plz create account first");
        container.classList.add("check");
        return;
    }
})

// For login and sign in fields check