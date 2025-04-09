using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using sigechip.Core.Application.DTO.Propietario;
using sigechip.Core.Application.Services;
using Microsoft.AspNetCore.Authorization;

namespace sigechip.API.Controllers
{
    public class PropietarioController : BaseController
    {
        private readonly IPropietarioService _service;
        private readonly ITipoDocumentoService _tipoDocumentoService;

        public PropietarioController(
                IPropietarioService service, 
                ITipoDocumentoService tipoDocumentoService
            )
        {
            _service = service;
            _tipoDocumentoService = tipoDocumentoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var especies = await _service.GetAllAsync(e => e.TipoDocumento);
            return Ok(especies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var especie = await _service.GetByIdAsync(id);
            return Ok(especie);
        }

        [HttpGet("includes/{id}")]
        public async Task<IActionResult> GetByIdIncludes(int id)
        {
            var especie = await _service.GetByIdAsync(id, e=> e.TipoDocumentoId);
            return Ok(especie);
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var especie = await _service.GetByEmailAsync(email);
            return Ok(especie);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(PropietarioDto propietario)
        {

            if (propietario.Password == null)
            {
                return BadRequest("contraseña no puede ser nula");
            }

            Propietario newPropietario = new Propietario()
            {
                Id = 0,
                TipoDocumentoId = propietario.TipoDocumentoId,
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
        [Authorize]
        public async Task<IActionResult> Update(int id, PropietarioUpdateDto propietario)
        {
            var propietarioUpdate = await _service.GetByIdAsync(id); // O como obtienes el propietario actual

            if (propietarioUpdate == null)
            {
                return NotFound(); // O cualquier otra respuesta que desees
            }

            // Actualizar los valores directamente
            propietarioUpdate.TipoDocumentoId = propietario.TipoDocumentoId;
            propietarioUpdate.Documento = propietario.Documento;
            propietarioUpdate.Nombre = propietario.Nombre;
            propietarioUpdate.Apellido = propietario.Apellido;
            propietarioUpdate.Celular = propietario.Celular;
            propietarioUpdate.Email = propietario.Email;
            propietarioUpdate.Password = propietario.Password == propietarioUpdate.Password ? propietario.Password : BCrypt.Net.BCrypt.HashPassword(propietario.Password);
            propietarioUpdate.Activo = propietario.Activo;

            // No necesitas actualizar TipoDocumento si solo es para lectura
            propietarioUpdate.TipoDocumento = await _tipoDocumentoService.GetByIdAsync(propietario.TipoDocumentoId);

            // Ahora solo haces el update sin necesidad de crear una nueva instancia
            await _service.UpdateAsync(id, propietarioUpdate);

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }
    }
}
