using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AnswerAndClassesToTeacher
    {
        public List<FullUserAnswer> answers { get; set; }
        public List<ClassToSchoolDTO> classes { get; set; }
        public AnswerAndClassesToTeacher()
        {
            answers = new List<FullUserAnswer>();
            classes = new List<ClassToSchoolDTO>();
        }
    }
}
