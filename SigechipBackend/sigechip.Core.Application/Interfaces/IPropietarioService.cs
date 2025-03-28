﻿using sigechip.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.Interfaces
{
    public interface IPropietarioService : IGenericService<Propietario>
    {
        Task<Propietario> GetByEmailAsync(string email);
    }
}
