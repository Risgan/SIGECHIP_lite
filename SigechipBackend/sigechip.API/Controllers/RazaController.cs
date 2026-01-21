using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;

namespace sigechip.API.Controllers
{
    public class RazaController : BaseController
    {
        private readonly IRazaService _service;

        public RazaController(IRazaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var razas = await _service.GetAllAsync();
            return Ok(razas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var raza = await _service.GetByIdAsync(id);
            return Ok(raza);
        }

        [HttpGet("Especie/{idEspecie}")]
        public async Task<IActionResult> GetByEspecieId(int idEspecie)
        {
            var razas = await _service.GetAllAsync();
            return Ok(razas.Where(value => value.IdEspecie == idEspecie));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(Raza raza)
        {
            await _service.AddAsync(raza);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, Raza raza)
        {
            await _service.UpdateAsync(id, raza);
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
