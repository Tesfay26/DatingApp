using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> LogIn(string userName, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null)
                return null;
            if (!VarifayPasswordHash(password, user.PasswordSlat, user.PasswordHash))
                return null;

            return user;
        }

        private bool VarifayPasswordHash(string password, byte[] passwordSlat, byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSlat))
            {
               var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if(computeHash[i] != passwordHash[i])
                        return false; 
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] HashPassword, SaltPassword;
            CreatePasswordHash(password, out HashPassword, out SaltPassword);

            user.PasswordHash = HashPassword;
            user.PasswordSlat = SaltPassword;

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] hashPassword, out byte[] saltPassword)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                saltPassword = hmac.Key;
                hashPassword = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }

        public async Task<bool> UserExist(string userName)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == userName))
                return true;
            return false;
        }
    }
}