using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserToClassDTO
    {

        public int id { get; set; }
        public int idUser { get; set; }
        public int idClass { get; set; }
        public int approved { get; set; }
        public string className { get; set; }
        public List<TeacherToClassProffestionDTO> TCProffestions { get; set; }
        public DateTime LastDateOfStatusChange { get; set; }
        public string factor { get; set; }
    }
}
