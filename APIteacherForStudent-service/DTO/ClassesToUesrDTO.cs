using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ClassesToUesrDTO
    {
        public int UserId { get; set; }
        public List<UserToClassDTO> Classes { get; set; }
        public ClassesToUesrDTO()
        {
            Classes = new List<UserToClassDTO>();
        }
    }
}
