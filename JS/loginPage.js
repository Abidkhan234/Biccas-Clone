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

const loginPasswordBox = document.getElementById("password");

const loginEmailBox = document.getElementById("email");

const uid = JSON.parse(localStorage.getItem("uid"));

loginFormBtn.addEventListener("click", () => {

    let messages =
    {
        email: "",
        password: ""
    };

    if (uid) {

        let data;

        uid.forEach((v) => {
            data = v;
            return data
        })

        // For Email field checking
        if (loginEmailBox.value.length === 0) {
            messages.email = "Email is required";
        } else if (loginEmailBox.value !== data.email) {
            messages.email = "Invalid email";
        }

        // For Email field checking

        // For Password field checking
        if (loginPasswordBox.value.length === 0) {
            messages.password = "Password is required";
        } else if (loginPasswordBox.value !== data.password) {
            messages.password = "Invalid Password";
        }

        // For Password field checking

        // For showing error to user


        if (messages.email || messages.password) {

            const errorEle = document.querySelectorAll(".login-form .error p");

            errorEle[0].parentElement.classList.remove("invisible");
            errorEle[1].parentElement.classList.remove("invisible");

            errorEle[0].innerHTML = messages.email;
            errorEle[1].innerHTML = messages.password;

            const div = document.querySelectorAll(".password-eye-btn-div");

            if (errorEle[0].innerHTML !== "") {
                div[0].classList.replace("translate-y-[-50%]", "translate-y-[-25%]")
                div[0].classList.replace("top-[50%]", "top-[25%]")
            } else {
                div[0].classList.replace("translate-y-[-25%]", "translate-y-[-50%]")
                div[0].classList.replace("top-[25%]", "top-[50%]")
            }

            if (errorEle[1].innerHTML !== "") {
                div[1].classList.replace("translate-y-[-50%]", "translate-y-[-25%]")
                div[1].classList.replace("top-[50%]", "top-[25%]")
            } else {
                div[1].classList.replace("translate-y-[-25%]", "translate-y-[-50%]")
                div[1].classList.replace("top-[25%]", "top-[50%]")
            }

            messages = {};

        } else {
            window.location.href = "/index.html";
        }

        // For showing error to user

    } else {
        alert("Plz create account first");
        container.classList.add("check");
        return;
    }
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signInFormBtn = document.getElementById("signIn-btn");

signInFormBtn.addEventListener("click", () => {
    
})

// For login and sign in fields check