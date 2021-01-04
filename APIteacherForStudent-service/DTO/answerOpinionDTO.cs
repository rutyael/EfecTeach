using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class answerOpinionDTO
    {
        public int id { get; set; }
        public int teacherId { get; set; }
        public string teacherName { get; set; }
        public int AnswerId { get; set; }
        public string scoring { get; set; }
        public string comment { get; set; }
        public string feedback { get; set; }
        public string teacherMail { get; set; }
    }
}
