using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.DTO.Mascota
{
    public class MascotaDto
    {
        public int IdPropietario { get; set; }
        public int TipoDocumento { get; set; }
        public int Documento { get; set; }
        public string Nombre { get; set; }
        public int IdEspecie { get; set; }
        public int IdRaza { get; set; }
        public int IdGenero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public decimal? Peso { get; set; }
        public string Foto { get; set; }
        public string Descripcion { get; set; }

    }
}
