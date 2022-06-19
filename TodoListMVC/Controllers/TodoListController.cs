using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TodoListMVC.Models;
using TodoListMVC.Models.ViewModels;
using TodoListMVC.Repositories;

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
    }
}