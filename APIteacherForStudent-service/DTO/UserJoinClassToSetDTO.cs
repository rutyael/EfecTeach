using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserJoinClassToSetDTO
    {
        public UserDTO user { get; set; }
        public UserToClassDTO UserClass { get; set; }
        public UserJoinClassToSetDTO()
        {
            user = new UserDTO();
            UserClass = new UserToClassDTO();
        }
    }
}
