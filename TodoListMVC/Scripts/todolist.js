const InitialiseTodolistPage = () => {
    const addNewTodoField = document.querySelector("[data-field-action='add-new-todo']");

    addNewTodoField.addEventListener("keyup", event => {
        ValidateAndSubmitTodo(event);
    });

    const addSubtaskButtons = [...document.querySelectorAll("[data-button-action='add-subtask']")];
    console.log(addSubtaskButtons);
    addSubtaskButtons.forEach(button => {
        button.addEventListener("click", ({ target }) => {
            const todoId = target.closest('div.todolist-item').getAttribute('data-todo-id');
            ValidateAndSubmitSubtask(target, todoId);
        });
    });

    const todoEditName = [...document.querySelectorAll("[data-action='edit-todo']")];

    todoEditName.forEach(todoEdit => {
        todoEdit.addEventListener("click", ({ target }) => {
            const todoId = target.closest('div.todolist-item').getAttribute('data-todo-id');
            EditableTitle(target, todoId);
        });
    });

    const todoEditSubtaskName = [...document.querySelectorAll("[data-action='edit-todo-subtask']")];

    todoEditSubtaskName.forEach(todoSubtaskEdit => {
        todoSubtaskEdit.addEventListener("click", ({ target }) => {
            const todoId = target.closest('div.todolist-item').getAttribute('data-todo-id');
            EditableSubtask(target, todoId);
        });
    });

    const todoTitles = [...document.querySelectorAll('h2.todolist-item__title')];

    todoTitles.forEach(title => {
        title.addEventListener('focusout', ({ target: title }) => {
            const todoId = title.closest('div.todolist-item').getAttribute('data-todo-id');
            FocusOutTitle(title, todoId);
        });
    });

    const todoSubitles = [...document.querySelectorAll('p.todolist-item__label')];

    todoSubitles.forEach(title => {
        title.addEventListener('focusout', ({ target: title }) => {
            const todoId = title.closest('div.todolist-item').getAttribute('data-todo-id');
            FocusOutSubtask(title, todoId);
        });
    });

    const todoEditSubmit = [...document.querySelectorAll("[data-action='edit-todo-submit']")];

    todoEditSubmit.forEach(todoeditsubmit => {
        todoeditsubmit.addEventListener('click', ({ target }) => {
            SubmitTodoNameEdit(target.closest('div.todolist-item').getAttribute('data-todo-id'));
        });
    });
};

const EditableTitle = (target, todoId) => {
    const container = target.closest(`div[data-todo-id="${todoId}"]`);
    const title = container.querySelector('h2.todolist-item__title');
    const submit = container.querySelector('i[data-action="edit-todo-submit"]');
    const details = container.querySelector('details')
    target.hidden = true;
    submit.hidden = false;

    title.setAttribute("contenteditable", "true"); //make title editable
    details.style.pointerEvents = 'none'; //prevent details from being open whilst title has focus
    title.classList.add('edit-title');
    title.focus();
}

const EditableSubtask = (target, todoId, subtaskId) => {
    const container = target.closest(`div[data-todo-id="${todoId}"]`);
    const title = container.querySelector(`div[data-subtask-id="${subtaskId}"] > p.todolist-item__label`);
    const submit = container.querySelector(`div[data-subtask-id="${subtaskId}"] > i[data-action="edit-todo-subtask-submit"]`);
    target.hidden = true;
    submit.hidden = false;

    title.setAttribute("contenteditable", "true"); //make title editable
    title.classList.add('edit-title');
    title.focus();
}

//could refactor below two methods into one, possibly by
const FocusOutTitle = (title, todoId) => {
    const container = document.querySelector(`div[data-todo-id="${todoId}"]`);
    const edit = container.querySelector('i[data-action="edit-todo"]');
    const submit = container.querySelector('i[data-action="edit-todo-submit"]');

    title.setAttribute("contenteditable", false);
    title.closest('details').style.pointerEvents = 'auto';
    title.classList.remove('edit-title')

    edit.hidden = false;
    submit.hidden = true;
}

const FocusOutSubtask = (title, todoId, subtaskId) => {
    const container = document.querySelector(`div[data-todo-id="${todoId}"]`);
    const edit = container.querySelector(`div[data-subtask-id="${subtaskId}"] > i[data-action="edit-todo-subtask"]`);
    const submit = container.querySelector(`div[data-subtask-id="${subtaskId}"] > i[data-action="edit-todo-subtask-submit"]`);

    title.setAttribute("contenteditable", false);
    title.closest('details').style.pointerEvents = 'auto';
    title.classList.remove('edit-title')

    edit.hidden = false;
    submit.hidden = true;
}

const SubmitTodoNameEdit = (todoId) => {
    const container = document.querySelector(`div[data-todo-id="${todoId}"]`);
    const newTodoName = container.querySelector('h2.todolist-item__title').textContent;

    SubmitTodoEdit(newTodoName);
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

const ValidateAndSubmitSubtask = (target, todoId) => {
    const todoContainer = target.closest(`div[data-todo-id="${todoId}"]`);

    const value = todoContainer.querySelector('input.todolist-field').value;

    if (!value) {
        alert("Please enter a subtask name");
        return;
    }

    SubmitNewSubtask(todoId, value);
}

const SubmitNewTodo = (todoName) => {
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
            console.log(data);
            alert("Something went wrong, please try again.");
        }
    });
}

