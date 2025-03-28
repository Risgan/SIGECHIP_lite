﻿using Microsoft.EntityFrameworkCore;
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
    public class PropietarioRepository : GenericRepository<Propietario>, IPropietarioRepository
    {
        public PropietarioRepository(AplicationDbContext context) : base(context)
        {

        }

        public async Task<Propietario> GetByEmailAsync(string email)
        {
            var propietarios = await _context.Propietario.Include(e => e.TipoDocumento).ToListAsync();
            return propietarios.FirstOrDefault(data=> data.Email == email);
        }
    }
}
