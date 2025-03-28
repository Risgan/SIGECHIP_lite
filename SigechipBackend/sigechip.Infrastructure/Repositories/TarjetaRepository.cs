using Microsoft.EntityFrameworkCore;
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
    public class TarjetaRepository : GenericRepository<Tarjeta>, ITarjetaRepository
    {
        public TarjetaRepository(AplicationDbContext context) : base(context)
        {
        }

        public async Task<Tarjeta> GetByNumeroAsync(string numeroTarjeta)
        {
            return await _context.Tarjeta.FirstOrDefaultAsync(t => t.NumeroTarjeta == numeroTarjeta);
        }
    }
}
