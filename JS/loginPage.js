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

import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "./FireBase.js";

const loginFormBtn = document.getElementById("login-btn");

const loginPasswordBox = document.getElementById("password");

const loginEmailBox = document.getElementById("email");

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
;

const isLogged = localStorage.getItem("isLogged");

loginFormBtn.addEventListener("click", (e) => {

    let messages =
    {
        email: "",
        password: ""
    };

    if (isLogged) {

        if (loginEmailBox.value.length === 0) {
            messages.email = "Email is required";
        } else if (!emailRegex.test(loginEmailBox.value)) {
            messages.email = "Invalid email format";
        }

        if (loginPasswordBox.value.length === 0) {
            messages.password = "Password is required";
        }

        // For Email field checking

        if (messages.email || messages.password) {
            errorShowingFunc(messages);
        } else {
            fireBaseFunc(loginEmailBox.value, loginPasswordBox.value, messages);
        }

    } else {
        alert("Plz create account first");
        window.location.href = "./signInPage.html";
        return;
    }

});

const fireBaseFunc = (v1, v2, messages) => {

    signInWithEmailAndPassword(auth, v1, v2)
        .then(async (userCredential) => {

            const user = userCredential.user;

            // For resetting            

            loginEmailBox.value = "";
            loginPasswordBox.value = "";

            errorShowingFunc(messages);
            // For resetting

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    let data;

                    data = docSnap.data();

                    localStorage.setItem("userData", JSON.stringify(data));

                    setTimeout(() => {
                        window.location.href = "./index.html";
                    }, 1000);

                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);

            // For resetting
            errorShowingFunc(messages, errorCode);
            // For resetting
        });

}


const errorShowingFunc = (messages2, error) => {

    if (error) {

        if (error.includes("auth/invalid-email")) {
            messages2.email = "Invalid Email";
        }

        if (error.includes("auth/invalid-credential")) {
            messages2.password = "Invalid Password";
        }
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

        // For Login

    } else {
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

        messages2.email = "";
        messages2.password = "";
        // For Login
    }
}