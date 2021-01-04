using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DTO;
namespace BL
{
    public class userService
    {
        //change login function
        public static UserDTO Login(string password, string name)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                User userf = new User();
                userf = db.Users.ToList().FirstOrDefault(x => x.UserName == name && x.UserPassword == password);
                if (userf != null)
                {
                    userf.Active = userf.UserToClasses.Where(c => c.approved == 2 || c.approved == 3).Count() > 0 ? 1 : 0;
                    if (userf.UserKind == "אחר")
                        userf.Active = 1;
                    UserDTO LoginUser = Convertion.userConvertion.ConvertToUserDto(userf);
                    LoginUser.NewData = SchoolService.GetNewData(LoginUser.UserId, LoginUser.LastEnteryDate);
                    userf.LastEnteryDate = DateTime.Now;
                    db.SaveChanges();
                    return LoginUser;
                }
                else return null;
            }

        }

        //login secretary
        public static SecretaryDTO LoginSecretary(string password, string name)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                Secretary secretary = new Secretary();
                secretary = db.Secretaries.ToList().FirstOrDefault(x => x.SecretaryPassword == password && x.SecretaryName == name);
                if (secretary == null)
                    return null;
                return Convertion.SecretaryConvertion.ConvertToSecretaryDTO(secretary);
            }
        }

        //get post user
        public static UserDTO GetPostUser(UserDTO userDto, ref string mass)
        {

            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                User user = new User();
                User IsExitsUserName = db.Users.ToList().FirstOrDefault(u => u.UserName == userDto.UserName);
                User IsExitsUserMail = db.Users.ToList().FirstOrDefault(u => u.UserMail == userDto.UserMail);
                if (IsExitsUserMail != null && IsExitsUserName != null)
                {
                    mass = "קיים שם משתמש וכתובת אמייל זהים במערכת, אנא הזן פרטים יחודיים";
                    return null;
                }
                if (IsExitsUserName != null)
                {
                    mass = "קיים שם משתמש זהה במערכת, אנא הקש שם משתמש יחודי";
                    return null;
                }
                if (IsExitsUserMail != null)
                {
                    mass = "קיימת כתובת אמייל זהה במערכת, אנא הקש כתובת אמייל יחודית";
                    return null;
                }
                user = db.Users.Add(Convertion.userConvertion.ConvertToUser(userDto));
                db.SaveChanges();
                return Convertion.userConvertion.ConvertToUserDto(user);
            }
        }

        //post secretary
        public static SecretaryDTO PostSecretary(SecretaryDTO secretaryDTO, ref string mass)
        {
            using (TeacherForStudentEntities db = new TeacherForStudentEntities())
            {
                Secretary secretary = new Secretary();
                Secretary IsExitsUserName = db.Secretaries.ToList().FirstOrDefault(u => u.SecretaryName == secretaryDTO.SecretaryName);
                Secretary IsExitsUserMail = db.Secretaries.ToList().FirstOrDefault(u => u.SecretaryMail == secretaryDTO.SecretaryMail);
                if (IsExitsUserMail != null && IsExitsUserName != null)
                {
                    mass = "קיים שם מזכיר וכתובת אמייל זהים במערכת, אנא הזן פרטים יחודיים";
                    return null;
                }
                if (IsExitsUserName != null)
                {
                    mass = "קיים שם מזכיר זהה במערכת, אנא הקש שם משתמש יחודי";
                    return null;
                }
                if (IsExitsUserMail != null)
                {
                    mass = "קיימת כתובת אמייל זהה במערכת, אנא הקש כתובת אמייל יחודית";
                    return null;
                }
                secretary = db.Secretaries.Add(Convertion.SecretaryConvertion.ConvertToSecretary(secretaryDTO));
                db.SaveChanges();
                return Convertion.SecretaryConvertion.ConvertToSecretaryDTO(secretary);

            }
        }

        //put user
        public static UserDTO PutUser(int id, UserDTO userdto)
        {
            try
            {

                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    ///////////האם משנה באמת
                    User user = db.Users.FirstOrDefault(u => u.UserId == id);
                    user.UserMail = userdto.UserMail;
                    db.SaveChanges();
                    return Convertion.userConvertion.ConvertToUserDto(user);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        //put password user
        public static bool PutPasswordUser(NewPasswordUser newPasswordUser)
        {
            User user = new User();
            try
            {
                using (TeacherForStudentEntities db = new TeacherForStudentEntities())
                {
                    user = db.Users.ToList().FirstOrDefault(x => x.UserName == newPasswordUser.UserName);
                    if (user != null)
                    {
                        user.UserPassword = newPasswordUser.UserPassword;
                        db.SaveChanges();
                        return true;
                    }
                    else return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
