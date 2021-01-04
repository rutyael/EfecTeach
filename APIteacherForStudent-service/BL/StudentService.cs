using DTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class StudentService
    {
        /// <summary>
        /// get studens classes to set approved
        /// </summary>
        /// <param name="SchoolId"></param>
        /// <returns></returns>
        public static List<UserJoinClassToSetDTO> GetStudentsJoinClassesToSet(int SchoolId)
        {
            List<UserJoinClassToSetDTO> s_j_c = new List<UserJoinClassToSetDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.GetStudentsJoinClassToSet(SchoolId).ToList().ForEach(c =>
                {
                    s_j_c.Add(Convertion.UserToClassConvertion.ConvertToStudentToClassDTO(c));
                });
            }
            return s_j_c;
        }

        /// <summary>
        /// set approveds for students classes
        /// </summary>
        /// <param name="TeacherId"></param>
        /// <param name="classes"></param>
        /// <param name="mess"></param>
        public static bool PutClassesToStudent(List<UserToClassDTO> classes)
        {
            if (classes.Count == 0)
            {
                return true;
            }
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                try
                {
                     classes.ToList().ForEach(c =>
                     {
                         UserToClass u = db.UserToClasses.FirstOrDefault(cf => cf.idClass == c.idClass && cf.idUser == c.idUser);
                         u.approved = 2;
                         u.factor = "s";
                         u.LastDateOfStatusChange = DateTime.Now;
                     });
                     db.SaveChanges();
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
