using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SchoolsDTO
    {
        public int id { get; set; }
        public string SchoolName { get; set; }
        public int idCity { get; set; }
        public int idSchool { get; set; }
        public string comment { get; set; }
    }
}
