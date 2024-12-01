using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;

namespace sigechip.API.Controllers
{
    public class MascotaController : BaseController
    {
        private readonly IMascotaService _service;

        public MascotaController(IMascotaService service)
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
        public async Task<IActionResult> Create(Mascota mascota)
        {
            await _service.AddAsync(mascota);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Mascota mascota)
        {
            await _service.UpdateAsync(id, mascota);
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
