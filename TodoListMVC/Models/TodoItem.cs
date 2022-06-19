using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoListMVC.Models
{
    public class TodoItem : Item
    {
        public List<TodoItemSubTask> Subtasks { get; set; }
        public TodoItem(string itemName, string itemId)
        {
            ItemId = itemId;
            ItemName = itemName;
        }
    }
}