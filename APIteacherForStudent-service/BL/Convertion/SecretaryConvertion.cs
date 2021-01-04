using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;
namespace BL.Convertion
{
    public class SecretaryConvertion
    {
        public static SecretaryDTO ConvertToSecretaryDTO(Secretary secretary)
        {
                SecretaryDTO secretaryDTO = new SecretaryDTO();
                secretaryDTO.SecretaryId = secretary.SecretaryId;
                secretaryDTO.SecretaryMail = secretary.SecretaryMail;
                secretaryDTO.SecretaryName = secretary.SecretaryName;
                secretaryDTO.SecretaryPassword = secretary.SecretaryPassword;
            if (secretary.Schools.Count() != 0) 
                secretaryDTO.SchoolId=secretary.Schools.First().id;
                return secretaryDTO;
        }
        public static Secretary ConvertToSecretary(SecretaryDTO secretaryDTO)
        {
            Secretary secretary = new Secretary();
            secretary.SecretaryId = secretaryDTO.SecretaryId;
            secretary.SecretaryMail = secretaryDTO.SecretaryMail;
            secretary.SecretaryName = secretaryDTO.SecretaryName;
            secretary.SecretaryPassword = secretaryDTO.SecretaryPassword;
            return secretary;
        }
    }
}
