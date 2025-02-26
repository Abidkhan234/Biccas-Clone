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

import { auth, createUserWithEmailAndPassword, db, doc, getDoc, setDoc } from "./FireBase.js";

const loginFormBtn = document.getElementById("login-btn");

const loginPasswordBox = document.getElementById("password");

const loginEmailBox = document.getElementById("email");

const data = JSON.parse(localStorage.getItem("data"));

loginFormBtn.addEventListener("click", (e) => {

    let messages =
    {
        email: "",
        password: ""
    };

    if (data) {
    
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


        if (messages.email || messages.password) {
            errorShowingFunc(e.target.parentElement.parentElement.classList[0], undefined, messages);
        } else {
            window.location.href = "/index.html";
        }

    } else {
        alert("Plz create account first");
        container.classList.add("check");
        return;
    }

});


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signInFormBtn = document.getElementById("signIn-btn");

const fullNameBox = document.getElementById("fullName");

const signInEmailBox = document.getElementById("signInemail");

const signInPasswordBox = document.getElementById("signInpassword");

signInFormBtn.addEventListener("click", () => {

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
    } else if (!emailPattern.test(signInEmailBox.value)) {
        messages.email = "Please enter a valid email address.";
    }

    // For Email field checking

    // For Password field checking
    if (signInPasswordBox.value.length === 0) {
        messages.password = "Password is required.";
    } else if (signInPasswordBox.value.length < 6) {
        messages.password = "Password must be atleast 6 character long.";
    }

    // For Password field checking

    if (messages.email || messages.password || messages.fullName) {
        errorShowingFunc(undefined, messages, undefined);
    }
    else {
        fireBaseFunc(signInEmailBox.value, signInPasswordBox.value, fullNameBox.value)
        signInEmailBox.value = "";
        signInPasswordBox.value = "";
        fullNameBox.value = "";
    }
});

// For login and sign in fields check

const errorShowingFunc = (v, messages1, messages2) => {

    if (v === "login-form") {
        // For Login
        const errorEle = document.querySelectorAll(".login-form .error p");

        errorEle[0].parentElement.classList.remove("invisible");
        errorEle[1].parentElement.classList.remove("invisible");

        errorEle[0].innerHTML = messages2.email;
        errorEle[1].innerHTML = messages2.password;

        const div = document.querySelectorAll(".password-eye-btn-div");

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

        messages2 = {};
        // For Login
    } else {
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
        messages1 = {};
    }

}

const fireBaseFunc = (v1, v2, v3) => {

    createUserWithEmailAndPassword(auth, v1, v2)

        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            let uid = user.uid;
            // ...

            try {

                await setDoc(doc(db, `${v3}`, uid), {
                    fullName: v3,
                    email: v1,
                    password: v2,
                });

                const docRef = doc(db, `${v3}`, uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    localStorage.setItem("data", JSON.stringify(docSnap.data()))
                } else {
                    console.log("No such document!");
                }

            } catch (error) {
                console.log(error);
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });

}