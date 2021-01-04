using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserClass
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserMail { get; set; }
        public string UserKind { get; set; }
        public int Active { get; set; }
        public int idClass { get; set; }
        public int idSchool { get; set; }
        public string className { get; set; }
    }
}
