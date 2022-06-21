const InitialiseTodolistPage = () => {
    const addNewTodoField = document.querySelector("[data-field-action='add-new-todo']");

    addNewTodoField.addEventListener("keyup", event => {
        ValidateAndSubmitTodo(event);
    });

    const todoEditName = [...document.querySelectorAll("[data-action='edit-todo']")];

    todoEditName.forEach(todoEdit => {
        todoEdit.addEventListener("click", ({ target }) => {
            EditableTitle(target);
        });
    });

    const todoEditSubtaskName = [...document.querySelectorAll("[data-action='edit-todo-subtask']")];

    todoEditSubtaskName.forEach(todoSubtaskEdit => {
        todoSubtaskEdit.addEventListener("click", ({ target }) => {
            EditableSubtask(target);
        });
    });

    const todoTitles = [...document.querySelectorAll('h2.todolist-item__title')];

    todoTitles.forEach(title => {
        title.addEventListener('focusout', ({ target: title }) => {
            FocusOutTitle(title);
        });
    });

    const todoSubitles = [...document.querySelectorAll('p.todolist-item__label')];

    todoSubitles.forEach(title => {
        title.addEventListener('focusout', ({ target: title }) => {
            FocusOutSubtitle(title);
        });
    });

    const todoEditSubmit = [...document.querySelectorAll("[data-action='edit-todo-submit']")];

    todoEditSubmit.forEach(todoeditsubmit => {
        todoeditsubmit.addEventListener('click', event => {
            const newTodoName = document.querySelector('h2.todolist-item__title').textContent;

            SubmitTodoEdit(newTodoName);
        });
    });

    const addNewSubtaskFields = [...document.querySelectorAll("[data-field-action='add-new-subtask']")]
};

const EditableTitle = (target) => {
    const title = document.querySelector('h2.todolist-item__title');
    const submit = document.querySelector('i[data-action="edit-todo-submit"]');
    const details = document.querySelector('details')
    target.hidden = true;
    submit.hidden = false;

    title.setAttribute("contenteditable", "true"); //make title editable
    details.style.pointerEvents = 'none'; //prevent details from being open whilst title has focus
    title.classList.add('edit-title');
    title.focus();
}

const EditableSubtask = (target) => {
    const title = document.querySelector('p.todolist-item__label');
    const submit = document.querySelector('i[data-action="edit-todo-subtask-submit"]');
    target.hidden = true;
    submit.hidden = false;

    title.setAttribute("contenteditable", "true"); //make title editable
    title.classList.add('edit-title');
    title.focus();
}

const FocusOutTitle = (title) => {
    const edit = document.querySelector('i[data-action="edit-todo"]');
    const submit = document.querySelector('i[data-action="edit-todo-submit"]');

    title.setAttribute("contenteditable", false);
    title.closest('details').style.pointerEvents = 'auto';
    title.classList.remove('edit-title')

    edit.hidden = false;
    submit.hidden = true;
}

const FocusOutSubtitle = (title) => {
    const edit = document.querySelector('i[data-action="edit-todo-subtask"]');
    const submit = document.querySelector('i[data-action="edit-todo-subtask-submit"]');

    title.setAttribute("contenteditable", false);
    title.closest('details').style.pointerEvents = 'auto';
    title.classList.remove('edit-title')

    edit.hidden = false;
    submit.hidden = true;
}

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
            if (response.success) {
                const newTodoMarkup = buildNewTodo(response.todoName, response.itemId)
                const todolistContainer = document.querySelector('.todolist-items');

                todolistContainer.appendChild(newTodoMarkup);
            }
        },
        error: function (data) {
            alert("Something went wrong, please try again.");
        }
    });
}

const SubmitTodoEdit = (todoName) => {
    //call to endpoint here
}

const buildNewTodo = (todoName, todoId) => {
    //TODO: add edit title and subtask event handlers here
    //this is where a component re-render upon state change comes in handy :(
    const container = document.createElement('div');
    container.setAttribute('data-todo-id', todoId);
    container.classList.add('todolist-item');

    const editIcon = document.createElement('i');

    const detailsElement = document.createElement('details');
    container.appendChild(detailsElement);

    const summaryElement = document.createElement('summary');

    const todoListItemInfo = document.createElement('div');
    todoListItemInfo.classList.add('todolist-item__info');

    const title = document.createElement('h2');
    title.classList.add('todolist-item__title', 'm-0');
    title.textContent = todoName;

    todoListItemInfo.appendChild(title);

    summaryElement.appendChild(todoListItemInfo);

    const subtaskContainer = document.createElement('div');
    subtaskContainer.classList.add('todolist-item__subtasks');

    const newSubtask = document.createElement('div');
    newSubtask.classList.add('d-flex', 'flex-row', 'mt-3');

    const newSubtaskInputContainer = document.createElement('div');
    newSubtaskInputContainer.classList.add('todolist__form-label-group', 'mr-4');

    const subtaskInput = document.createElement('input');
    subtaskInput.classList.add('todolist_field');
    subtaskInput.setAttribute('type', 'text');
    subtaskInput.setAttribute('placeholder', ' ');

    const subtaskLabel = document.createElement('label');
    subtaskLabel.classList.add('todolist_label');
    subtaskLabel.textContent = 'Add subtask';

    newSubtaskInputContainer.appendChild(subtaskInput);
    newSubtaskInputContainer.appendChild(subtaskLabel);

    const submitSubtask = document.createElement('button');
    submitSubtask.classList.add('todolist_add-button');
    submitSubtask.textContent = "Add";
    //submitSubtask.addEventListener()

    newSubtask.appendChild(newSubtaskInputContainer);
    newSubtask.appendChild(submitSubtask);

    subtaskContainer.appendChild(newSubtask);

    detailsElement.appendChild(summaryElement);
    detailsElement.appendChild(subtaskContainer);

    return container;
}
