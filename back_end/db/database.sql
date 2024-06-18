-- Crear base de datos
CREATE DATABASE IF NOT EXISTS feria;
USE feria;
-- CORRER NUEVA DATABASE DESDE AQUI
CREATE TABLE instituciones (
instituciones_id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre varchar(200) NOT NULL,
email varchar(200) NOT NULL,
institucion varchar(200) NOT NULL,
telefono varchar(50) NOT NULL,
resena varchar(280) NOT NULL,
telefonowp varchar(50) NOT NULL,
ubicacion varchar(280) NOT NULL
);

CREATE TABLE cuenta (
cuenta_id bigint NOT NULL AUTO_INCREMENT,
cuenta varchar(200) NOT NULL,
pwd varchar(200) NOT NULL,
superusuario int NOT NULL,
email varchar(200) NOT NULL,
CONSTRAINT cuenta_pk PRIMARY KEY (cuenta_id)
);

-- Table: charlas
CREATE TABLE charlas (
charlas_id bigint NOT NULL AUTO_INCREMENT,
nombrecharla varchar(250) NOT NULL,
link varchar(500) NOT NULL,
fechaInicio timestamp NOT NULL,
fechaFina timestamp NOT NULL,
Cupos_charla int NOT NULL,
Color varchar(250) not null,
instituciones_instituciones_id bigint NOT NULL,
CONSTRAINT charlas_pk PRIMARY KEY (charlas_id)
);

CREATE TABLE Charla_tiene_estudiantes (
estudcha_id bigint NOT NULL AUTO_INCREMENT,
flag int NOT NULL,
cuenta_cuenta_id bigint NOT NULL,
charlas_charlas_id bigint NOT NULL,
CONSTRAINT Charla_tiene_estudiantes_pk PRIMARY KEY (estudcha_id)
);

-- Table: Charla_tiene_links
CREATE TABLE Charla_tiene_links (
linkcha_id bigint NOT NULL AUTO_INCREMENT,
llave varchar(280) not null,
url varchar(280) NOT NULL,
charlas_charlas_id bigint NOT NULL,
CONSTRAINT Charla_tiene_links_pk PRIMARY KEY (linkcha_id)
);
-- Table: Institucion_tiene_links
CREATE TABLE Institucion_tiene_links (
linkin bigint NOT NULL AUTO_INCREMENT,
llave varchar(280) not null,
url varchar(280) NOT NULL,
instituciones_instituciones_id bigint NOT NULL,
CONSTRAINT Institucion_tiene_links_pk PRIMARY KEY (linkin)
);

-- Table: instituciones_tiene_imagenes
CREATE TABLE instituciones_tiene_imagenes (
imagenin_id bigint NOT NULL AUTO_INCREMENT,
url varchar(255) NOT NULL,
instituciones_instituciones_id bigint NOT NULL,
CONSTRAINT instituciones_tiene_imagenes_pk PRIMARY KEY (imagenin_id)
);

select * from instituciones_tiene_imagenes;

DROP TABLE INSTITUCIONES_TIENE_IMAGENES;
-- Table: instituciones_tiene_videos
CREATE TABLE instituciones_tiene_videos (
videoin_id bigint NOT NULL AUTO_INCREMENT,
url varchar(255) NOT NULL,
instituciones_instituciones_id bigint NOT NULL,
CONSTRAINT instituciones_tiene_videos_pk PRIMARY KEY (videoin_id)
);

CREATE TABLE IF NOT EXISTS CHARLA_NOTIFICACION_ESTUDIANTES(
notiestu_id bigint not null auto_increment primary key,
flag int not null,
estudcha_id bigint not null,
constraint fk_estudiantescharlanotificacion foreign key (estudcha_id)
REFERENCES Charla_tiene_estudiantes(estudcha_id) on delete cascade);




-- Reference: Charla_tiene_estudiantes_charlas (table: Charla_tiene_estudiantes)
ALTER TABLE Charla_tiene_estudiantes ADD CONSTRAINT Charla_tiene_estudiantes_charlas FOREIGN KEY Charla_tiene_estudiantes_charlas (charlas_charlas_id)
REFERENCES charlas (charlas_id) ON DELETE CASCADE;

-- Reference: Charla_tiene_estudiantes_cuenta (table: Charla_tiene_estudiantes)
ALTER TABLE Charla_tiene_estudiantes ADD CONSTRAINT Charla_tiene_estudiantes_cuenta FOREIGN KEY Charla_tiene_estudiantes_cuenta (cuenta_cuenta_id)
REFERENCES cuenta (cuenta_id) ON DELETE CASCADE;

-- Reference: Charla_tiene_links_charlas (table: Charla_tiene_links)
ALTER TABLE Charla_tiene_links ADD CONSTRAINT Charla_tiene_links_charlas FOREIGN KEY Charla_tiene_links_charlas (charlas_charlas_id)
REFERENCES charlas (charlas_id) ON DELETE CASCADE;

