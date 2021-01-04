using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ClassesJoinUserDTO
    {
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string SchoolComment { get; set; }
        public string ClassComment { get; set; }
        public int approved { get; set; }
        public string factor { get; set; }
        public Nullable<System.DateTime> LastDateOfStatusChange { get; set; }
    }
}
