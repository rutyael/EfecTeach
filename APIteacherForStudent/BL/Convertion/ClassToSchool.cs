using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Convertion
{
    public class ClassToSchool
    {
        public static UserToClassDTO ConvertToUserToClassDTO(UserToClass usertoclass)
        {
            UserToClassDTO usertoclassdto = new UserToClassDTO();
            usertoclassdto.id = usertoclass.id;
            usertoclassdto.idClass = usertoclass.idClass;
            usertoclassdto.idUser = usertoclass.idUser;
            return usertoclassdto;
        }
        public static UserToClass ConvertToUserToClass(UserToClassDTO usertoclassdto)
        {
            UserToClass usertoclass = new UserToClass();
            usertoclass.id = usertoclassdto.id;
            usertoclass.idClass = usertoclassdto.idClass;
            usertoclass.idUser = usertoclassdto.idUser;
            return usertoclass;
        }
    }
}
