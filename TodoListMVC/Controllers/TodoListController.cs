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
    }
}