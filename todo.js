const todoForm = document.querySelector(".js-toDoForm"),
  todoInput = form.querySelector("input"),
  toDoList = document.querySelector("js-toDoList");

const TODOS_LS = 'toDos';
const toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // stringify는 어떤 변수든 string 타입으로 바꿔준다. javascript는 로컬 저장시 string으로 변환하려는 성질이 있기 때문
}

function paintToDo(text) {
  const todoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  
  delBtn.value = "❌";
  span.innerText = text;
  todoLi.appendChild(span);
  todoLi.appendChild(delBtn);
  todoLi.id = newId;
  toDoList.appendChild(todoLi);

  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintToDo(currentValue);
  todoInput.value = ""; 
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadToDos);  // String으로 변환돼 저장된 Object들을 다시 Object로 전환해주는 JavaScript Object Notation
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);   // 오브젝트 내 todo-list를 불러와서 보여줌
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();