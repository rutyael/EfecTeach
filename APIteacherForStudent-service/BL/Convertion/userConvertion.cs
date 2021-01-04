using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL.Convertion
{
    public class userConvertion
    {
        public static UserDTO ConvertToUserDto(User user)
        {
            UserDTO newUser = new UserDTO();
            newUser.UserId = user.UserId;
            newUser.UserKind = user.UserKind;
            newUser.UserMail = user.UserMail;
            newUser.UserName = user.UserName;
            newUser.UserPassword = user.UserPassword;
            newUser.Active = user.Active;
            newUser.LoginDate = user.LoginDate;
            newUser.LastEnteryDate = user.LastEnteryDate;
            return newUser;
        }
        public static User ConvertToUser(UserDTO userdto)
        {
            User newUser = new User();
            newUser.UserId = userdto.UserId;
            newUser.UserKind = userdto.UserKind;
            newUser.UserMail = userdto.UserMail;
            newUser.UserName = userdto.UserName;
            newUser.UserPassword = userdto.UserPassword;
            newUser.Active = userdto.Active;
            newUser.LastEnteryDate = DateTime.Today;
            return newUser;
        }

    }
}
