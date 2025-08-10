CREATE TABLE "mascota" (
  "id" Serial PRIMARY KEY NOT NULL,
  "id_propietario" int NOT NULL,
  "tipo_documento" int NOT NULL,
  "documento" int UNIQUE NOT NULL,
  "nombre" varchar(250) NOT NULL,
  "id_especie" int NOT NULL,
  "id_raza" int NOT NULL,
  "id_genero" int NOT NULL,
  "fecha_nacimiento" date NOT NULL,
  "peso" numeric,
  "foto" varchar,
  "descripcion" varchar,
  "activo" bit NOT NULL DEFAULT true,
  "fecha_creacion" date NOT NULL,
  "fecha_actualizacion" date NOT NULL
);

CREATE TABLE "propietario" (
  "id" Serial PRIMARY KEY NOT NULL,
  "tipo_documento_id" int NOT NULL,
  "documento" int UNIQUE NOT NULL,
  "nombre" varchar(250) NOT NULL,
  "apellido" varchar(250) NOT NULL,
  "celular" int NOT NULL,
  "email" varchar(250) NOT NULL,
  "password" varchar(250) NOT NULL,
  "activo" bit
);

CREATE TABLE "tipo_documento" (
  "id" Serial PRIMARY KEY NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "sigla" varchar(3) NOT NULL
);

CREATE TABLE "genero" (
  "id" Serial PRIMARY KEY NOT NULL,
  "genero" varchar(100)
);

CREATE TABLE "especie" (
  "id" Serial PRIMARY KEY NOT NULL,
  "especie" varchar(250) NOT NULL
);

CREATE TABLE "raza" (
  "id" Serial PRIMARY KEY NOT NULL,
  "id_especie" int NOT NULL,
  "raza" varchar(250) NOT NULL
);

CREATE TABLE "tarjeta" (
  "id" Serial PRIMARY KEY NOT NULL,
  "tarjeta" varchar(250) NOT NULL,
  "id_mascota" int NOT NULL,
  "activo" boolean
);

ALTER TABLE "raza" ADD FOREIGN KEY ("id_especie") REFERENCES "especie" ("id");

ALTER TABLE "tarjeta" ADD FOREIGN KEY ("id_mascota") REFERENCES "mascota" ("id");

ALTER TABLE "mascota" ADD FOREIGN KEY ("id_propietario") REFERENCES "propietario" ("id");

ALTER TABLE "mascota" ADD FOREIGN KEY ("id_especie") REFERENCES "especie" ("id");

ALTER TABLE "mascota" ADD FOREIGN KEY ("tipo_documento") REFERENCES "tipo_documento" ("id");

ALTER TABLE "propietario" ADD FOREIGN KEY ("tipo_documento_id") REFERENCES "tipo_documento" ("id");

ALTER TABLE "mascota" ADD FOREIGN KEY ("id_genero") REFERENCES "genero" ("id");

ALTER TABLE "mascota" ADD FOREIGN KEY ("id_raza") REFERENCES "raza" ("id");
