using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoListMVC.Models
{
    public class TodoItemSubTask : Item
    {
        public TodoItemSubTask(string subTaskId, string itemId, string subTaskName)
        {
            SubTaskId = subTaskId;
            ItemId = itemId;
            SubTaskName = subTaskName;
        }
        public string SubTaskId { get; set; }
        public string SubTaskName { get; set; }
    }
}