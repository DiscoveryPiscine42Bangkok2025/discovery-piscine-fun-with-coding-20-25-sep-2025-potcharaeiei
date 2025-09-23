window.onload = function () {
  loadTodos();
};

function newTodo() {
  const task = prompt("Enter a new TO DO:");
  if (task) {
    addTodo(task);
    saveTodos();
  }
}

function addTodo(text) {
  const div = document.createElement("div");
  div.className = "todo";
  div.innerText = text;

  div.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      div.remove();
      saveTodos();
    }
  };

  const list = document.getElementById("ft_list");
  list.insertBefore(div, list.firstChild); // ใส่ไว้ด้านบนสุด
}

function saveTodos() {
  const todos = [];
  const list = document.getElementById("ft_list").children;
  for (let item of list) {
    todos.push(item.innerText);
  }
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos));
}

function loadTodos() {
  const cookies = document.cookie.split("; ");
  let todoCookie = cookies.find(row => row.startsWith("todos="));
  if (todoCookie) {
    const value = decodeURIComponent(todoCookie.split("=")[1]);
    const todos = JSON.parse(value);
    for (let task of todos) {
      addTodo(task);
    }
  }
}
