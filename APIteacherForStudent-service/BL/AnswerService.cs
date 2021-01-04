using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class AnswerService
    {
        ///post an answer
        public static AnswerDTO GetPostAnswer(AnswerDTO answerdto)
        {
            Answer answer = new Answer();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    answer = db.Answers.Add(Convertion.AnswerConvertion.ConvertToAnswer(answerdto));
                    db.SaveChanges();
                    return Convertion.AnswerConvertion.ConvertToDTO(answer);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        ///get all answers which replyed for a questions
        public static List<FullUserAnswer> GetAnswersForQuestion(int idQuestion)
        {
            List<FullUserAnswer> answers = new List<FullUserAnswer>();
            FullUserAnswer fullUserAnswer;
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    Question question = db.Questions.ToList().FirstOrDefault(q => q.QuestionId == idQuestion);
                    if (question != null)
                    {
                        question.Answers.ToList().ForEach(a =>
                        {
                            fullUserAnswer = new FullUserAnswer();
                            fullUserAnswer.commentsAnswer = GetCommentAnswerById(a.AnswerId);
                            fullUserAnswer.userAnswer = Convertion.AnswerConvertion.ConvertToUserAnswerDTO(a);
                            answers.Add(fullUserAnswer);
                        });
                    }
                }
                return answers;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get student answer and classes to teacher
        public static AnswerAndClassesToTeacher studentAnswersAndClassesToTeacher(int idTeacher)
        {
            AnswerAndClassesToTeacher answerAndClassesToTeacher = new AnswerAndClassesToTeacher();
            ClassToSchool SelectClass = new ClassToSchool();
            List<ClassToSchoolDTO> Classes = new List<ClassToSchoolDTO>();
            User teacher = new User();
            UserToClass userAnswerQuestion = new UserToClass();
            User UserAnswerQuestion = new User();
            List<UserToClass> classesTeacher = new List<UserToClass>();
            List<FullUserAnswer> studentAnswers = new List<FullUserAnswer>();
            List<CommentAnswerDTO> comments = new List<CommentAnswerDTO>();
            FullUserAnswer fullUserAnswer = new FullUserAnswer();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    {
                        teacher = db.Users.ToList().FirstOrDefault(x => x.UserId == idTeacher);
                        classesTeacher = teacher.UserToClasses.Where(c => c.approved == 2).ToList();
                        classesTeacher.ToList().ForEach(x =>
                        {
                            SelectClass = db.ClassToSchools.ToList().FirstOrDefault(y => y.id == x.idClass);
                            Classes.Add(Convertion.ClassToSchoolConvertion.ConvertToClassToSchoolDTO(SelectClass));
                        });
                        db.Answers.ToList().ForEach(x =>
                        {
                            UserAnswerQuestion = db.Users.ToList().FirstOrDefault(o => o.UserId == x.UserId);
                            if (UserAnswerQuestion.UserKind == "תלמיד")
                            {
                                userAnswerQuestion = db.UserToClasses.ToList().FirstOrDefault(z => z.idUser == x.UserId);
                                classesTeacher.ToList().ForEach(y =>
                                {
                                    if (userAnswerQuestion.idClass == y.idClass)
                                    {
                                        comments = new List<CommentAnswerDTO>();
                                        fullUserAnswer = new FullUserAnswer();
                                        fullUserAnswer.userAnswer = Convertion.AnswerConvertion.ConvertToUserAnswerDTO(x);
                                        db.CommentsAnswers.ToList().ForEach(c =>
                                        {
                                            if (c.IdAnswer == x.AnswerId)
                                                comments.Add(Convertion.commentAnswerConvertion.ConvertToCommentAnswerDTO(c));
                                        });
                                        fullUserAnswer.commentsAnswer = comments;
                                        fullUserAnswer.PopularAnswer = GetPopularAnswer(x.AnswerId);
                                        fullUserAnswer.EfectiveAnswer = GetEfectiveAnswer(x.AnswerId);
                                        studentAnswers.Add(fullUserAnswer);
                                    }
                                });
                            }
                        });
                        studentAnswers.Reverse();
                    }
                }
                answerAndClassesToTeacher.answers = studentAnswers;
                answerAndClassesToTeacher.classes = Classes;
                return answerAndClassesToTeacher;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //post answer opinion
        public static bool postAnswerOpinion(answerOpinionDTO answerOpinion)
        {
            answerOpinion answer = new answerOpinion();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    answer = db.answerOpinions.Add(Convertion.AnswerOpinionConvertion.ConvertToAnswerOpinion(answerOpinion));
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        //get answer by id
        public static FullUserAnswer GetAnswerById(int idAnswer)
        {
            Answer answer = new Answer();
            FullUserAnswer fullUserAnswer = new FullUserAnswer();
            List<CommentAnswerDTO> comments = new List<CommentAnswerDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.Answers.ToList().ForEach(x =>
                    {
                        if (x.AnswerId == idAnswer)
                            answer = x;
                    });
                    if (answer != null)
                    {
                        fullUserAnswer.userAnswer = Convertion.AnswerConvertion.ConvertToUserAnswerDTO(answer);
                        db.CommentsAnswers.ToList().ForEach(c =>
                        {
                            if (c.IdAnswer == idAnswer)
                                comments.Add(Convertion.commentAnswerConvertion.ConvertToCommentAnswerDTO(c));
                        });
                        fullUserAnswer.commentsAnswer = comments;
                        return fullUserAnswer;
                    }
                    else return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get all answers
        public static List<UserAnswerDTO> GetAllAnswers()
        {
            List<UserAnswerDTO> allAnswers = new List<UserAnswerDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.Answers.ToList().ForEach(x =>
                    {
                        allAnswers.Add(Convertion.AnswerConvertion.ConvertToUserAnswerDTO(x));
                    });
                }
                return allAnswers;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //post comment answer
        public static CommentAnswerDTO PostCommentAnswer(CommentAnswerDTO comment)
        {
            CommentsAnswer commentAnswer = new CommentsAnswer();
            bool postTwice = false;
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.CommentsAnswers.ToList().ForEach(c =>
                    {
                        if (c.UserId == comment.UserId && c.IdAnswer == comment.IdAnswer)
                            postTwice = true;
                    });
                    if (postTwice == true) 
                        return null;
                    else
                    {
                        commentAnswer = db.CommentsAnswers.Add(Convertion.commentAnswerConvertion.ConvertToCommentAnswer(comment));
                        db.SaveChanges();
                        return Convertion.commentAnswerConvertion.ConvertToCommentAnswerDTO(commentAnswer);
                    }
  
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get comments question and answer
        public static GetCommentQA GetCommentsQA(int UserId)
        {
            List<CommentAnswerDTO> commentAnswers = new List<CommentAnswerDTO>();
            List<CommentQuestionDTO> commentQuestions = new List<CommentQuestionDTO>();
            GetCommentQA getCommentQA = new GetCommentQA();
            Answer answer = new Answer();
            Question question = new Question();
            User user = new User();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.CommentsAnswers.ToList().ForEach(x =>
                    {
                        answer = db.Answers.ToList().FirstOrDefault(a => a.AnswerId == x.IdAnswer);
                        if (answer.UserId == UserId)
                        {
                            commentAnswers.Add(Convertion.commentAnswerConvertion.ConvertToCommentAnswerDTO(x));
                            user = new User();
                            user = db.Users.ToList().FirstOrDefault(u => u.UserId == x.UserId);
                            getCommentQA.CommentAnswersUser.Add(Convertion.userConvertion.ConvertToUserDto(user));
                        }
                    });
                    db.CommentsQuestions.ToList().ForEach(x =>
                    {
                        question = db.Questions.ToList().FirstOrDefault(q => q.QuestionId == x.IdQuestion);
                        if (question.UserId == UserId)
                        {
                            commentQuestions.Add(Convertion.CommentQuestionConvertion.ConvertToCommentQ_ADTO(x));
                            user = new User();
                            user = db.Users.ToList().FirstOrDefault(u => u.UserId == x.UserId);
                            getCommentQA.CommentQuestionsUser.Add(Convertion.userConvertion.ConvertToUserDto(user));
                        }
                    });
                    getCommentQA.CommentAnswers = commentAnswers;
                    getCommentQA.CommentQuestions = commentQuestions;
                    return getCommentQA;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get comment answer by id
        public static List<CommentAnswerDTO> GetCommentAnswerById(int idAnswer)
        {
            List<CommentAnswerDTO> commentAnswers = new List<CommentAnswerDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.CommentsAnswers.ToList().ForEach(x =>
                    {
                        if (x.IdAnswer == idAnswer)
                            commentAnswers.Add(Convertion.commentAnswerConvertion.ConvertToCommentAnswerDTO(x));
                    });
                    return commentAnswers;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get efective answer
        public static int GetEfectiveAnswer(int IdAnswer)
        {
            int i = 0;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.answerOpinions.ToList().ForEach(a =>
                {
                    if (a.AnswerId == IdAnswer && a.scoring == "יעיל")
                    {
                        i = i + 1;
                    }
                });
                if (i > 2)
                    return 1;
                else return 0;
            }
  
        }

        //get popular answer
        public static int GetPopularAnswer(int IdAnswer)
        {
            int iEfect = 0;
            int iTrue = 0;
            int iRecommend = 0;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                db.answerOpinions.ToList().ForEach(a =>
                {
                    if (a.AnswerId == IdAnswer && a.scoring == "יעיל")
                        iEfect = iEfect + 1;
                    if (a.AnswerId == IdAnswer && a.scoring == "נכון")
                        iTrue = iTrue + 1;
                    if (a.AnswerId == IdAnswer && a.scoring == "מומלץ")
                        iRecommend = iRecommend + 1;
                });
                if (iEfect >= 1 && iTrue >= 2 && iRecommend >= 3)
                    return 1;
                else return 0;
            }
        }
    }
}
