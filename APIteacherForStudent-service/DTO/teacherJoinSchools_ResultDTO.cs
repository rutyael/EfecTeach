using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class teacherJoinSchools_ResultDTO
    {
        public int idSchool { get; set; }
        public string SchoolName { get; set; }
        public int idClass { get; set; }
        public string className { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserMail { get; set; }
        public float EducationalLevel { get; set; }
    }
}
