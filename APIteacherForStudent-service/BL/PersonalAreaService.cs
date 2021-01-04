using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DTO;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class PersonalAreaService
    {

        ///get opinions for user answers
        public static AnswerAndOpinionToUser answerAndOpinionToUser(int idUser)
        {
            AnswerAndOpinionToUser answerandOpinionToUser = new AnswerAndOpinionToUser();
            Answer answer = new Answer();
            List<UserAnswerDTO> answers = new List<UserAnswerDTO>();
            List<answerOpinionDTO> opinion = new List<answerOpinionDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.Answers.ToList().ForEach(x =>
                    {
                        if (x.UserId == idUser)
                            answers.Add(Convertion.AnswerConvertion.ConvertToUserAnswerDTO(x));
                    });
                    db.answerOpinions.ToList().ForEach(x =>
                    {
                        answer = db.Answers.ToList().FirstOrDefault(y => y.AnswerId == x.AnswerId);
                        if (answer.UserId == idUser)
                            opinion.Add(Convertion.AnswerOpinionConvertion.ConvertToAnswerOpinionDTO(x));
                    });
                }
                answerandOpinionToUser.opinionAnswers = opinion;
                answerandOpinionToUser.userAnswers = answers;
                return answerandOpinionToUser;
            }
            catch (Exception)
            {
                return null;
            }

        }
        ///get answers for user questions
        public static questionAndAnswersToUser GetAnswersUser(int IdUser)
        {
            questionAndAnswersToUser questionandAnswersToUser = new questionAndAnswersToUser();
            List<UserQuestionDTO> userQuestions = new List<UserQuestionDTO>();
            List<UserAnswerDTO> userAnswers = new List<UserAnswerDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.Questions.ToList().ForEach(x =>
                    {
                        if (x.UserId == IdUser)
                            userQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                    });
                    db.Answers.ToList().ForEach(x =>
                    {
                        userQuestions.ToList().ForEach(y =>
                        {
                            if (x.QuestionId == y.QuestionId)
                                userAnswers.Add(Convertion.AnswerConvertion.ConvertToUserAnswerDTO(x));
                        });

                    });
                    questionandAnswersToUser.questions = userQuestions;
                    questionandAnswersToUser.answersToQuestions = userAnswers;
                    return questionandAnswersToUser;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        ///get classes and students for user ---> teacher
        public static List<teacherJoinSchools_ResultDTO> GetClassesAndStudentToUser(int idUser)
        {
            List<teacherJoinSchools_Result> teacherJoinSchools = new List<teacherJoinSchools_Result>();
            List<teacherJoinSchools_ResultDTO> teacherJoinSchoolsDTO = new List<teacherJoinSchools_ResultDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    teacherJoinSchools = db.teacherJoinSchools(idUser).ToList();
                    if (teacherJoinSchools.Count != 0)
                    {
                        teacherJoinSchools.ToList().ForEach(x =>
                        {
                            teacherJoinSchools_ResultDTO t_j_s_r = new teacherJoinSchools_ResultDTO();
                            t_j_s_r = Convertion.teacherJoinSchools_ResultConvertion.convertToteacherJoinSchools_ResultDTO(x);
                            t_j_s_r.EducationalLevel = ProffestionService.GetStudentProffestionsLevelByTeacher(idUser, t_j_s_r.UserId,t_j_s_r.idClass);
                            teacherJoinSchoolsDTO.Add(t_j_s_r);
                        });

                        return teacherJoinSchoolsDTO;
                    }
                    else
                        return null;
                }
            }
            catch (Exception)
            {
                return null;
            }

        }
        ///get user questions
        public static List<UserQuestionDTO> GetQuestionsUser(int idUser)
        {
            List<UserQuestionDTO> questions = new List<UserQuestionDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.Questions.ToList().ForEach(x =>
                    {
                        if (x.UserId == idUser)
                            questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                    });
                    return questions;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        ///get details for user school
        public static List<TeachersAndSecretaryToSchool> GetTeachersAndSecretaryToSchool()
        {
            List<TeachersAndSecretaryToSchool> ListteachersAndSecretaryToSchools = new List<TeachersAndSecretaryToSchool>();
            TeachersAndSecretaryToSchool teachersAndSecretaryToSchool;
            List<ClassToSchool> classes = new List<ClassToSchool>();
            User user = new User();
            bool flag;
            List<UserDTO> teachers = new List<UserDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    flag = false;
                    db.Schools.ToList().ForEach(school =>
                    {
                        classes = new List<ClassToSchool>();
                        teachersAndSecretaryToSchool = new TeachersAndSecretaryToSchool();
                        db.ClassToSchools.ToList().ForEach(x =>
                        {
                            if (x.idSchool == school.id)
                                classes.Add(x);
                        });
                        teachers = new List<UserDTO>();
                        db.UserToClasses.ToList().ForEach(x =>
                        {
                            classes.ForEach(y =>
                            {
                                if (x.idClass == y.id)
                                {
                                    user = new User();
                                    user = db.Users.ToList().FirstOrDefault(u => u.UserId == x.idUser);
                                    if (user.UserKind == "מורה" && user.Active == 1)
                                    {
                                        teachers.ToList().ForEach(t =>
                                        {
                                            if (t.UserId == user.UserId)
                                                flag = true;
                                        });
                                        if(flag==false)
                                            teachers.Add(Convertion.userConvertion.ConvertToUserDto(user));
                                        flag = false;
                                    }
                                }
                            });
                        });
                        db.Secretaries.ToList().ForEach(s =>
                        {
                            if (s.SecretaryId == school.IdSecretary)
                                teachersAndSecretaryToSchool.secretary = Convertion.SecretaryConvertion.ConvertToSecretaryDTO(s);
                        });
                        teachersAndSecretaryToSchool.teachers = teachers;
                        teachersAndSecretaryToSchool.cityName = db.Cities.ToList().FirstOrDefault(c => c.id == school.IdCity).CityName;
                        teachersAndSecretaryToSchool.idSchool = school.idSchool;
                        teachersAndSecretaryToSchool.SchoolName = school.SchoolName;
                        ListteachersAndSecretaryToSchools.Add(teachersAndSecretaryToSchool);
                    });

                }
                return ListteachersAndSecretaryToSchools;
            }
            catch (Exception)
            {
                return null;
            }
        }
        ///get  school of user
        public static GetSchoolToStudent getSchoolToStudent(int idStudent)
        {
            User student = new User();
            GetSchoolToStudent getschoolToStudent = new GetSchoolToStudent();
            ClassToSchool classToSchool = new ClassToSchool();
            List<ClassToSchool> classesToSchools = new List<ClassToSchool>();
            List<UserDTO> teachers = new List<UserDTO>();
            List<UserDTO> friends = new List<UserDTO>();
            bool flag;
            User user;
            School school = new School();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    student = db.Users.FirstOrDefault(x => x.UserId == idStudent);
                    classToSchool = db.ClassToSchools.ToList().FirstOrDefault(x => x.id == student.UserToClasses.ToArray()[0].idClass);
                    db.Schools.ToList().ForEach(x =>
                    {
                        if (x.id == classToSchool.idSchool)
                            school = x;
                    });
                    getschoolToStudent.className = classToSchool.className;
                    getschoolToStudent.idSchool = school.id;
                    getschoolToStudent.SchoolName = school.SchoolName;
                    db.Secretaries.ToList().ForEach(x =>
                    {
                        if (x.SecretaryId == school.IdSecretary)
                            getschoolToStudent.secretary = Convertion.SecretaryConvertion.ConvertToSecretaryDTO(x);
                    });
                    db.ClassToSchools.ToList().ForEach(x =>
                    {
                        if (x.idSchool == school.id)
                            classesToSchools.Add(x);
                    });
                    db.UserToClasses.ToList().ForEach(x =>
                    {
                        classesToSchools.ToList().ForEach(c =>
                        {
                            if (x.idClass == c.id)
                            {
                                flag = false;
                                user = new User();
                                user = db.Users.ToList().FirstOrDefault(u => u.UserId == x.idUser);
                                if (user.UserKind == "מורה" && user.Active == 1)
                                {
                                    teachers.ToList().ForEach(t =>
                                    {
                                        if (t.UserId == user.UserId)
                                            flag = true;
                                    });
                                    if (flag == false)
                                        teachers.Add(Convertion.userConvertion.ConvertToUserDto(user));
                                }
                            }
                        });
                        if(x.idClass== classToSchool.id)
                        {
                            user = new User();
                            user = db.Users.ToList().FirstOrDefault(u => u.UserId == x.idUser);
                            if (user != null && user.UserKind == "תלמיד" && user.Active == 1 && user.UserId != idStudent) 
                                friends.Add(Convertion.userConvertion.ConvertToUserDto(user));
                        }
                    });
                    getschoolToStudent.users = friends;
                    getschoolToStudent.teachers = teachers;
                    return getschoolToStudent;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
        