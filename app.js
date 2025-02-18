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