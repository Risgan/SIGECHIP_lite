using sigechip.Core.Domain.Entities;
using sigechip.Core.Domain.Interfaces;
using sigechip.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Infrastructure.Repositories
{
    public class EspecieRepository : GenericRepository<Especie>, IEspecieRepository
    {
        public EspecieRepository(AplicationDbContext context) : base(context)
        {
            
        }
    }
}
