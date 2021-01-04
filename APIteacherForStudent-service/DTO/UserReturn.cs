using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DTO
{
    public class UserReturn
    {
        public SecretaryDTO secretary { get; set; }
        public UserDTO user { get; set; }
        public bool ifISecretary { get; set; }
    }
}
