using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sigechip.Core.Domain.Entities
{
    [Table("tarjeta")]
    public class Tarjeta
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("tarjeta")]
        public string NumeroTarjeta { get; set; }

        [Column("id_mascota")]
        public int IdMascota { get; set; }

        [Column("activo")]
        public bool? Activo { get; set; } = true;

    }
}
