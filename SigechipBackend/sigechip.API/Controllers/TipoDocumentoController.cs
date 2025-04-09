using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;

namespace sigechip.API.Controllers
{
    public class TipoDocumentoController : BaseController
    {
        private readonly ITipoDocumentoService _service;

        public TipoDocumentoController(ITipoDocumentoService service)
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
        [Authorize]
        public async Task<IActionResult> Create(TipoDocumento tipoDocumento)
        {
            await _service.AddAsync(tipoDocumento);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, TipoDocumento tipoDocumento)
        {
            await _service.UpdateAsync(id, tipoDocumento);
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
