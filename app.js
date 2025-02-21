const openBtn = document.getElementById("openBtn");

const closeBtn = document.getElementById("closeBtn");

const sideBar = document.querySelector(".sideBar");


openBtn.addEventListener("click", () => openSidebar());

closeBtn.addEventListener("click", () => closeSidebar());


const openSidebar = () => {
    sideBar.classList.remove("translate-x-[100%]");
}

const closeSidebar = () => {
    sideBar.classList.add("translate-x-[100%]");
}

const allMenuBtn = document.querySelectorAll(".nav-menu a");

allMenuBtn.forEach((v) => {

    v.addEventListener("click", (e) => {

        allMenuBtn.forEach(element => {
            element.classList.remove("check")
        });

        e.target.classList.add("check")

    })

})


const subscriptionBtns = document.querySelectorAll(".subscription-btns button");

const btn1 = document.getElementById("btn-1");

const btn2 = document.getElementById("btn-2");

btn1.addEventListener("click", () => {
    return showingResult(btn1.innerText);
})

btn2.addEventListener("click", () => {
    return showingResult(btn2.innerText);
})

const values = [
    "Bil Monthly",
    "Bil Yearly"
]

const showingResult = (testingValue) => {
    if (testingValue === values[0]) {

        btn1.classList.add("clicked")

        btn2.classList.remove("clicked")

    } else if (testingValue === values[1]) {

        btn2.classList.add("clicked")

        btn1.classList.remove("clicked")

    }
}