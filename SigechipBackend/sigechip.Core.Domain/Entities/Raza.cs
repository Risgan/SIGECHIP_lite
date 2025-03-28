using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("raza")]
    public class Raza
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_especie")]
        [Required]
        public int IdEspecie { get; set; }

        [Column("raza")]
        [StringLength(250)]
        [Required]
        public string RazaNombre { get; set; }
    }
}
