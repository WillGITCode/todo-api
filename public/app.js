$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(function(data){
        console.log(data);
    })
});

function addTodos(todos){
    //add todos to page here
    todos.forEach(function(todo){
        var newTodo = $("<li class='task'>" + todo.name + "</li>");
        $(".list").append(newTodo);
    });
}