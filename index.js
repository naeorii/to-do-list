const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// carrega do localStorage ou cria lista vazia
let list = JSON.parse(localStorage.getItem("list")) || [];

// recria as tarefas salvas
list.forEach(task => {
    toDoList(task);
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;

    if (task) {
        newTask = task.name;
    }

    if (newTask === "") return;

    const liEl = document.createElement("li");

    if (task && task.checked) {
        liEl.classList.add("checked");
    }

    liEl.innerText = newTask;
    ulEl.appendChild(liEl);

    inputEl.value = "";

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = '<i class="fa-regular fa-square"></i>';
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>';
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");

        const icon = checkBtnEl.querySelector("i");

        if (liEl.classList.contains("checked")) {
            icon.classList.remove("fa-regular", "fa-square");
            icon.classList.add("fa-solid", "fa-square-check");
        } else {
            icon.classList.remove("fa-solid", "fa-square-check");
            icon.classList.add("fa-regular", "fa-square");
        }
            updateLocalStorage();
    });

    if (task && task.checked) {
        checkBtnEl.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    } else {
        checkBtnEl.innerHTML = '<i class="fa-regular fa-square"></i>';
    }



    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll(".list li");
    list = [];

    liEls.forEach(liEl => {
        list.push({
            name: liEl.firstChild.textContent.trim(),
            checked: liEl.classList.contains("checked")
        });
    });

    localStorage.setItem("list", JSON.stringify(list));
}
