﻿using sigechip.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Interfaces
{
    public interface ITarjetaRepository : IGenericRepository<Tarjeta>
    {
        Task<Tarjeta> GetByNumeroAsync(string numeroTarjeta);
    }
}