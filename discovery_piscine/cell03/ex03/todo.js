const lists = document.getElementById("ft_list");
const btn_n = document.getElementById("btn_n");
let todos = new Map();

function addTodo(map, element) {
  const value = prompt("Please enter new todo");
  if (!value) {
    console.log("value is null");
    return;
  }
  map.set("id" + map.size.toString(), value);
  saveTodo(map);
  loadTodo(map, element);
}

function removeTodo(map, element, value) {
  console.log(value);
  map.delete(value);
  saveTodo(map);
  loadTodo(map, element);
}

function saveTodo(map) {
  const json = JSON.stringify(Object.fromEntries(map));
  document.cookie = `${json}`;
}

function loadTodo(map, element) {
  const item = [];
  map.forEach((value, key) => {
    item.push(createTodo(map, element, key, value));
  });
  element.replaceChildren(...item);
}

function getTodo(map, element) {
  const data = document.cookie;
  if (!data) {
    return;
  }
  map = new Map(Object.entries(JSON.parse(data)));
  loadTodo(map, element);

  return map;
}

function createTodo(map, element, id, value) {
  const item = document.createElement("li");
  item.id = id;
  item.innerHTML = value;
  item.addEventListener("click", (data) =>
    removeTodo(map, element, data.target.id)
  );
  return item;
}

todos = getTodo(todos, lists);

btn_n.addEventListener("click", () => addTodo(todos, lists));
