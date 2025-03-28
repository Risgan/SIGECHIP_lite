using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.Interfaces
{
    public interface IJwtTokenGeneratorService
    {
        string GenerateToken(string email);
    }
}
