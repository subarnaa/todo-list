const dummyData = [
   "Get off of the Bed!",
   "Get out of the room sometimes!",
   "Padna Baas",
];

localStorage.clear();

if (!JSON.parse(localStorage.getItem("todos"))) {
   localStorage.setItem("todos", JSON.stringify([]));
   localStorage.setItem("status", JSON.stringify([]));
}

function createElement(text, index, toLocalStorage) {
   const todoList = document.getElementById("todo-list");

   const newTask = document.createElement("li");
   newTask.className = "item";
   newTask.textContent = text;

   const localList = JSON.parse(localStorage.getItem("todos"));

   newTask.id = index;

   const toggleBtn = document.createElement("button");
   toggleBtn.className = "control-btn toggle-btn";

   const toggleIcon = document.createElement("i");
   toggleIcon.className = "fas fa-toggle-off";
   toggleBtn.addEventListener("click", (event) => {
      onToggle(event);
   });

   toggleBtn.appendChild(toggleIcon);

   const deleteBtn = document.createElement("button");
   deleteBtn.className = "control-btn delete-btn";

   const deleteIcon = document.createElement("i");
   deleteIcon.className = "far fa-trash-alt";

   deleteBtn.appendChild(deleteIcon);
   deleteBtn.addEventListener("click", (event, index) => {
      onDelete(event, index);
   });

   const buttonsDiv = document.createElement("div");
   buttonsDiv.className = "control-btns";

   buttonsDiv.appendChild(toggleBtn);
   buttonsDiv.appendChild(deleteBtn);
   newTask.appendChild(buttonsDiv);
   todoList.appendChild(newTask);

   if (toLocalStorage) {
      addToLocalStorage(index, text);
   }
}

function addToLocalStorage(index, text) {
   if (JSON.parse(localStorage.getItem("todos"))[index] === text) {
      return;
   } else {
      const todos = JSON.parse(localStorage.getItem("todos"));
      todos.push(text);
      localStorage.setItem("todos", JSON.stringify(todos));
      const status = JSON.parse(localStorage.getItem("status"));
      status.push(false);
      localStorage.setItem("status", JSON.stringify(status));
   }
}

function createDummyList() {
   const list = JSON.parse(localStorage.getItem("todos"));
   if (list.length !== 0) {
      createList();
   } else {
      dummyData.map((item, index) => {
         const todos = JSON.parse(localStorage.getItem("todos"));
         const status = JSON.parse(localStorage.getItem("status"));
         todos.push(item);
         status.push(false);
         localStorage.setItem("todos", JSON.stringify(todos));
         localStorage.setItem("status", JSON.stringify(status));
      });
      createList();
   }
   addToggleStatus();
}

function createList() {
   const length = JSON.parse(localStorage.getItem("todos")).length;
   const todos = JSON.parse(localStorage.getItem("todos"));
   let item = "";
   for (i = 0; i < length; i++) {
      item = todos[i];
      createElement(item, i, true);
   }
}

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", onAdd);

function onAdd() {
   const input = document.getElementById("input");
   const inputText = input.value;
   const length = JSON.parse(localStorage.getItem("todos")).length;
   const llength = JSON.parse(localStorage.getItem("status")).length;

   if (inputText) {
      createElement(inputText, length, true);
   } else {
      alert("No input!!");
   }
   input.textContent = "";
}

// function isEmpty(obj) {
//     for(var prop in obj) {
//         if(obj.hasOwnProperty(prop))
//             return false;
//     }

//     return true;
// }

function onDelete(event, index) {
   event.preventDefault();
   const parent = event.target.parentElement;
   let btnPressed = "";
   if (event.target.nodeName === "BUTTON") {
      btnPressed = parent.parentElement.getAttribute("id");
   } else {
      btnPressed = parent.parentElement.parentElement.getAttribute("id");
   }

   document.getElementById(btnPressed).remove();
   const updateList = JSON.parse(localStorage.getItem("todos"));
   const updateStatus = JSON.parse(localStorage.getItem("status"));
   updateList.splice(btnPressed, 1);
   updateStatus.splice(index - 1, 1);
   localStorage.setItem("todos", JSON.stringify(updateList));
   localStorage.setItem("status", JSON.stringify(updateStatus));
}

function onToggle(event) {
   event.preventDefault();
   const parent = event.target.parentElement;
   let btnPressed = "";
   let iTag = "";
   if (event.target.nodeName === "BUTTON") {
      btnPressed = parent.parentElement.getAttribute("id");
      iTag = event.target.firstElementChild;
      changeToggleClass(iTag, btnPressed);
   } else {
      btnPressed = parent.parentElement.parentElement.getAttribute("id");
      iTag = event.target;
      changeToggleClass(iTag, btnPressed);
   }
}

function changeToggleClass(tag, index) {
   const status = JSON.parse(localStorage.getItem("status"));

   if (tag.classList.contains("fa-toggle-off")) {
      tag.classList.add("fa-toggle-on");
      tag.classList.remove("fa-toggle-off");
      status[Number(index)] = true;
   } else {
      tag.classList.add("fa-toggle-off");
      tag.classList.remove("fa-toggle-on");
      status[Number(index)] = false;
   }

   localStorage.setItem("status", JSON.stringify(status));
}

function assignToogleStatus(item, index) {
   const firstChild = item.firstElementChild;
   const secondChild = firstChild.firstElementChild;
   const i = secondChild.firstElementChild;
   const on = "fa-toggle-on";
   const off = "fa-toggle-off";

   const toggleStatus = JSON.parse(localStorage.getItem("status"))[index];

   if (toggleStatus) {
      i.classList.add(on);
      i.classList.remove(off);
   } else {
      i.classList.add(off);
      i.classList.remove(on);
   }
}

function addToggleStatus() {
   const elem = document.getElementById("todo-list");
   for (i = 0; i < elem.childElementCount; i++) {
      const child = elem.childNodes[i];
      assignToogleStatus(child, i);
   }
}

function showCompleted() {
   const item = document.getElementById("todo-list");
   const firstChild = item.childNodes;

   for (i = 0; i < firstChild.length; i++) {
      const secondChild = firstChild[i].firstElementChild;
      const thirdChild = secondChild.firstElementChild;
      const iTag = thirdChild.firstElementChild;

      if (iTag.classList.contains("fa-toggle-off")) {
         firstChild[i].style.display = "none";
      } else {
         firstChild[i].style.display = "flex";
      }
   }
}

const showCompletedBtn = document.getElementById("showCompleted-btn");
showCompletedBtn.addEventListener("click", showCompleted);

function showIncomplete() {
   const item = document.getElementById("todo-list");
   const firstChild = item.childNodes;

   for (i = 0; i < firstChild.length; i++) {
      const secondChild = firstChild[i].firstElementChild;
      const thirdChild = secondChild.firstElementChild;
      const iTag = thirdChild.firstElementChild;
      if (iTag.classList.contains("fa-toggle-on")) {
         firstChild[i].style.display = "none";
      } else {
         firstChild[i].style.display = "flex";
      }
   }
}

const ShowIncompleteBtn = document.getElementById("showIncomplete-btn");
ShowIncompleteBtn.addEventListener("click", showIncomplete);

function showAll() {
   const list = document.getElementById("todo-list").childNodes;

   for (i = 0; i < list.length; i++) {
      list[i].style.display = "flex";
   }
}

const showAllBtn = document.getElementById("showAll-btn");
showAllBtn.addEventListener("click", showAll);
