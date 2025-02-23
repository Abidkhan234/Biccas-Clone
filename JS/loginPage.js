const loginBtn = document.querySelector(".toggle-box-1 .sign-in");

const signBtn = document.querySelector(".toggle-box-2 .login");

const container = document.querySelector(".main-container");

loginBtn.addEventListener("click", () => {
    container.classList.add("check");
    console.log("ok");
    
})


signBtn.addEventListener("click", () => {
    container.classList.remove("check");
})