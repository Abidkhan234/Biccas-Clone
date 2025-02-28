import { auth, createUserWithEmailAndPassword, db, doc, getDoc, setDoc } from "./FireBase.js";

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

const signInFormBtn = document.getElementById("signIn-btn");

const fullNameBox = document.getElementById("fullName");

const signInEmailBox = document.getElementById("signInemail");


const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;

const signInPasswordBox = document.getElementById("signInpassword");

signInFormBtn.addEventListener("click", async () => {

    let messages =
    {
        fullName: "",
        email: "",
        password: ""
    };

    // For User Name field checking

    if (fullNameBox.value.length === 0) {
        messages.fullName = "Name is required";
    } else if (fullNameBox.value.length < 4) {
        messages.fullName = "Name must be atleast 4 character long.";
    }

    // For User Name field checking

    // For Email field checking
    if (signInEmailBox.value.length === 0) {
        messages.email = "Email is required.";
    } else if (!emailRegex.test(signInEmailBox.value)) {
        messages.email = "Please enter a valid email address.";
    }

    // For Email field checking

    // For Password field checking
    if (signInPasswordBox.value.length === 0) {
        messages.password = "Password is required.";
    } else if (!passwordRegex.test(signInPasswordBox.value)) {
        messages.password = "Password must contain 6 character.";
    }

    // For Password field checking

    if (messages.email || messages.password || messages.fullName) {
        errorShowingFunc(messages);
    }
    else {
        fireBaseFunc(signInEmailBox.value, signInPasswordBox.value, fullNameBox.value, messages);
    }
});

// For login and sign in fields check

const errorShowingFunc = (messages1, error) => {

    if (error) {
        if (error.includes("auth/email-already-in-use")) {
            messages1.email = "Email already in use";
        }
    }

    // For SignIn
    const errorEle = document.querySelectorAll(".signIn-form .error p");

    errorEle[0].parentElement.classList.remove("invisible");
    errorEle[1].parentElement.classList.remove("invisible");
    errorEle[2].parentElement.classList.remove("invisible");

    errorEle[0].innerHTML = messages1.fullName;
    errorEle[1].innerHTML = messages1.email;
    errorEle[2].innerHTML = messages1.password;

    const div = document.querySelectorAll(".signIn-form .password-eye-btn-div");

    if (errorEle[0].innerHTML !== "") {
        div[0].classList
            .replace("translate-y-[-50%]", "translate-y-[-25%]")
        div[0].classList.replace("top-[50%]", "top-[25%]");
    } else {
        div[0].classList.replace("translate-y-[-25%]", "translate-y-[-50%]")
        div[0].classList.replace("top-[25%]", "top-[50%]");
    }

    if (errorEle[1].innerHTML !== "") {
        div[1].classList.replace("translate-y-[-50%]", "translate-y-[-25%]")
        div[1].classList.replace("top-[50%]", "top-[25%]")
    } else {
        div[1].classList.replace("translate-y-[-25%]", "translate-y-[-50%]")
        div[1].classList.replace("top-[25%]", "top-[50%]")
    }


    if (errorEle[2].innerHTML !== "") {
        div[2].classList.replace("translate-y-[-50%]", "translate-y-[-25%]")
        div[2].classList.replace("top-[50%]", "top-[25%]")
    } else {
        div[2].classList.replace("translate-y-[-25%]", "translate-y-[-50%]")
        div[2].classList.replace("top-[25%]", "top-[50%]")
    }

    // For SignIn
    messages1.email = "";
    messages1.fullName = "";
    messages1.password = "";
}


const fireBaseFunc = (v1, v2, v3, message) => {

    // For Sign Up
    createUserWithEmailAndPassword(auth, v1, v2)
        .then(async (userCredential) => {

            const user = userCredential.user;

            console.log(user);

            // For restting
            signInEmailBox.value = "";
            signInPasswordBox.value = "";
            fullNameBox.value = "";

            errorShowingFunc(message);
            // For restting

            try {
                await setDoc(doc(db, "users", user.uid), {
                    fullName: v3,
                    email: v1
                });
            } catch (error) {
                console.log(error);
            }

            localStorage.setItem("isLogged", true);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            console.log(errorCode);

            errorShowingFunc(message, errorCode)

        });
    // For Sign Up

}
