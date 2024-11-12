using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("tipo_documento")]
    public class TipoDocumento
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        [StringLength(100)]
        [Required]
        public string Nombre { get; set; }

        [Column("sigla")]
        [StringLength(3)]
        [Required]
        public string Sigla { get; set; }
    }
}
