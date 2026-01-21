using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace sigechip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarjetaController : BaseController
    {
        private readonly ITarjetaService _service;

        public TarjetaController(ITarjetaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //var tarjetas = await _service.GetAllAsync(e => e.Mascota);
            var tarjetas = await _service.GetAllAsync();
            return Ok(tarjetas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tarjeta = await _service.GetByIdAsync(id);
            //var tarjeta = await _service.GetByIdAsync(id, e => e.Mascota);
            if (tarjeta == null) return NotFound();
            return Ok(tarjeta);
        }

        [HttpGet("numero/{numeroTarjeta}")]
        public async Task<IActionResult> GetByNumero(string numeroTarjeta)
        {
            var tarjeta = await _service.GetByNumeroAsync(numeroTarjeta);
            
            if (tarjeta == null || tarjeta.Activo == false) { 
                return NotFound(); 
            }
            
            return Ok(tarjeta);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(Tarjeta tarjeta)
        {
            await _service.AddAsync(tarjeta);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, Tarjeta tarjeta)
        {
            var existingTarjeta = await _service.GetByIdAsync(id);
            if (existingTarjeta == null) return NotFound();

            existingTarjeta.NumeroTarjeta = tarjeta.NumeroTarjeta;
            existingTarjeta.IdMascota = tarjeta.IdMascota;
            existingTarjeta.Activo = tarjeta.Activo;

            await _service.UpdateAsync(id, existingTarjeta);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            //await _service.DeleteAsync(id);
            //return Ok();
            var existingTarjeta = await _service.GetByIdAsync(id);
            if (existingTarjeta == null) return NotFound();

            existingTarjeta.Activo = false;
            await _service.UpdateAsync(id, existingTarjeta);
            return Ok();
        }
    }
}
