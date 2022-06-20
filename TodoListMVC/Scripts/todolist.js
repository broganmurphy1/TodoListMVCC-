const InitialiseTodolistPage = () => {
    const addNewTodoField = document.querySelector("[data-field-action='add-new-todo']");

    addNewTodoField.addEventListener("keyup", event => {
        ValidateAndSubmitTodo(event);
    });

    const addNewSubtaskFields = [...document.querySelectorAll("[data-field-action='add-new-subtask']")]

    console.log(addNewTodoField, addNewSubtaskFields)
};

const ValidateAndSubmitTodo = (event) => {
    if (event.key === "Enter") {
        const value = event.target.value
        if (!value) {
            alert("Please enter a todo");
            return;
        }

        SubmitNewTodo(value);
    }
}

const SubmitNewTodo = async (todoName) => {
    //api calls should be extracted into reusable service
    $.ajax({
        type: "POST",
        url: "todolist/addnewtodo",
        data: { todoName: todoName },
        success: function (response) {
            alert(response.success);
            $("#result").empty().append(response);
        }
    });
}
