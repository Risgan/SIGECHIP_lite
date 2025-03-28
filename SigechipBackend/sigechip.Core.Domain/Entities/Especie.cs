using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("especie")]
    public class Especie
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("especie")]
        [StringLength(250)]
        [Required]
        public string EspecieNombre { get; set; }
    }
}
