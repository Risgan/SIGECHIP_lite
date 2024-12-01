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
    public class EspecieService : GenericService<Especie>, IEspecieService
    {
        private readonly IEspecieRepository _repository;

        public EspecieService(IEspecieRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
