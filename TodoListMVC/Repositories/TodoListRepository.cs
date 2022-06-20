using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TodoListMVC.Models;

namespace TodoListMVC.Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        //Mock DB context
        //synchonous calls for now, some may need to be asynchronous
        public List<TodoItem> todoItems = new List<TodoItem>();

        public List<TodoItem> GetAllTodoItems()
        {
            seedList();
            return todoItems;
        }

        private void seedList()
        {
            List<TodoItemSubTask> subTasks = new List<TodoItemSubTask>();

            TodoItem todo1 = new TodoItem("Dishes", Guid.NewGuid().ToString());
            TodoItem todo2 = new TodoItem("Make dinner", Guid.NewGuid().ToString());
            TodoItem todo3 = new TodoItem("Pack bag", Guid.NewGuid().ToString());

            TodoItemSubTask subTask1 = new TodoItemSubTask(Guid.NewGuid().ToString(), todo1.ItemId, "Get soap");
            TodoItemSubTask subTask2 = new TodoItemSubTask(Guid.NewGuid().ToString(), todo2.ItemId, "Put ingredients in oven");
            TodoItemSubTask subTask3 = new TodoItemSubTask(Guid.NewGuid().ToString(), todo3.ItemId, "Get laptop");

            subTasks.Add(subTask1);
            subTasks.Add(subTask2);
            subTasks.Add(subTask3);

            todo1.Subtasks = subTasks.Where(subtask => subtask.ItemId == todo1.ItemId).ToList();
            todo2.Subtasks = subTasks.Where(subtask => subtask.ItemId == todo2.ItemId).ToList();
            todo3.Subtasks = subTasks.Where(subtask => subtask.ItemId == todo3.ItemId).ToList();

            todoItems.Add(todo1);
            todoItems.Add(todo2);
            todoItems.Add(todo3);
        }
    }
}