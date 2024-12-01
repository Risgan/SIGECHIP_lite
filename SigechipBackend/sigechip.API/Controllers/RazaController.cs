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
        public async Task<IActionResult> Create(Raza raza)
        {
            await _service.AddAsync(raza);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Raza raza)
        {
            await _service.UpdateAsync(id, raza);
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
