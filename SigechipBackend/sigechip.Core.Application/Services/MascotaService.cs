using sigechip.Core.Application.DTO.Mascota;
using sigechip.Core.Application.Interfaces;
using sigechip.Core.Domain.Entities;
using sigechip.Core.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.Services
{
    public class MascotaService : GenericService<Mascota>, IMascotaService
    {
        private readonly IMascotaRepository _repository;
        private readonly IRazaService _razaService;
        private readonly IEspecieService _especieService;
        private readonly IGeneroService _generoService;

        public MascotaService(
            IMascotaRepository repository,
            IRazaService razaService,
            IEspecieService especieService,
            IGeneroService generoService
            ) : base(repository)
        {
            _repository = repository;
            _razaService = razaService;
            _especieService = especieService;
            _generoService = generoService;
        }

        public async Task<IEnumerable<MascotaAllDto>> GetAllByPropietarioId(int idPropietario)
        {
            try
            {
                var mascotas = await _repository.GetAll();

                var razaList = await _razaService.GetAllAsync();
                var generoList = await _generoService.GetAllAsync();
                var especieList = await _especieService.GetAllAsync();

                //mascotas = mascotas.Where(m => m.IdPropietario == idPropietario && m.Activo == true);

                // Mapear las entidades a DTO
                var result = mascotas
                    .Where(m => m.IdPropietario == idPropietario && m.Activo == true)
                    .Select(async m => new MascotaAllDto
                    {
                        Id = m.Id,
                        IdPropietario = m.IdPropietario,
                        TipoDocumento = m.TipoDocumento,
                        Documento = m.Documento,
                        Nombre = m.Nombre,
                        IdEspecie = m.IdEspecie,
                        IdRaza = m.IdRaza,
                        IdGenero = m.IdGenero,
                        FechaNacimiento = m.FechaNacimiento,
                        Peso = m.Peso,
                        Foto = m.Foto,
                        Descripcion = m.Descripcion,
                        Raza = razaList.FirstOrDefault(x => x.Id == m.IdRaza),
                        Genero = generoList.FirstOrDefault(x => x.Id == m.IdGenero),
                        Especie = especieList.FirstOrDefault(x => x.Id == m.IdEspecie),
                        Activo = m.Activo
                    });

                // Esperar todas las tareas y convertir el resultado en una lista
                //var result = await Task.WhenAll(tasks);

                var response = await Task.WhenAll(result);


                return response;


            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }

        //    public async Task<IEnumerable<MascotaAllDto>> GetAllByPropietarioId(int idPropietario)
        //    {
        //        try
        //        {
        //            var mascotas = await _repository.GetAll();

        //            var mascotasFiltradas = mascotas.Where(m => m.IdPropietario == idPropietario && m.Activo).ToList();

        //            var razasIds = mascotasFiltradas.Select(m => m.IdRaza).Distinct();
        //            var generosIds = mascotasFiltradas.Select(m => m.IdGenero).Distinct();
        //            var especiesIds = mascotasFiltradas.Select(m => m.IdEspecie).Distinct();

        //            var razasDict = (await Task.WhenAll(razasIds.Select(id => _razaService.GetByIdAsync(id))))
        //                                        .ToDictionary(r => r.Id);
        //            var generosDict = (await Task.WhenAll(generosIds.Select(id => _generoService.GetByIdAsync(id))))
        //                                        .ToDictionary(g => g.Id);
        //            var especiesDict = (await Task.WhenAll(especiesIds.Select(id => _especieService.GetByIdAsync(id))))
        //                                        .ToDictionary(e => e.Id);

        //            var result = mascotasFiltradas.Select(m => new MascotaAllDto
        //            {
        //                Id = m.Id,
        //                IdPropietario = m.IdPropietario,
        //                TipoDocumento = m.TipoDocumento,
        //                Documento = m.Documento,
        //                Nombre = m.Nombre,
        //                IdEspecie = m.IdEspecie,
        //                IdRaza = m.IdRaza,
        //                IdGenero = m.IdGenero,
        //                FechaNacimiento = m.FechaNacimiento,
        //                Peso = m.Peso,
        //                Foto = m.Foto,
        //                Descripcion = m.Descripcion,
        //                Raza = razasDict.ContainsKey(m.IdRaza) ? razasDict[m.IdRaza] : null,
        //                Genero = generosDict.ContainsKey(m.IdGenero) ? generosDict[m.IdGenero] : null,
        //                Especie = especiesDict.ContainsKey(m.IdEspecie) ? especiesDict[m.IdEspecie] : null,
        //                Activo = m.Activo
        //            });

        //            return result;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw;
        //        }
        //    }

        //}
    }
