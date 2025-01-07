using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("propietario")]
    public class Propietario
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("tipo_documento")]
        public int TipoDocumento { get; set; }

        [Column("documento")]
        [Required]
        public long Documento { get; set; }

        [Column("nombre")]
        [StringLength(250)]
        [Required]
        public string Nombre { get; set; }

        [Column("apellido")]
        [StringLength(250)]
        [Required]
        public string Apellido { get; set; }

        [Column("celular")]
        [Required]
        public long Celular { get; set; }

        [Column("email")]
        [StringLength(250)]
        [Required]
        public string Email { get; set; }

        [Column("password")]
        [StringLength(250)]
        [Required]
        public string Password { get; set; }

        [Column("activo")]
        [Required]
        public bool Activo { get; set; } = true;
    }
}
