using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("mascota")]
    public class Mascota
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_propietario")]
        public int IdPropietario { get; set; }

        [Column("tipo_documento")]
        public int TipoDocumento { get; set; }

        [Column("documento")]
        [Required]
        public int Documento { get; set; }

        [Column("nombre")]
        [Required]
        public string Nombre { get; set; }

        [Column("id_especie")]
        public int IdEspecie { get; set; }

        [Column("id_raza")]
        public int IdRaza { get; set; }

        [Column("id_genero")]
        public int IdGenero { get; set; }

        [Column("fecha_nacimiento")]
        [Required]
        public DateTime FechaNacimiento { get; set; }

        [Column("peso")]
        public decimal? Peso { get; set; }

        [Column("foto")]
        public string Foto { get; set; }

        [Column("descripcion")]
        public string Descripcion { get; set; }

        [Column("activo")]
        [Required]
        public bool Activo { get; set; } = true;

        [Column("fecha_creacion")]
        [Required]
        public DateTime FechaCreacion { get; set; }

        [Column("fecha_actualizacion")]
        [Required]
        public DateTime FechaActualizacion { get; set; }
    }
}
