using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.DTO.Propietario
{
    public class PropietarioDto
    {
        public int TipoDocumento { get; set; }
        public long Documento { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public long Celular { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Activo { get; set; }
    }
}
