using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sigechip.Core.Application.DTO.Auth;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Application.Services;
using sigechip.Infrastructure.Persistence;

namespace sigechip.API.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IJwtTokenGeneratorService _jwtTokenGenerator;
        private readonly IPropietarioService _propietarioService;
        private readonly HttpClient _httpClient;

        public AuthController(
            IJwtTokenGeneratorService jwtTokenGenerator, 
            AplicationDbContext dbContext, 
            IPropietarioService propietarioService)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _httpClient = new HttpClient();
            _propietarioService = propietarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest user)
        {
            
            var propietario = await _propietarioService.GetByEmailAsync(user.Email);

            if (propietario == null)
            {
                return Unauthorized("Invalid email or password.");
            }


            var isValidPassword = BCrypt.Net.BCrypt.Verify(user.Password, propietario.Password);

            if (!isValidPassword)
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = _jwtTokenGenerator.GenerateToken(propietario.Email);

            return Ok(new { Token = token });
        }
    }
}
