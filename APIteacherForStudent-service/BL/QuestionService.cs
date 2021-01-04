using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BL
{
    public class QuestionService
    {
        ///get question which have  no any answer
        public static QuestionsReturnDefalt GetNoAnswerQuestion(int index)
        {
            int numQuestions;
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                QuestionsReturnDefalt questionsReturnDefalt = new QuestionsReturnDefalt();
                int numQuestionsFilter = 0;
                List<UserQuestionDTO> questions = new List<UserQuestionDTO>();
                numQuestions = db.Questions.ToArray().Length;
                db.Questions.ToList().ForEach(x =>
                {
                    if (x.Answers.Count() == 0)
                        numQuestionsFilter++;
                });
                if (numQuestions < 15 && index == 0)
                {
                    db.Questions.ToList().ForEach(x =>
                    {
                        if (x.Answers.Count() == 0)
                            questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                    });
                }
                else
                {
                    if (numQuestions < 15 && index != 0)
                        return null;
                    for (int i = numQuestions - index - 1; (i >= numQuestions - index - 15 && i >= 0); i--)
                    {
                        if (db.Questions.ToArray()[i].Answers.Count() == 0)
                            questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                    }
                }
                questions.Reverse();
                questionsReturnDefalt.QuestionsDefalt = questions;
                questionsReturnDefalt.NumQuestions = numQuestionsFilter;
                return questionsReturnDefalt;
            }
        }
        ///get all questions
        public static QuestionsReturnDefalt getAllQuestionDefalt(int index)
        {
            int numQuestions;
            QuestionsReturnDefalt questionsReturnDefalt = new QuestionsReturnDefalt();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                numQuestions = db.Questions.ToArray().Length;
                List<UserQuestionDTO> questions = new List<UserQuestionDTO>();

                if (numQuestions < 15 && index == 0)
                {
                    db.Questions.ToList().ForEach(x =>
                    {
                        questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                    });
                }
                else
                {
                    if (numQuestions < 15 && index != 0)
                        return null;
                    for (int i = numQuestions - index - 1; (i >= numQuestions - index - 15 && i >= 0); i--)
                    {
                        questions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                    }
                }

                questions.Reverse();
                questionsReturnDefalt.QuestionsDefalt = questions;
                questionsReturnDefalt.NumQuestions = numQuestions;
                return questionsReturnDefalt;
            }
        }
        ///get question by id
        public static FullUserQuestion GetQuestionById(int id)
        {
            FullUserQuestion fullUserQuestion = new FullUserQuestion();
            List<CommentQuestionDTO> commentQuestions = new List<CommentQuestionDTO>();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                UserQuestionDTO question = new UserQuestionDTO();
                db.Questions.ToList().ForEach(x =>
                {
                    if (x.QuestionId == id)
                    {
                        fullUserQuestion.userQuestion = Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x);
                        db.CommentsQuestions.ToList().ForEach(c =>
                        {
                            if (c.IdQuestion == id)
                                commentQuestions.Add(Convertion.CommentQuestionConvertion.ConvertToCommentQ_ADTO(c));
                        });
                        fullUserQuestion.commentsQuestion = commentQuestions;
                    }

                });
                return fullUserQuestion;
            }
        }
        //put question
        public static bool putQuestion(QuestionsDTO question)
        {
            Question SelectQuestion = new Question();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    SelectQuestion = db.Questions.ToList().FirstOrDefault(x => x.QuestionId == question.QuestionId && x.UserId == question.UserId);
                    SelectQuestion.QuestionView = question.QuestionView;
                    SelectQuestion.NumQuestioners = question.NumQuestioners;
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        ///post a question
        public static QuestionsDTO PostQuestion(QuestionsDTO question)
        {
            Question questionAdd = new Question();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                try
                {
                    questionAdd =db.Questions.Add(Convertion.QuestionConvertion.ConvertToQustion(question));
                    db.SaveChanges();
                    return Convertion.QuestionConvertion.ConvertToQuestionDTO(questionAdd);
                }
                catch
                {
                return null;
                }
        }
        }
        ///sort questions by language
        public static SortLists sortByLanguageUser(int idUser, int index, string status)
        {
            int numQuestion;
            User user = new User();
            Boolean IfAdd = false;
            SortLists sortLists = new SortLists();
            List<Proffestion> Teacherproffestions = new List<Proffestion>();
            List<SortByStudentProffestions_Result> AllQuestionProffestions = new List<SortByStudentProffestions_Result>();
            List<UserQuestionDTO> proffestionsQuestions = new List<UserQuestionDTO>();
            List<UserQuestionDTO> NoProffestionsQuestions = new List<UserQuestionDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    user = db.Users.ToList().FirstOrDefault(x => x.UserId == idUser);
                    numQuestion = db.Questions.ToArray().Length;
                    if (status == "teacher")
                    {
                        Teacherproffestions = user.Proffestions.ToList();
                        if (numQuestion < 15 && index == 0)
                        {
                            for (int i = numQuestion - 1; i >= 0; i--)
                            {
                                IfAdd = false;
                                if (Teacherproffestions.ToList().Count() != 0)
                                {
                                    Teacherproffestions.ToList().ForEach(y => {
                                        if (db.Questions.ToArray()[i].ProffestionId == y.ProffestionId)
                                        {
                                            proffestionsQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                                            IfAdd = true;
                                        }

                                    });
                                    if (IfAdd == false)
                                        NoProffestionsQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                                }
                            }
                        }
                        else
                        {
                            if (numQuestion < 15 && index != 0)
                                return null;
                            for (int i = numQuestion - index - 1; (i >= numQuestion - index - 15 && i >= 0); i--)
                            {
                                IfAdd = false;
                                if (Teacherproffestions.ToList().Count() != 0)
                                {
                                    Teacherproffestions.ToList().ForEach(y => {
                                        if (db.Questions.ToArray()[i].ProffestionId == y.ProffestionId)
                                        {
                                            proffestionsQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                                            IfAdd = true;
                                        }

                                    });
                                    if (IfAdd == false)
                                        NoProffestionsQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(db.Questions.ToArray()[i]));
                                }
                            }
                        }
                        sortLists.FirstList = proffestionsQuestions;
                        sortLists.SecondList = NoProffestionsQuestions;
                    }
                    else
                    {
                        AllQuestionProffestions = db.SortByStudentProffestions(idUser, index).ToList();
                        AllQuestionProffestions.ToList().ForEach(x =>
                        {
                            sortLists.FirstList.Add(Convertion.QuestionConvertion.ConvertFromSortProcedureToUserQuestionDTO(x));
                        });
                    }

                    return sortLists;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        ///sort questions by user classes
        public static SortLists sortByUserClasses(int idUser, int index, string status)
        {
            int numQuestion;
            User userSelect = new User();
            Boolean IfAdd = false;
            SortLists listsByProffestion = new SortLists();
            List<UserToClass> UserClasses = new List<UserToClass>();
            List<UserQuestionDTO> ClassesQuestions = new List<UserQuestionDTO>();
            List<UserQuestionDTO> NoClassesQuestions = new List<UserQuestionDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    userSelect = db.Users.ToList().FirstOrDefault(x => x.UserId == idUser);
                    numQuestion = db.Questions.ToArray().Length;
                    UserClasses = userSelect.UserToClasses.Where(c => c.approved == 2).ToList();
                    Question question;
                    if (numQuestion < 15 && index == 0)
                    {
                        for (int i = numQuestion - 1; i >= 0; i--)
                        {
                            IfAdd = false;
                            if (UserClasses.ToList().Count() != 0)
                            {
                                question = db.Questions.ToArray()[i];
                                UserToClass studentAskQuestion = db.UserToClasses.ToList().FirstOrDefault(x => x.idUser == question.UserId);
                                UserClasses.ToList().ForEach(y => {
                                    if (studentAskQuestion.idClass == y.idClass)
                                    {
                                        ClassesQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(question));
                                        IfAdd = true;
                                    }
                                });
                                if (IfAdd == false)
                                    NoClassesQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(question));
                            }
                        }
                    }
                    else
                    {
                        if (numQuestion < 15 && index != 0)
                            return null;
                        for (int i = numQuestion - index - 1; (i >= numQuestion - index - 15 && i >= 0); i--)
                        {
                            IfAdd = false;
                            if (UserClasses.ToList().Count() != 0)
                            {
                                question = db.Questions.ToArray()[i];
                                UserClasses.ToList().ForEach(y => {
                                    UserToClass studentAskQuestion = db.UserToClasses.ToList().FirstOrDefault(x => x.idUser == question.UserId);
                                    if (studentAskQuestion.idClass == y.idClass)
                                    {
                                        ClassesQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(question));
                                        IfAdd = true;
                                    }

                                });
                                if (IfAdd == false)
                                    NoClassesQuestions.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(question));
                            }

                        }
                    }
                    listsByProffestion.FirstList = ClassesQuestions;
                    listsByProffestion.SecondList = NoClassesQuestions;
                    return listsByProffestion;
                }
            }
            catch (Exception)
            {
                return null;
            }

        }
        /// <summary>
        /// sort and filter questions list by gets parameters
        /// </summary>
        /// <param name="status">user status</param>
        /// <param name="idUser">user id</param>
        /// <param name="dataSort">paramater which tell us according to what sort the questions</param>
        /// <param name="ifNoAnswer">an arry which containing filters flag</param>
        /// <param name="numCallToQuestion">question index</param>
        /// <returns>
        /// return the sorted list and the lenght of this list
        /// </returns>
        public static QuestionsReturnDefalt Sort(string status, int idUser, string dataSort, bool ifNoAnswer, int numCallToQuestion)
        {
            int numQuestions = 0;
            List<UserQuestionDTO> AllfilterResult = new List<UserQuestionDTO>();
            QuestionsReturnDefalt filterResult = new QuestionsReturnDefalt();
            List<UserQuestionDTO> SortedLists = new List<UserQuestionDTO>();
            List<UserQuestionDTO> filterList = new List<UserQuestionDTO>();
            List<UserQuestionDTO> filterSortList = new List<UserQuestionDTO>();
            QuestionsReturnDefalt questionsReturnDefalt = new QuestionsReturnDefalt();
            SortLists sortLists = new SortLists();
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                if (ifNoAnswer == false)
                {
                    numQuestions = db.Questions.Count();
                }
                if (dataSort == "ByLanguage" || dataSort == "null")
                    sortLists = sortByLanguageUser(idUser, numCallToQuestion, status);
                if (dataSort == "ByYourClasses" || dataSort == "ByYourFriends")
                    sortLists = sortByUserClasses(idUser, numCallToQuestion, status);
                SortedLists = sortLists.FirstList.Concat(sortLists.SecondList).ToList();
                if (dataSort == "newsQuestion" || dataSort == "ByAsks")
                    SortedLists = getAllQuestionDefalt(numCallToQuestion).QuestionsDefalt.ToList();
                SortedLists.Reverse();
                if (ifNoAnswer == true)
                {
                    db.Questions.ToList().ForEach(x =>
                    {
                        if (x.Answers.Count() == 0)
                            AllfilterResult.Add(Convertion.QuestionConvertion.ConvertToUserQuestionDTO(x));
                    });
                    AllfilterResult.Reverse();
                    filterResult = GetNoAnswerQuestion(numCallToQuestion);
                    numQuestions = filterResult.NumQuestions;
                    filterList = filterResult.QuestionsDefalt;
                    SortedLists.ToList().ForEach(x =>
                    {
                        AllfilterResult.ToList().ForEach(y =>
                        {
                            if (x.QuestionId == y.QuestionId)
                                filterSortList.Add(x);
                        });
                    });
                    if (SortedLists.ToArray().Length == 0)
                        questionsReturnDefalt.QuestionsDefalt = filterList;
                    else questionsReturnDefalt.QuestionsDefalt = filterSortList;
                    questionsReturnDefalt.NumQuestions = numQuestions;
                    return questionsReturnDefalt;
                }
                questionsReturnDefalt.QuestionsDefalt = SortedLists;
                questionsReturnDefalt.NumQuestions = db.Questions.ToArray().Length;
                return questionsReturnDefalt;
            }
        }
        ///post a comment for question
        public static CommentQuestionDTO PostComment(CommentQuestionDTO comment)
        {
            bool flag = false;
            CommentsQuestion commentQ_A = new CommentsQuestion();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    flag = false;
                    db.CommentsQuestions.ToList().ForEach(c =>
                    {
                        if (c.IdQuestion == comment.IdQuestion)
                            if (c.UserId == comment.UserId)
                                flag = true;
                    });
                    if (flag == false)
                    {
                        commentQ_A = db.CommentsQuestions.Add(Convertion.CommentQuestionConvertion.ConvertToCommentQuestion(comment));
                        db.SaveChanges();
                        return Convertion.CommentQuestionConvertion.ConvertToCommentQ_ADTO(commentQ_A);
                    }
                    else return null;

                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        //get comment question by id
        public static List<CommentQuestionDTO> GetCommentQuestionById(int idQuestion)
        {
            List<CommentQuestionDTO> commentQuestion = new List<CommentQuestionDTO>();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    db.CommentsQuestions.ToList().ForEach(x =>
                    {
                        if (x.IdQuestion == idQuestion)
                            commentQuestion.Add(Convertion.CommentQuestionConvertion.ConvertToCommentQ_ADTO(x));
                    });
                    return commentQuestion;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
