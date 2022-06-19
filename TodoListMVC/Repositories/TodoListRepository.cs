using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TodoListMVC.Models;

namespace TodoListMVC.Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        //Mock DB contexts
        public List<TodoItem> todoItems = new List<TodoItem>();

        public List<TodoItem> GetAllTodoItems()
        {
            List<TodoItemSubTask> subTasks = new List<TodoItemSubTask>();
            //TodoItemSubTask subTask1 = new TodoItemSubTask();
            //subTasks.Add()
            TodoItem todo1 = new TodoItem("Dishes", Guid.NewGuid().ToString());
            todoItems.Add(todo1);

            return todoItems;
        }
    }
}