const SubmitNewSubtask = (todoId, subtaskName) => {

    $.ajax({
        type: "POST",
        url: `todolist/addnewsubtask/${todoId}`,
        data: {
            todoId: todoId,
            subtaskName: subtaskName
        },
        success: function (response) {
            if (response.success) {
                alert(response.subtaskName);
                alert(response.subtaskId);

                const subtask = buildNewSubtask(response.subtaskName, response.subtaskId);

                const currentSubtasks = [...document.querySelectorAll(`div[data-todo-id="${todoId}"] .todolist-item__subtask`)];
                const updatedSubtasks = [...currentSubtasks, subtask];

                //clear current tasks to add updated tasks
                currentSubtasks.forEach(subtask => {
                    subtask.remove();
                });

                const subtasksContainer = document.querySelector(`div[data-todo-id="${todoId}"] .todolist-item__subtasks`)
                const subtasksContainerFirstChild = subtasksContainer.firstChild;

                updatedSubtasks.forEach(subtask => {
                    subtasksContainer.insertBefore(subtask, subtasksContainerFirstChild)
                });
            }
        },
        error: function (data) {
            console.log(data);
            alert("Something went wrong, please try again.");
        }
    });
}

const SubmitTodoEdit = (todoName) => {
    //call to endpoint here
}

const buildNewSubtask = (subtaskName, subtaskId) => {
    const container = document.createElement('div');
    container.setAttribute('data-subtask-id', subtaskId);
    container.classList.add('todolist-item__subtask');

    const subtaskCheckbox = document.createElement('input');
    subtaskCheckbox.setAttribute("data-field-action", "add-new-subtask");
    subtaskCheckbox.setAttribute("type", "checkbox");
    subtaskCheckbox.classList.add('todolist-item__checkbox', 'm-0');
    container.appendChild(subtaskCheckbox);

    const subtaskNameParagraph = document.createElement('p');
    subtaskNameParagraph.classList.add('todolist-item__label', 'm-0', 'cursor-pointer');
    subtaskNameParagraph.textContent = subtaskName;
    subtaskNameParagraph.addEventListener('focusout', ({ target }) => {
        const todoId = target.closest('div.todolist-item').getAttribute('data-todo-id');
        FocusOutSubtask(target, todoId);
    });
    container.appendChild(subtaskNameParagraph);

    const editSubtaskName = document.createElement('i');
    editSubtaskName.setAttribute('data-action', 'edit-todo-subtask');
    editSubtaskName.classList.add('fa-solid', 'fa-pen', 'cursor-pointer', 'mr-auto');
    editSubtaskName.addEventListener('click', ({ target }) => {
        const todoId = target.closest('div.todolist-item').getAttribute('data-todo-id');
        EditableSubtask(target, todoId, subtaskId);
    });
    container.appendChild(editSubtaskName);

    const editSubtaskNameSubmit = document.createElement('i');
    editSubtaskNameSubmit.setAttribute('data-action', 'edit-todo-subtask-submit');
    editSubtaskNameSubmit.classList.add('fa-solid', 'fa-check');
    editSubtaskNameSubmit.hidden = 'true';
    container.appendChild(editSubtaskNameSubmit);

    return container;
}

const buildNewTodo = (todoName, todoId) => {
    //this is where a component re-render upon state change comes in handy :(
    const container = document.createElement('div');
    container.setAttribute('data-todo-id', todoId);
    container.classList.add('todolist-item');

    const detailsElement = document.createElement('details');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen', 'cursor-pointer', 'mr-auto');
    editIcon.setAttribute('data-action', 'edit-todo');
    editIcon.addEventListener("click", ({ target }) => {
        EditableTitle(target, container.getAttribute('data-todo-id'));
    });

    const editIconSubmit = document.createElement('i');
    editIconSubmit.hidden = true;
    editIconSubmit.classList.add('fa-solid', 'fa-check');
    editIconSubmit.setAttribute('data-action', 'edit-todo-submit');
    editIconSubmit.addEventListener("click", ({ target }) => {
        SubmitTodoNameEdit(container.getAttribute('data-todo-id'));
    });

    container.appendChild(detailsElement);
    container.appendChild(editIcon);
    container.appendChild(editIconSubmit);

    const summaryElement = document.createElement('summary');

    const todoListItemInfo = document.createElement('div');
    todoListItemInfo.classList.add('todolist-item__info');

    const title = document.createElement('h2');
    title.classList.add('todolist-item__title', 'm-0');
    title.textContent = todoName;
    title.addEventListener('focusout', ({ target: title }) => {
        FocusOutTitle(title, container.getAttribute('data-todo-id'));
    });

    todoListItemInfo.appendChild(title);

    summaryElement.appendChild(todoListItemInfo);

    const subtaskContainer = document.createElement('div');
    subtaskContainer.classList.add('todolist-item__subtasks');

    const newSubtask = document.createElement('div');
    newSubtask.classList.add('d-flex', 'flex-row', 'mt-3');

    const newSubtaskInputContainer = document.createElement('div');
    newSubtaskInputContainer.classList.add('todolist__form-label-group', 'mr-4');

    const subtaskInput = document.createElement('input');
    subtaskInput.classList.add('todolist-field');
    subtaskInput.setAttribute('type', 'text');
    subtaskInput.setAttribute('placeholder', ' ');

    const subtaskLabel = document.createElement('label');
    subtaskLabel.classList.add('todolist-label');
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
