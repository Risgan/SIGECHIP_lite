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
    public class TarjetaService : GenericService<Tarjeta>, ITarjetaService
    {
        private readonly ITarjetaRepository _repository;

        public TarjetaService(ITarjetaRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<Tarjeta> GetByNumeroAsync(string numeroTarjeta)
        {
            return await _repository.GetByNumeroAsync(numeroTarjeta);
        }
    }
}