-- Reference: Feria_tiene_charlas_instituciones (table: charlas)
ALTER TABLE charlas ADD CONSTRAINT Feria_tiene_charlas_instituciones FOREIGN KEY Feria_tiene_charlas_instituciones (instituciones_instituciones_id)
REFERENCES instituciones (instituciones_id) ON DELETE CASCADE;

-- Reference: Institucion_tiene_links_instituciones (table: Institucion_tiene_links)
ALTER TABLE Institucion_tiene_links ADD CONSTRAINT Institucion_tiene_links_instituciones FOREIGN KEY Institucion_tiene_links_instituciones (instituciones_instituciones_id)
REFERENCES instituciones (instituciones_id) ON DELETE CASCADE;

-- Reference: instituciones_tiene_imagenes_instituciones (table: instituciones_tiene_imagenes)
ALTER TABLE instituciones_tiene_imagenes ADD CONSTRAINT instituciones_tiene_imagenes_instituciones FOREIGN KEY instituciones_tiene_imagenes_instituciones (instituciones_instituciones_id)
REFERENCES instituciones (instituciones_id) ON DELETE CASCADE;

-- Reference: instituciones_tiene_videos_instituciones (table: instituciones_tiene_videos)
ALTER TABLE instituciones_tiene_videos ADD CONSTRAINT instituciones_tiene_videos_instituciones FOREIGN KEY instituciones_tiene_videos_instituciones (instituciones_instituciones_id)
REFERENCES instituciones (instituciones_id) ON DELETE CASCADE;

-- Insertar datos en tablas
INSERT INTO instituciones (nombre, email, institucion, telefono, resena, telefonowp, ubicacion, sector_sector_id) VALUES
  ('Banco BISA', 'contacto@bisa.com', 'Bancaria', '22256584', 'Banco BISA, siempre contigo.', '+591 7554654', 'Av Libertador #1233', 1),
  ('Banco Mercantil Santa Cruz', 'info@mercantilsantacruz.com', 'Bancaria', '22256546', 'El mejor banco de Bolivia.', '+591 7235640', 'Av Simon Bolivar #2222', 1),
  ('TOYOTA', 'contacto@toyota.com', 'Automotriz', '2123132', 'Toyota, siempre adelante.', '+591 73024872', 'Av Wallace #3333', 2);

INSERT INTO instituciones_tiene_imagenes (url, instituciones_instituciones_id) VALUES
  ('https://brandemia.org/sites/default/files/inline/images/bnb_logo_portada.jpg', 1),
  ('https://www.mercantilsantacruz.com/logo.png', 2),
  ('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/2048px-Toyota_carlogo.svg.png', 3);

INSERT INTO instituciones_tiene_videos (url, instituciones_instituciones_id) VALUES
  ('https://www.youtube.com/watch?v=abcd1234', 1),
  ('https://www.youtube.com/watch?v=efgh5678', 2),
  ('https://www.youtube.com/watch?v=ijkl9101', 3);

INSERT INTO Institucion_tiene_links (llave, url, instituciones_instituciones_id) VALUES
  ('website', 'https://www.bisa.com', 1),
  ('facebook', 'https://www.facebook.com/bancobisa', 1),
  ('website', 'https://www.mercantilsantacruz.com', 2),
  ('linkedin', 'https://www.linkedin.com/company/mercantil-santa-cruz', 2),
  ('website', 'https://www.toyota.com', 3),
  ('youtube', 'https://www.youtube.com/user/Toyota', 3);

INSERT INTO charlas (nombrecharla, link, fechaInicio, fechaFina, Cupos_charla, Color, instituciones_instituciones_id) VALUES
  ('Innovación Financiera', 'https://zoom.us/j/123123123', '2023-05-06 17:00:00', '2023-05-06 18:00:00', 256, '#ff0000', 1),
  ('Nuevas Tecnologías en Banca', 'https://zoom.us/j/456456456', '2023-05-06 18:00:00', '2023-05-06 19:00:00', 256, '#00ff00', 2),
  ('Tendencias en la Industria Automotriz', 'https://zoom.us/j/789789789', '2023-05-06 19:50:00', '2023-05-06 20:00:00', 256, '#0000ff', 3),
  ('Sostenibilidad y Futuro', 'https://zoom.us/j/101010101', '2023-05-07 16:00:00', '2023-05-07 18:00:00', 256, '#ffff00', 1),
  ('Innovación en Automotriz', 'https://zoom.us/j/111111111', '2023-05-07 18:00:00', '2023-05-07 20:00:00', 256, '#ff00ff', 3);

-- Insertar cuentas de prueba
INSERT INTO cuenta (cuenta, pwd, superusuario, email) VALUES
  ('admin', 'admin123', 1, 'admin@feria.com'),
  ('usuario1', 'user123', 0, 'user1@feria.com'),
  ('usuario2', 'user456', 0, 'user2@feria.com');

-- Insertar estudiantes en charlas
INSERT INTO Charla_tiene_estudiantes (flag, cuenta_cuenta_id, charlas_charlas_id) VALUES
  (1, 2, 1),
  (1, 3, 2);