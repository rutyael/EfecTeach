using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public class EmailService
    {
        //send email to user
        public static void SendMail(string email,UserDTO user)
        {
            var fromAddress = new MailAddress("rutichaim301@gmail.com", "EfecTeach");
            var toAddress = new MailAddress(email, "To User");
            const string fromPassword = "314664319";
            const string subject = "EfecTeach - איפוס סיסמא";
            const string body = "קוד האימות שלך הינו- 325$2%85 ";
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}

