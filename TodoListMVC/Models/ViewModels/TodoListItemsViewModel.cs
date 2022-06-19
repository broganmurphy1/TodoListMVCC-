using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoListMVC.Models.ViewModels
{
    public class TodoListItemsViewModel
    {
        public List<TodoItem> Todos { get; set; }
    }
}