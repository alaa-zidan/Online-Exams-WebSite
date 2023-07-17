using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Quize.BAL.Services;
using Quize.DAL.Models;
using Quize.DAL.Models.DTO;
using QuizeApp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace JwtWebApiTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly Account account = new Account();

        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] SignUpDTO account)
        {
            
            CreatePasswordHash(account.password, out byte[] passwordHash, out byte[] passwordSalt);
            Users user = new Users()
            {
                Name = account.Name,
                Email = account.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                RoleId = 2,
                IsDeleted = false
            };
            _userService.Insert(user);
            return Ok(new { message = "Accout Created" });

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignDTO signViewModel)
        {

            var user = _userService.GetAll().FirstOrDefault(u => u.Email == signViewModel.email);
            if (user == null)
            {
                return BadRequest("Invalid username");
            }

            if (!VerifyPasswordHash(signViewModel.password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);
            SetToken();

            return Ok(new { accessToken = token });
        }

        private void SetToken()
        {
            //var refreshToken = new RefreshToken
            //{
            //    Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            //    Expires = DateTime.Now.AddDays(7),
            //    Created = DateTime.Now
            //};
            /////////////////////////
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(7),
            };
            Response.Cookies.Append("refreshToken", Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)), cookieOptions);


        }

        private string CreateToken(Users user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.role.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }


    }
}
