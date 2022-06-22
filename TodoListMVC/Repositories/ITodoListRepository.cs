using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoListMVC.Models;

namespace TodoListMVC.Repositories
{
    interface ITodoListRepository
    {
        List<TodoItem> GetAllTodoItems();
        TodoItem AddNewTodo(TodoItem todoItem);
        TodoItemSubTask AddNewSubtask(TodoItemSubTask subtask);
    }
}
