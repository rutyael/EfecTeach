using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ApdateSchoolDTO
    {
        public int id { get; set; }
        public string SchoolName { get; set; }
        public int IdCity { get; set; }
        public int idSchool { get; set; }
        public string comment { get; set; }
        public int IdSecretary { get; set; }
        public List<ClassToSchoolDTO> ClassesToAdd { get; set; }
        public List<ClassToSchoolDTO> ClassesToApdate { get; set; }
        public ApdateSchoolDTO()
        {
            ClassesToAdd = new List<ClassToSchoolDTO>();
            ClassesToApdate = new List<ClassToSchoolDTO>();
        }
    }
}
