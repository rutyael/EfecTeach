using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Convertion
{
    public class UserToClassConvertion
    {
        public static UserToClass ConvertToUserToClass(UserToClassDTO_ usertoclassdto)
        {
            UserToClass newusertoclass = new UserToClass();
            newusertoclass.ClassName = usertoclassdto.ClassName;
            newusertoclass.UserId = usertoclassdto.UserId;
            newusertoclass.school = usertoclassdto.school;
            return newusertoclass;
        }
    }
}
