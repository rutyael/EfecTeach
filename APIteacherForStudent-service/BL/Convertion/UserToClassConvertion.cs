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
        public static UserToClassDTO ConvertToUserToClassDTO(UserToClass usertoclass)
        {
            UserToClassDTO usertoclassdto = new UserToClassDTO();
            usertoclassdto.id = usertoclass.id;
            usertoclassdto.idClass = usertoclass.idClass;
            usertoclassdto.idUser = usertoclass.idUser;
            usertoclassdto.approved = usertoclass.approved;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                ClassToSchool cs = db.ClassToSchools.ToList().FirstOrDefault(c => c.id == usertoclass.idClass);
                usertoclassdto.className = cs.className;
            }
            return usertoclassdto;
        }
        public static UserToClass ConvertToUserToClass(UserToClassDTO usertoclassdto)
        {
            UserToClass usertoclass = new UserToClass();
            usertoclass.id = usertoclassdto.id;
            usertoclass.idClass = usertoclassdto.idClass;
            usertoclass.idUser = usertoclassdto.idUser;
            usertoclass.approved = usertoclassdto.approved;
            usertoclass.LastDateOfStatusChange = usertoclassdto.LastDateOfStatusChange;
            usertoclass.factor = usertoclassdto.factor;
            return usertoclass;
        }
        public static UserJoinClassToSetDTO ConvertToTeacherJoinClassDTO(GetTeachersJoinClassesToSet_Result t_j_c_r)
        {
            UserJoinClassToSetDTO u_j_c = new UserJoinClassToSetDTO();
            u_j_c.user.UserId = t_j_c_r.UserId;
            u_j_c.user.UserMail = t_j_c_r.UserMail;
            u_j_c.user.UserName = t_j_c_r.UserName;
            u_j_c.UserClass.className = t_j_c_r.className;
            u_j_c.UserClass.approved = t_j_c_r.approved;
            u_j_c.UserClass.idClass = t_j_c_r.idClass;
            u_j_c.UserClass.LastDateOfStatusChange = t_j_c_r.LastDateOfStatusChange;
            return u_j_c;
        }
        public static UserJoinClassToSetDTO ConvertToStudentToClassDTO(GetStudentsJoinClassToSet_Result s_j_c_r)
        {
            UserJoinClassToSetDTO u_j_c = new UserJoinClassToSetDTO();
            u_j_c.user.UserId = s_j_c_r.UserId;
            u_j_c.user.UserMail = s_j_c_r.UserMail;
            u_j_c.user.UserName = s_j_c_r.UserName;
            u_j_c.UserClass.className = s_j_c_r.className;
            u_j_c.UserClass.approved = s_j_c_r.approved;
            u_j_c.UserClass.idClass = s_j_c_r.idClass;
            u_j_c.UserClass.LastDateOfStatusChange = s_j_c_r.LastDateOfStatusChange;
            return u_j_c;
        }
    }
}
