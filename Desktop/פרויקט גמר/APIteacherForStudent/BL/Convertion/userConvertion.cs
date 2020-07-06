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
        public static UserDTO ConvertToDto(User user)
        {
            try
            {
                UserDTO newUser = new UserDTO();
                newUser.UserId = user.UserId;
                newUser.UserKind = user.UserKind;
                newUser.UserMail = user.UserMail;
                newUser.UserName = user.UserName;
                newUser.UserPassword = user.UserPassword;
                return newUser;
            }
            catch (Exception)
            {
                return null;
            }

        }
        public static User ConvertToUser(UserDTO userdto)
        {
            User newUser = new User();
            newUser.UserId = userdto.UserId;
            newUser.UserKind = userdto.UserKind;
            newUser.UserMail = userdto.UserMail;
            newUser.UserName = userdto.UserName;
            newUser.UserPassword = userdto.UserPassword;
            return newUser;
        }
    }
}
