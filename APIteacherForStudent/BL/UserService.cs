using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DTO;
namespace BL
{

    public class userService
    {
        public static UserDTO Login(string password, string name)
        {

            using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
            {
                Users userf = new Users();
                userf = db.Users.ToList().FirstOrDefault(x => x.UserPassword == password || x.UserName == name);
                return Convertion.userConvertion.ConvertToDto(userf);
            }
        }
        public static UserDTO GetPostUser(UserDTO userDto)
        {

            using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
            {
                Users IsExits = db.Users.ToList().FirstOrDefault(u => u.UserName == userDto.UserName || u.UserMail == userDto.UserMail);
                if (IsExits == null)
                    return null;
                db.Users.Add(Convertion.userConvertion.ConvertToUser(userDto));
                db.SaveChanges();
                return Convertion.userConvertion.ConvertToDto(Convertion.userConvertion.ConvertToUser(userDto));
            }


        }
        public static UserDTO Put(int id, UserDTO userdto)
        {
            try
            {

                using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
                {
                    ///////////האם משנה באמת
                    Users user = db.Users.FirstOrDefault(u => u.UserId == id);
                    user.UserMail = userdto.UserMail;
                    db.SaveChanges();
                    return Convertion.userConvertion.ConvertToDto(user);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool PutRemovedClassToTeacher(List<UserToClassDTO> classes)
        {
            try
            {
                using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
                {
                    foreach (var item in classes)
                    {
                        db.UserToClass.Remove(Convertion.UserToClassConvertion.ConvertToUserToClass(item));
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool PutAddClassToTeacher(List<UserToClassDTO> classes)
        {
            try
            {
                using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
                {
                    foreach (var item in classes)
                    {
                        db.UserToClass.Add(Convertion.UserToClassConvertion.ConvertToUserToClass(item));
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool PutRemoveProfestionToTeacher(int id, List<ProffestionsDTO> proffestions)
        {
            try
            {
                using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
                {
                    db.User.ToList().ForEach(x =>
                    {
                        if (x.UserId == id)
                        {
                            foreach (var item in proffestions)
                            {
                                x.Proffestions.Remove(Convertion.ProffestionConvertion.ConvertToProffestion(item));
                            }
                        }
                    });
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }


        }
        public static bool PutAddProfestionToTeacher(int id, List<ProffestionsDTO> proffestions)
        {
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.User.ToList().ForEach(x =>
                    {
                        if (x.UserId == id)
                        {
                            foreach (var item in proffestions)
                            {
                                x.Proffestions.Add(Convertion.ProffestionConvertion.ConvertToProffestion(item));
                            }
                        }
                    });
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //public static AnswerDTO GetPostAnswer(AnswerDTO answerdto)
        //{
        //    try
        //    {
        //        using (TeacherForStudentEntities db = new TeacherForStudentEntities())
        //        {
        //            db.Answers.Add(Convertion.AnswerConvertion.ConvertToAnswer(answerdto));
        //            db.SaveChanges();
        //            return Convertion.AnswerConvertion.ConvertToDTO(Convertion.AnswerConvertion.ConvertToAnswer(answerdto));
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}
        public static QuestionsDTO GetPostQuestion(QuestionsDTO questiondto)
        {
            try
            {
                using (TeacherForStudentEntitie db = new TeacherForStudentEntitie())
                {
                    db.Questions.Add(Convertion.QuestionConvertion.ConvertToQustion(questiondto));
                    db.SaveChanges();
                    return Convertion.QuestionConvertion.ConvertToDTO(Convertion.QuestionConvertion.ConvertToQustion(questiondto));
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
