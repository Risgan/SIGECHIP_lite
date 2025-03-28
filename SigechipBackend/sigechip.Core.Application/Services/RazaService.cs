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
    public class RazaService : GenericService<Raza>, IRazaService
    {
        private readonly IRazaRepository _repository;

        public RazaService(IRazaRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
