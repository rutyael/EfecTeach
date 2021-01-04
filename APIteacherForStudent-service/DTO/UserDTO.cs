using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserMail { get; set; }
        public string UserKind { get; set; }
        public int Active { get; set; }
        public Nullable<System.DateTime> LastEnteryDate { get; set; }
        public Nullable<System.DateTime> LoginDate { get; set; }
        public bool NewData { get; set; }
    }
}
