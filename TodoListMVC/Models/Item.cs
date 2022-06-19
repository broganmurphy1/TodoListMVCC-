using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoListMVC.Models
{
    public class Item
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public bool IsComplete { get; set; }
        public DateTime dateCreated { get; set; }
    }
}