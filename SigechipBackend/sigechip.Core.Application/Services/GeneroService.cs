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
    public class GeneroService : GenericService<Genero>, IGeneroService
    {
        private readonly IGeneroRepository _repository;

        public GeneroService(IGeneroRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }    
}
