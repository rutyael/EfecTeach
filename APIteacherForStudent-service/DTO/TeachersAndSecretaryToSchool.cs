using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class TeachersAndSecretaryToSchool
    {
        public List<UserDTO> teachers { get; set; }
        public SecretaryDTO secretary { get; set; }
        public TeachersAndSecretaryToSchool()
        {
            teachers = new List<UserDTO>();
        }
        public int idSchool { get; set; }
        public string SchoolName { get; set; }
        public string cityName { get; set; }

    }
}
