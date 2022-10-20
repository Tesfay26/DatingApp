using DatingApp.API.Model;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUser()
        {
            var UserData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(UserData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSlat;
                CreatePasswordHash("password", out passwordHash, out passwordSlat);
                user.PasswordHash = passwordHash;
                user.PasswordSlat = passwordSlat;
                user.UserName = user.UserName.ToLower();

                _context.Users.Add(user);
            }

            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] hashPassword, out byte[] saltPassword)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                saltPassword = hmac.Key;
                hashPassword = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}
