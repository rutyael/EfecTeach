using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class SchoolService
    {
        /// <summary>
        /// put classes to user
        /// </summary>
        /// <param name="idUser"></param>
        /// <param name="classes"></param>
        /// <param name="mess"></param>
        public static void PutClasseToUser(List<UserToClassDTO> classes, ref string mess)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                if (classes.Count <= 0)
                {
                    mess = "any classes for set";
                    return;
                }
                var UserId = classes[0].idUser;
                string userkind = db.Users.FirstOrDefault(u => u.UserId == UserId).UserKind;
                classes.ToList().ForEach(c =>
                {
                    switch (c.approved)
                    {
                        case 22:
                            {
                                var _c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                                _c.approved = 2;
                                _c.factor = "u";
                                c.id = _c.id;
                                break;
                            }
                        case -1:
                            {
                                var _c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                                _c.approved = -1;
                                _c.LastDateOfStatusChange = DateTime.Now;
                                c.id = _c.id;
                                break;
                            }
                        case 11:
                            {
                                c.approved = 1;
                                c.factor = "u";
                                var new_c = db.UserToClasses.Add(Convertion.UserToClassConvertion.ConvertToUserToClass(c));
                                db.SaveChanges();
                                db.Entry(new_c).Reload();
                                c.id = new_c.id;
                                break;
                            }
                        case 33:
                            {
                                var _c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                                _c.approved = 3;
                                _c.factor = "u";
                                c.id = _c.id;
                                break;
                            }
                        default:
                            var __c = db.UserToClasses.FirstOrDefault(cl => cl.idClass == c.idClass && cl.idUser == c.idUser);
                            c.id = __c.id; break;

                    };
                    if (userkind == "מורה")
                        ProffestionService.PutTeacherToClassProffestions(c.TCProffestions, c.id);
                    db.SaveChanges();
                });
            }
        }

        //get school join user
        public static List<ClassesJoinUserDTO> GetSchoolJoinUser(int idUser)
        {
            List<ClassesJoinUserDTO> classToUser = new List<ClassesJoinUserDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                List<getClassesJoinUser_Result> x = db.getClassesJoinUser(idUser).ToList();
                db.getClassesJoinUser(idUser).ToList().ForEach(c =>
                {
                   classToUser.Add(Convertion.SchoolConvertion.ConvertToClassesJoinUserDTO(c));
                });
            }
            return classToUser;
        }

        //get schools
        public static List<SchoolsDTO> GetSchools()
        {
            List<SchoolsDTO> schools = new List<SchoolsDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.Schools.ToList().ForEach(s => { schools.Add(Convertion.SchoolConvertion.ConvertToSchoolsDTO(s)); });
            }
            return schools;
        }
        /// <summary>
        /// post new school
        /// </summary>
        /// <param name="school"></param>
        /// <param name="mass"></param>
        /// <returns></returns>
        public static SchoolsDTO postSchool(SchoolsDTO school, ref string mass)
        {
            int idSChool;
            School School = new School();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    School ifExitsNumSchool = db.Schools.ToList().FirstOrDefault(x => x.idSchool == school.idSchool);
                    db.Schools.ToList();
                    if (ifExitsNumSchool != null)
                    {
                        mass = "מוסד זה כבר נמצא במערכת";
                        return null;
                    }
                    School = db.Schools.Add(Convertion.SchoolConvertion.ConvertToSchool(school));
                    db.SaveChanges();
                    idSChool = School.id;
                    school.ClassesToSchool.ToList().ForEach(x =>
                    {
                        x.idSchool = idSChool;
                        School.ClassToSchools.Add(Convertion.ClassToSchoolConvertion.ConvertToClassToSchool(x));
                    });
                    db.SaveChanges();
                    return Convertion.SchoolConvertion.ConvertToSchoolsDTO(School);
                }
            }
            catch (Exception e)
            {
                mass = "פעולת ההוספה נכשלה, אנא נסה שוב";
                return null;
            }
        }
        /// <summary>
        /// get school by secretary user
        /// </summary>
        /// <param name="IdSecretary"></param>
        /// <returns></returns>
        public static SchoolsDTO getSchoolByIdSecretary(int IdSecretary)
        {
            School school = new School();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    school = db.Schools.ToList().FirstOrDefault(x => x.IdSecretary == IdSecretary);
                    return Convertion.SchoolConvertion.ConvertToSchoolsDTO(school);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //put details school
        public static SchoolsDTO putDetailsSchool(int cityId, string commentValue, int idSchool)
        {
            School school = new School();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    school = db.Schools.ToList().FirstOrDefault(x => x.id == idSchool);
                    school.IdCity = cityId;
                    school.comment = commentValue;
                    db.SaveChanges();
                    return Convertion.SchoolConvertion.ConvertToSchoolsDTO(school);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        /// <summary>
        /// update school details by secretary
        /// </summary>
        /// <param name="putSchool"></param>
        /// <returns></returns>
        public static bool putSchool(ApdateSchoolDTO putSchool)
        {
            School school = new School();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                ClassToSchool selectClass = new ClassToSchool();
                school = db.Schools.ToList().FirstOrDefault(x => x.idSchool == putSchool.idSchool);
                if (putSchool.IdCity != 0)
                    school.IdCity = putSchool.IdCity;
                if (putSchool.comment != "" && putSchool.comment != null)
                    school.comment = putSchool.comment;
                if (putSchool.ClassesToAdd.ToArray().Length != 0)
                {
                    putSchool.ClassesToAdd.ToList().ForEach(x =>
                    {
                        var newc = db.ClassToSchools.Add(Convertion.ClassToSchoolConvertion.ConvertToClassToSchool(x));
                        db.SaveChanges();
                        db.Entry(newc).Reload();
                        x.Proffestions.ForEach(p => { db.Database.ExecuteSqlCommand("Insert into ProffestionsToClass Values({0},{1})", p.ProffestionId, newc.id); });

                    });
                }

                if (putSchool.ClassesToApdate.ToArray().Length != 0)
                {
                    putSchool.ClassesToApdate.ToList().ForEach(x =>
                    {
                        selectClass = db.ClassToSchools.ToList().FirstOrDefault(y => y.id == x.id);
                        selectClass.comment = x.comment;
                        selectClass.Proffestions.ToList().ForEach(p =>
                        {
                            if (x.Proffestions.Where(p2 => p2.ProffestionId == p.ProffestionId).Count() == 0)
                                db.Database.ExecuteSqlCommand("Delete from ProffestionsToClass where ProffestionId = @pid and Class = @cid", new SqlParameter("@pid", p.ProffestionId), new SqlParameter("@cid", x.id));
                        });
                        x.Proffestions.ForEach(p => { if (selectClass.Proffestions.Where(p2 => p2.ProffestionId == p.ProffestionId).Count() == 0) db.Database.ExecuteSqlCommand("Insert into ProffestionsToClass Values({0},{1})", p.ProffestionId, x.id); });
                    });
                }
                db.SaveChanges();
                return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        

        //get new data
        public static bool GetNewData(int UserId, DateTime? LastEnteryDate)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                var x = db.UserToClasses.Any(uc => uc.idUser == UserId && uc.LastDateOfStatusChange > LastEnteryDate && uc.factor != "u");
                return x;
            }
        }
    }
}
