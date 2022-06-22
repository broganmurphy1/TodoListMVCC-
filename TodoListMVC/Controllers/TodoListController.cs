using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TodoListMVC.Models;
using TodoListMVC.Models.ViewModels;
using TodoListMVC.Repositories;
using Newtonsoft.Json;

namespace TodoListMVC.Controllers
{
    public class TodoListController : Controller
    {
        private ITodoListRepository _todoListRepository = new TodoListRepository();

        public ActionResult Index()
        {
            List<TodoItem> todos = _todoListRepository.GetAllTodoItems();

            return View(new TodoListItemsViewModel { 
                Todos = todos
            });
        }

        [HttpPost]
        public ActionResult AddNewTodo()
        {
            string todoName = Request["todoName"]; //would need some sort of mechanism/validation here against vulnerabilities

            TodoItem newTodo = new TodoItem(todoName, Guid.NewGuid().ToString());

            TodoItem addedTodo = _todoListRepository.AddNewTodo(newTodo);
            if (addedTodo == null)
            {
                return Json(new { success = false });
            }

            return Json(new { success = true, todoName = addedTodo.ItemName, itemId = addedTodo.ItemId });
        }

        [HttpPost]
        public ActionResult AddNewSubtask(string todoId)
        {
            string subtaskName = Request["subtaskName"]; //would need some sort of mechanism/validation here against vulnerabilities

            TodoItemSubTask newSubtask = new TodoItemSubTask(Guid.NewGuid().ToString(), todoId, subtaskName);

            var addedSubtask = _todoListRepository.AddNewSubtask(newSubtask);
            if (addedSubtask == null)
            {
                return Json(new { success = false });
            }

            return Json(new { success = true, subtaskName = addedSubtask.SubTaskName, subtaskId = addedSubtask.SubTaskId });
        }
    }
}