using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using sigechip.Core.Application.DTO.Propietario;

namespace sigechip.API.Controllers
{
    public class PropietarioController : BaseController
    {
        private readonly IPropietarioService _service;

        public PropietarioController(IPropietarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var especies = await _service.GetAllAsync();
            return Ok(especies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var especie = await _service.GetByIdAsync(id);
            return Ok(especie);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PropietarioDto propietario)
        {

            if (propietario.Password == null)
            {
                return BadRequest("contraseña no puede ser nula");
            }

            Propietario newPropietario = new Propietario()
            {
                Id = 0,
                TipoDocumento = propietario.TipoDocumento,
                Documento = propietario.Documento,
                Nombre = propietario.Nombre,
                Apellido = propietario.Apellido,
                Celular = propietario.Celular,
                Email = propietario.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(propietario.Password),
                Activo = propietario.Activo,

            };

                await _service.AddAsync(newPropietario);
                return Ok();


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Propietario propietario)
        {
            await _service.UpdateAsync(id, propietario);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }
    }
}
