using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ClassToSchoolDTO
    {
        public int id { get; set; }
        public int idSchool { get; set; }
        public string className { get; set; }
        public string comment { get; set; }
        public string SchoolName { get; set; }
        public List<ProffestionsDTO> Proffestions { get; set; }
        public ClassToSchoolDTO()
        {
            this.Proffestions = new List<ProffestionsDTO>();
        }
    }
}

