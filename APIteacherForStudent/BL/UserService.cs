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

            using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
            {
                User userf = new User();
                userf = db.User.ToList().FirstOrDefault(x => x.UserPassword == password || x.UserName == name);
                return Convertion.userConvertion.ConvertToDto(userf);
            }
        }
        public static UserDTO GetPostUser(UserDTO userDto)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
                {
                    db.User.Add(Convertion.userConvertion.ConvertToUser(userDto));
                    db.SaveChanges();
                    return Convertion.userConvertion.ConvertToDto(Convertion.userConvertion.ConvertToUser(userDto));
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static UserDTO Put(string id, UserDTO userdto)
        {
            try
            {

                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
                {
                    ///////////האם משנה באמת
                    User user = db.User.FirstOrDefault(u => u.UserId == id);
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

        public static bool PutRemovedClassToTeacher(List<UserToClassDTO_> classes)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
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
        public static bool PutAddClassToTeacher(List<UserToClassDTO_> classes)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
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
        public static bool PutRemoveProfestionToTeacher(string id, List<ProffestionsDTO> proffestions)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
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
        public static bool PutAddProfestionToTeacher(string id, List<ProffestionsDTO> proffestions)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
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
        public static AnswerDTO GetPostAnswer(AnswerDTO answerdto)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
                {
                    db.Answers.Add(Convertion.AnswerConvertion.ConvertToAnswer(answerdto));
                    db.SaveChanges();
                    return Convertion.AnswerConvertion.ConvertToDTO(Convertion.AnswerConvertion.ConvertToAnswer(answerdto));
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static QuestionsDTO GetPostQuestion(QuestionsDTO questiondto)
        {
            try
            {
                using (TeacherForStudentEntities1 db = new TeacherForStudentEntities1())
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
