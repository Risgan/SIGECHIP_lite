CREATE TABLE mascota (
  id Serial PRIMARY KEY NOT NULL,
  id_propietario int NOT NULL,
  tipo_documento int NOT NULL,
  documento int UNIQUE NOT NULL,
  nombre character varying(250) NOT NULL,
  id_especie int NOT NULL,
  id_raza int NOT NULL,
  id_genero int NOT NULL,
  fecha_nacimiento date NOT NULL,
  peso numeric,
  foto character varying,
  descripcion character varying,
  activo boolean NOT NULL DEFAULT true,
  fecha_creacion date NOT NULL,
  fecha_actualizacion date NOT NULL
);

CREATE TABLE propietario (
  id Serial NOT NULL,
  tipo_documento int NOT NULL,
  documento int UNIQUE NOT NULL,
  nombre character varying(250) NOT NULL,
  apellido character varying(250) NOT NULL,
  celular int NOT NULL,
  email character varying(250) NOT NULL,
  activo boolean NOT NULL DEFAULT true
);

CREATE TABLE tipo_documento (
  id Serial NOT NULL,
  nombre character varying(100) NOT NULL,
  sigla character varying(3) NOT NULL
);

CREATE TABLE genero (
  id Serial NOT NULL,
  genero character varying(100)
);

CREATE TABLE especie (
  id Serial NOT NULL,
  especie character varying(250) NOT NULL
);

CREATE TABLE raza (
  id Serial NOT NULL,
  raza character varying(250) NOT NULL
);

ALTER TABLE mascota ADD FOREIGN KEY (id_propietario) REFERENCES propietario (id);

ALTER TABLE mascota ADD FOREIGN KEY (id_especie) REFERENCES especie (id);

ALTER TABLE mascota ADD FOREIGN KEY (tipo_documento) REFERENCES tipo_documento (id);

ALTER TABLE propietario ADD FOREIGN KEY (tipo_documento) REFERENCES tipo_documento (id);

ALTER TABLE mascota ADD FOREIGN KEY (id_genero) REFERENCES genero (id);
