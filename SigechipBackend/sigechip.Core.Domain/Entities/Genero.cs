using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sigechip.Core.Domain.Entities
{
    [Table("genero")]
    public class Genero
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("genero")]
        [StringLength(100)]
        public string GeneroNombre { get; set; }
    }
}
