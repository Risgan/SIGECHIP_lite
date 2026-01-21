using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sigechip.Core.Application.DTO.Mascota;
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
            var mascota = await _service.GetByIdAsync(id);
            if (mascota == null)
            {
                return NotFound();
            }
            return Ok(mascota);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(MascotaDto mascotaDto)
        {
            try
            {
                var mascota = new Mascota
                {
                    IdPropietario = mascotaDto.IdPropietario,
                    TipoDocumento = mascotaDto.TipoDocumento,
                    Documento = mascotaDto.Documento,
                    Nombre = mascotaDto.Nombre,
                    IdEspecie = mascotaDto.IdEspecie,
                    IdRaza = mascotaDto.IdRaza,
                    IdGenero = mascotaDto.IdGenero,
                    FechaNacimiento = mascotaDto.FechaNacimiento.ToUniversalTime(),
                    Peso = mascotaDto.Peso,
                    Foto = mascotaDto.Foto,
                    Descripcion = mascotaDto.Descripcion,
                    Activo = true,
                    FechaCreacion = DateTime.Now.ToUniversalTime(),
                    FechaActualizacion = DateTime.Now.ToUniversalTime()
                };

                await _service.AddAsync(mascota);
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }


        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, Mascota mascota)
        {
            try
            {
                await _service.UpdateAsync(id, mascota);
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }

        [HttpGet("consecutivo")]
        public async Task<IActionResult> GetConsecutivo()
        {
            var especies = await _service.GetAllAsync();
            return Ok(especies.Count() + 1);
        }

        [HttpGet("Propietario/{idPropietario}")]
        public async Task<IActionResult> GetByPropietarioId(int idPropietario)
        {
            var mascotas = await _service.GetAllByPropietarioId(idPropietario);

            return Ok(mascotas);
        }
    }
}
