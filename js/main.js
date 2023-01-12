const elForm = document.querySelector(".js-form")
const elInput = document.querySelector(".js-input")
const elBtn = document.querySelector(".js-btn")
const elList = document.querySelector(".js-list")
const localData = localStorage.getItem("token")
if (!localData) {
    location.replace("login.html")
}

const elLogButton = document.querySelector(".js-log-btn")
elLogButton.addEventListener("click", function () {
    localStorage.removeItem("token");
    location.reload()
})

const renderTodo = (Array, node) => {
    node.innerHTML = ""
    Array.forEach((todo) => {
        node.innerHTML += `
        <li class="list-group-item border border-2 shadow p-3 mb-2">
        <span class="sapan-title d-block text-light"> ${todo.todo_value}</span>
        <button data-todo-id=${todo.id} class="btn btn-warning mt-2 js-edit">EDIT</button>
        <button data-todo-id=${todo.id} class="btn btn-danger mt-2 js-delete ">DELETE</button>
      </li>`
    });
    elInput.value = ""
}


async function Todos() {
    const res = await fetch("http://192.168.0.103:5000/todo", {
        headers: {
            Authorization: localData,
        }
    });
    const data = await res.json();
    renderTodo(data, elList)
}
Todos();
elForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    fetch("http://192.168.0.103:5000/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localData,
        },
        body: JSON.stringify({
            text: elInput.value
        })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                Todos();
            }
        }

        )
        .catch((err) => console.log(err))
})
//////////////// DELETE TODOS//////////////////
const deleteTodos = (id) => {
    fetch(`http://192.168.0.103:5000/todo/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: localData,
            }
        }).then((res) => res.json())
        .then((data) => {
            if (data) {
                Todos()
            }
        })
        .catch((err) => console.log(err))
}

elList.addEventListener("click", function (evt) {

    if (evt.target.matches(".js-delete")) {
        const todoId = evt.target.dataset.todoId
        deleteTodos(todoId)
    };
    if(evt.target.matches(".js-edit")){
        const todoId = evt.target.dataset.todoId;
        editTodos(todoId)
    }
})

const editTodos=(id)=>{
    const editPrompt=prompt("Todo kiriting")
    if(editPrompt==null){
        alert("Todoni uzgartirmadingiz")
        editPrompt()
    }
    fetch(`http://192.168.0.103:5000/todo/${id}`,
    {
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: localData,
        },
        body:JSON.stringify({
            text:`${editPrompt}`
        })
    })
    .then((res) => res.json())
        .then((data) => {
            if (data) {
                Todos()
            }
        })
        .catch((err) => console.log(err))

}








