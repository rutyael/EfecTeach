using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class GetSchoolToStudent
    {
        public int idSchool { get; set; }
        public string className { get; set; }
        public string SchoolName { get; set; }
        public SecretaryDTO secretary { get; set; }
        public List<UserDTO> users { get; set; }
        public List<UserDTO> teachers { get; set; }
        public GetSchoolToStudent()
        {
            users = new List<UserDTO>();
            teachers = new List<UserDTO>();
        }
    }
}
