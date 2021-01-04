using DTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class TeacherService
    {
        /// <summary>
        /// get teachers classes to set approved
        /// </summary>
        /// <param name="SchoolId"></param>
        /// <returns></returns>
        public static List<UserJoinClassToSetDTO> GetTeachersJoinClassesToSet(int SchoolId)
        {
            List<UserJoinClassToSetDTO> u_j_c = new List<UserJoinClassToSetDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.GetTeachersJoinClassesToSet(SchoolId).ToList().ForEach(c =>
                {
                    u_j_c.Add(Convertion.UserToClassConvertion.ConvertToTeacherJoinClassDTO(c));
                });
            }
            return u_j_c;
        }
        /// <summary>
        /// set approveds for teachers classes
        /// </summary>
        /// <param name="TeacherId"></param>
        /// <param name="classes"></param>
        /// <param name="mess"></param>
        public static bool PutClassesToTeacher(List<UserToClassDTO> classes)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                try
                {
                    classes.ForEach(c =>
                    {
                        switch (c.approved)
                        {
                            case 2:
                                {
                                    var u_c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                                    u_c.approved = 2;
                                    u_c.factor = "s";
                                    u_c.LastDateOfStatusChange = DateTime.Now;
                                    break;
                                }
                            case 4:
                                {
                                    var u_c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                                    u_c.approved = 4;
                                    u_c.factor = "s";
                                    u_c.LastDateOfStatusChange = DateTime.Now;
                                    break;
                                }
                        }
                        db.SaveChanges();
                    });
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }

            }

        }
    }
}
