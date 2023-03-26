const lists = $("#ft_list");
const btn_n = $("#btn_n");
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
  map.delete(value);
  saveTodo(map);
  loadTodo(map, element);
}

function saveTodo(map) {
  const json = JSON.stringify(Object.fromEntries(map));
  $.cookie("", json);
}

function loadTodo(map, element) {
  const item = [];
  map.forEach((value, key) => {
    item.push(createTodo(map, element, key, value));
  });
  element.empty().append(...item);
}

function getTodo(map, element) {
  const data = Object.keys($.cookie(""));
  if (!data || data == "[object Object]") {
    return;
  }
  map = new Map(Object.entries(JSON.parse(data)));
  loadTodo(map, element);
  return map;
}

function createTodo(map, element, id, value) {
  const item = $("<li></li>");
  item.attr("id", id);
  item.html(value);
  item.click((data) => removeTodo(map, element, data.target.id));
  return item;
}

todos = getTodo(todos, lists);

btn_n.click(() => addTodo(todos, lists));
