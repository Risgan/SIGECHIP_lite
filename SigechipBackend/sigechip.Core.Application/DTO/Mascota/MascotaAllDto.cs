using sigechip.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Application.DTO.Mascota
{
    public class MascotaAllDto
    {
        public int Id { get; set; }
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
        public bool Activo { get; set; }


        public virtual Raza Raza { get; set; }
        public virtual Genero Genero { get; set; }
        public virtual Especie Especie { get; set; }

    }
}
