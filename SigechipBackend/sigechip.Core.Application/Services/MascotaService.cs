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

        public MascotaService(IMascotaRepository repository) : base(repository)
        {
            _repository = repository;
        }
    }
}
