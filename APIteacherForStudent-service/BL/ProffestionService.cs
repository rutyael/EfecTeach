using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;
using System.Data.SqlClient;

namespace BL
{
    public class ProffestionService
    {
        ///get all proffestions
        public static List<ProffestionsDTO> GetAllProffestion()
        {
            List<ProffestionsDTO> proffestions = new List<ProffestionsDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {

                db.Proffestions.ToList().ForEach(pro =>
                proffestions.Add(Convertion.ProffestionConvertion.ConvertToProffestionDTO(pro)));
            }
            return proffestions;
        }
        ///get proffestion by id
        public static ProffestionsDTO GetProffestion(int id)
        {
            Proffestion pro = new Proffestion();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                pro = db.Proffestions.ToList().FirstOrDefault(p => p.ProffestionId == id);
            }
            return Convertion.ProffestionConvertion.ConvertToProffestionDTO(pro);
        }
        ///put proffestions to teacher
        public static void PutProffestionToTeacher(List<ProffestionJoinTeacherDTO> proffestions, ref string mess)
        {
            if (proffestions.Count <= 0)
            {
                mess = "any proffestion to update";
                return;
            }
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                ProffestionJoinTeacherDTO fp_ = proffestions.ElementAt(0);
                User teacher = db.Users.FirstOrDefault(u => u.UserId == fp_.TeacherId);
                proffestions.ToList().ForEach(p =>
                {

                    if (p.Checked == "R")
                        db.RemoveProffestionToTeacher(p.ProffestionId, p.TeacherId);
                    if (p.Checked == "A")
                        db.AddProffestionToTeacher(p.ProffestionId, p.TeacherId);
                });
                db.SaveChanges();
            }
        }

        //add proffestion
        public static ProffestionsDTO AddProffestion(ProffestionsDTO lang)
        {
            Proffestion new_p = null;
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                if (db.Proffestions.Any(p => p.ProffestionName == lang.ProffestionName))
                    return null;

                new_p = db.Proffestions.Add(new Proffestion() { ProffestionId = 0, ProffestionName = lang.ProffestionName });
                db.SaveChanges();
                }
            }
            catch
            {
                return null;
            }
            return Convertion.ProffestionConvertion.ConvertToProffestionDTO(new_p);
        }

        //put teacher to class proffestion
        public static void PutTeacherToClassProffestions(List<TeacherToClassProffestionDTO> profs, int tc)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                if (profs == null)
                    return;
                profs.ForEach(p =>
                {
                    if (p.approved == -1)
                        db.Database.ExecuteSqlCommand("Delete from TeacherClassProffestion where UserToClassId=@tcid and ProffestioId=@pid", new SqlParameter("@tcid", tc), new SqlParameter("@pid", p.proffestion.ProffestionId));
                    if (p.approved == 2)
                        db.Database.ExecuteSqlCommand("Insert into TeacherClassProffestion Values({0},{1})", p.proffestion.ProffestionId, tc);
                });
                db.SaveChanges();
            }

        }

        //get teacher to class proffestion
        public static List<TeacherToClassProffestionDTO> GetTeacherToClassProffestions(int classId, int teacherId)
        {
            List<TeacherToClassProffestionDTO> profs = new List<TeacherToClassProffestionDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                var class_ = db.ClassToSchools.FirstOrDefault(c => c.id == classId);
                var user_to_class_ = db.UserToClasses.FirstOrDefault(c => c.idClass == classId && c.idUser == teacherId);
                profs = class_.Proffestions.Select(p =>
                {
                    return (
                   new TeacherToClassProffestionDTO
                   {
                       proffestion = Convertion.ProffestionConvertion.ConvertToProffestionDTO(p),
                       approved = (user_to_class_ == null || user_to_class_.Proffestions.Count() == 0) ? 0 : user_to_class_.Proffestions.Any(p2 => p2.ProffestionId == p.ProffestionId) ? 1 : 0

                   });
                })?.ToList();

            }
            return profs;
        }





        ///get proffestions to teacher
        public static List<ProffestionJoinTeacherDTO> GetProffestionJoinTeacher(int teacherId)
        {
            List<ProffestionJoinTeacherDTO> ProffestionsToTeacher = new List<ProffestionJoinTeacherDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.getProffestionsJoinTeacher(teacherId).ToList().ForEach(p =>
                {
                    ProffestionsToTeacher.Add(Convertion.ProffestionConvertion.ConvertToProffestionJoinUserDTO(p));
                });
            }
            return ProffestionsToTeacher;
        }

        //get student proffestion proffestion level by teacher
        public static float GetStudentProffestionsLevelByTeacher(int TeacherId, int StudentId, int ClassId)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                int count = 0;
                float mark = (float)db.GetStudentProffestionsLevelByTeacher(StudentId, TeacherId, ClassId).GroupBy(x => x.ProffestionId).Select(
                  p =>
                  {
                      count++;
                      return p.Sum(s =>
                      {
                          switch (s.scoring)
                          {
                              case "לא מדויק": return s.a * 0.3;
                              case "נכון": return s.a * 0.6;
                              case "מומלץ": return s.a * 0.9;
                              case "יעיל": return s.a * 1.2;
                              default: return 0;
                          }
                      }) / (p.Sum(a => a.a));
                  }).Sum();
                return mark * (1f / count);
            }
        }

        //get student proffestion level
        public static List<StudentProffestionLevelDTO> GetStudentProffestionsLevel(int StudentId)
        {
            List<StudentProffestionLevelDTO> marks = new List<StudentProffestionLevelDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.ScoringPerPro(DateTime.Now.Month, DateTime.Now.Year, StudentId).ToList().ForEach(m =>
                {
                    float mark = (float)((m.scoringa * 1.2 + m.scoringb * 0.9 + m.scoringc * 0.6 + m.scoringd * 0.3 + m.scoringe * 0) / m.cntall);
                    marks.Add(new StudentProffestionLevelDTO() { mark = mark, proffestion = new ProffestionsDTO() { ProffestionId = (int)m.pid, ProffestionName = m.pname } });
                });
            }
            return marks;
        }
    }
}
