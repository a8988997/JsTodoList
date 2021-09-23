let addButton = document.querySelector("form button");
let section = document.querySelector("section");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target.parentElement);
  let form = e.target.parentElement;
  //   console.log(form.children);

  // get the input value
  let todoM = form.children[0].value;
  let todoD = form.children[2].value;
  let todoText = form.children[3].value;

  if (todoText === "") {
    alert("輸入欄請勿空白");
    return; //加入return下面程式都不會被執行
  }

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let date = document.createElement("p");
  date.classList.add("todo-date");
  date.innerText = todoM + " / " + todoD;
  todo.appendChild(date);
  todo.appendChild(text);

  //    create check, trash icon
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.addEventListener("click", (e) => {
    // console.log(e.target.parentElement)
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });
  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = "<i class='far fa-trash-alt'></i>";

  trashButton.addEventListener("click", (e) => {
    // console.log(e.target.parentElement);
    let deleteItem = e.target.parentElement;
    deleteItem.style.animation = "scaleDown 0.3s forwards";
    deleteItem.addEventListener("animationend", () => {
      //   remove from localStorage
      let text = todoItem.children[2].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      deleteItem.remove();
    });
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.3s forwards";

  //   create on object
  let myTodo = {
    todoM: todoM,
    todoD: todoD,
    todoText: todoText,
  };

  //   store data into array of object
  let myList = localStorage.getItem("list");
  if (myList == null) {
    // 如果myList是null直接建立array(要轉string)
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    // 如果myList存在的話,先將myList轉回物件,加入新資料,在將資料轉回string存入item
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  form.children[0].value = "";
  form.children[2].value = "";
  form.children[3].value = "";
  section.appendChild(todo);
});

let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    //create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText;
    let date = document.createElement("p");
    date.classList.add("todo-date");
    date.innerText = item.todoM + " / " + item.todoD;
    todo.appendChild(date);
    todo.appendChild(text);

    // create check, trash icon
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.addEventListener("click", (e) => {
      console.log(e.target.parentElement);
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done");
    });
    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = "<i class='far fa-trash-alt'></i>";

    trashButton.addEventListener("click", (e) => {
      // console.log(e.target.parentElement);
      let deleteItem = e.target.parentElement;
      deleteItem.style.animation = "scaleDown 0.3s forwards";
      deleteItem.addEventListener("animationend", () => {
        //   remove from localStorage
        let text = deleteItem.children[1].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        deleteItem.remove();
      });
    });
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);
    section.appendChild(todo);
  });
}
