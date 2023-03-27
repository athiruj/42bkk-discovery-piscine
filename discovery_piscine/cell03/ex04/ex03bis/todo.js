const lists = $("#ft_list");
const btn_n = $("#btn_n");
const todos = new Map();


function addTodo(map, element) {
  const value = prompt("Please enter new todo");
  if (!value) {
    console.log("value is null");
    return;
  }
    map.set("id" + map.size, value);
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
  // console.log(data)
  if (!data || data.length == 0) {
    return console.log("data is empty");
  }
  const newMap = new Map(Object.entries(JSON.parse(data)));
  newMap.forEach((value,key) => {
    todos.set(key,value)
  })
  loadTodo(map, element);
  
}

function createTodo(map, element, id, value) {
  const item = $("<li></li>");
  item.attr("id", id);
  item.html(value);
  item.click((data) => removeTodo(map, element, data.target.id));
  return item;
}


getTodo(todos, lists)


btn_n.click(() => addTodo(todos, lists));
