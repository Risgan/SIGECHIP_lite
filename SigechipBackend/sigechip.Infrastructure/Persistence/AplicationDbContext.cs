using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using sigechip.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Infrastructure.Persistence
{
    public class AplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {

        }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Especie> Especie { get; set; }
        public DbSet<Raza> Raza { get; set; }
        public DbSet<Mascota> Mascota { get; set; }
        public DbSet<Propietario> Propietario { get; set; }
        public DbSet<Genero> Genero { get; set; }
        public DbSet<TipoDocumento> TipoDocumento { get; set; }

    }
}
