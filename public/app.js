$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    //on enter call create todo function
    $("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    //on <li> clicked updateTode function
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    })
    //on X span click delete <li> and stop event bubbling to parents
    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });
});

function addTodos(todos){
    //add todos to page here
    todos.forEach(function(todo){
       addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $("<li class='task'>" +todo.name +"<span>X</span></li>");
    newTodo.data("id", todo._id);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo(){
    // send post request with user input to /api/todos
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
      todo.remove();
    })
    .catch(function(err){
      console.log(err);
    })
  }
  
function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}