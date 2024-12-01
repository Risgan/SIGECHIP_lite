using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;

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
        public async Task<IActionResult> Create(Propietario propietario)
        {
            await _service.AddAsync(propietario);
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
