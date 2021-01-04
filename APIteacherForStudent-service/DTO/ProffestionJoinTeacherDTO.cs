using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProffestionJoinTeacherDTO
    {
        public string TeacherName { get; set; }
        public int TeacherId { get; set; }
        public int ProffestionId { get; set; }
        public string ProffestionName { get; set; }
        public string Checked { get; set; }

    }
}
