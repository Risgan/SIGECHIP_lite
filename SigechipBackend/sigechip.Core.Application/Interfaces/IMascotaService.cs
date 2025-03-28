using sigechip.Core.Application.DTO.Mascota;
using sigechip.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.Interfaces
{
    public interface IMascotaService : IGenericService<Mascota>
    {
        Task<IEnumerable<MascotaAllDto>> GetAllByPropietarioId(int propietarioId);
    }
}
