USE feria;
CREATE DATABASE IF NOT EXISTS feria;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a, charlas b, charla_tiene_estudiantes c
where a.instituciones_id = b.instituciones_instituciones_id and b.charlas_id = c.charlas_charlas_id
group by b.charlas_id;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a
left join charlas b on a.instituciones_id = b.instituciones_instituciones_id
left join charla_tiene_estudiantes c on b.charlas_id = c.charlas_charlas_id
group by b.charlas_id;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
from instituciones a
right join charlas b on a.instituciones_id = b.instituciones_instituciones_id
left join charla_tiene_estudiantes c on b.charlas_id = c.charlas_charlas_id
where b.instituciones_instituciones_id = 7
group by b.charlas_id;

select * from instituciones;

select * from charlas;
select * from charla_tiene_estudiantes;

SELECT a.charlas_id, a.nombrecharla, b.flag
from charlas a, charla_tiene_estudiantes b
where a.charlas_id = b.charlas_charlas_id and b.flag= 1;

SELECT instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion,
GROUP_CONCAT(DISTINCT l.llave) AS links_llaves,
GROUP_CONCAT(DISTINCT l.url) AS links_redes,
GROUP_CONCAT(DISTINCT m.url) AS links_img,
GROUP_CONCAT(DISTINCT v.url) AS links_videos
FROM instituciones a
LEFT JOIN Institucion_tiene_links l ON a.INSTITUCIONES_ID = l.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes m ON m.instituciones_instituciones_id = a.INSTITUCIONES_ID
LEFT JOIN instituciones_tiene_videos v ON v.instituciones_instituciones_id = a.INSTITUCIONES_ID
GROUP BY a.INSTITUCIONES_ID;

SELECT * FROM INSTITUCIONES A LEFT JOIN Institucion_tiene_links B ON A.instituciones_id = B.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes C ON A.instituciones_id = C.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_videos D ON A.instituciones_id = D.instituciones_instituciones_id;

SELECT MainTable.main_key, GROUP_CONCAT(SecondaryTable.attribute) AS attribute_list
FROM MainTable
JOIN SecondaryTable ON MainTable.secondary_key = SecondaryTable.secondary_key
GROUP BY MainTable.main_key;

SELECT INSTITUCIONES_ID, GROUP_CONCAT(b.url) AS attribute_list
FROM INSTITUCIONES A
JOIN instituciones_tiene_imagenes B ON A.INSTITUCIONES_ID = B.instituciones_instituciones_id
GROUP BY A.INSTITUCIONES_ID;

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

INSERT INTO instituciones values
(4, 'Banco BISA', 'bancobisa@gmail.com','bancaria','22256584','Banco bisa siempre tuyo','+591 7554654','Av Libertador #1233'),
(5, 'Banco Mercantil SantaCruz', 'bancobisa@gmail.com','bancaria','22256546','Besto banco','+591 7235640','Av Simon bolivar #2222'),
(6, 'TOYOTA', 'toyosa@gmail.com','autos','2123132','RUN RUN FRANCHESCO','+591 73024872','Av Wallace #3333');

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
select * from cuenta;
SELECT * FROM CHARLAS WHERE INSTITUCIONES_INSTITUCIONES_ID = 4;

SELECT * FROM CHARLAS;
select * from Charla_tiene_estudiantes;

select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, c.estudcha_id
from instituciones a, charlas b, charla_tiene_estudiantes c
where a.instituciones_id = b.instituciones_instituciones_id and
b.charlas_id = c.charlas_charlas_id and
c.cuenta_cuenta_id = 1;

DELETE FROM charla_tiene_estudiantes WHERE estudcha_id = 12;
SELECT * FROM charla_tiene_estudiantes;
TRUNCATE TABLE CHARLAS;
desc charlas;
select now();

-- tables
-- Table: Charla_tiene_estudiantes
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

DESC institucion_tiene_links;
SELECT * FROM institucion_tiene_links;

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

DESC CHARLA_NOTIFICACION_ESTUDIANTES;

SELECT * FROM INSTITUCIONES_TIENE_VIDEOS;

-- foreign keys
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

-- DATOS PARA LLENAR TABLAS

INSERT INTO instituciones_tiene_imagenes values
(1,'url img 1',1),
(2,'url img 2',2),
(3,'url img 3',2),
(4,'url img 4',2),
(5,'url img 5',3),
(6,'url img 6',3);

INSERT INTO instituciones_tiene_videos values
(1,'video link 1',1),
(2,'video link 2',2),
(3,'video link 3',2),
(4,'video link 4',2),
(5,'video link 5',3),
(6,'video link 6',3);
INSERT INTO Institucion_tiene_links values
(1,'url link 1',1),
(2,'url link 2',2),
(3,'url link 3',2),
(4,'url link 4',2),
(5,'url link 5',3),
(6,'url link 6',3);
INSERT INTO charlas values
(1,'charla1', 'link zoom 123123qwe','2023-05-6 17:00:00','2023-05-6 18:00:00',256,256,1),
(2,'charla2', 'link zoom 123123qwe','2023-05-6 18:00:00','2023-05-6 19:00:00',256,256,2),
(3,'charla3', 'link zoom 123123qwe','2023-05-6 19:50:00','2023-05-6 20:00:00',256,256,2),
(4,'charla4', 'link zoom 123123qwe','2023-05-7 16:00:00','2023-05-7 18:00:00',256,256,3),
(5,'charla5', 'link zoom 123123qwe','2023-05-7 18:00:00','2023-05-7 20:00:00',256,256,3);

-- QUERY MAESTRO TARJETAS

SELECT instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion,
GROUP_CONCAT(DISTINCT l.llave ORDER BY l.llave ASC) AS links_llaves,
GROUP_CONCAT(DISTINCT l.url) AS links_redes,
GROUP_CONCAT(DISTINCT m.url) AS links_img,
GROUP_CONCAT(DISTINCT v.url) AS links_videos
FROM instituciones a
LEFT JOIN Institucion_tiene_links l
ON a.INSTITUCIONES_ID = l.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes m
ON m.instituciones_instituciones_id = a.INSTITUCIONES_ID
LEFT JOIN instituciones_tiene_videos v
ON v.instituciones_instituciones_id = a.INSTITUCIONES_ID
GROUP BY a.INSTITUCIONES_ID
ORDER BY links_llaves ASC;

-- query para obtener imagenes por id de institucion v1

SELECT i.INSTITUCIONES_ID,m.url
FROM instituciones_tiene_imagenes m
RIGHT JOIN instituciones i
ON i.INSTITUCIONES_ID = m.instituciones_instituciones_id
ORDER BY i.INSTITUCIONES_ID ASC, m.imagenin_id ASC;

-- query pro listadov2
SELECT i.INSTITUCIONES_ID,
GROUP_CONCAT(m.url) AS urls_imagenes
FROM instituciones i
LEFT JOIN instituciones_tiene_imagenes m
ON i.INSTITUCIONES_ID = m.instituciones_instituciones_id
WHERE i.INSTITUCIONES_ID = 2
GROUP BY i.INSTITUCIONES_ID;

-- Otros queries

SELECT instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion,
GROUP_CONCAT(DISTINCT l.llave) AS links_llaves,
GROUP_CONCAT(DISTINCT l.url) AS links_redes,
GROUP_CONCAT(DISTINCT m.url) AS links_img,
GROUP_CONCAT(DISTINCT v.url) AS links_videos
FROM instituciones a
LEFT JOIN Institucion_tiene_links l ON a.INSTITUCIONES_ID = l.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes m ON m.instituciones_instituciones_id = a.INSTITUCIONES_ID
LEFT JOIN instituciones_tiene_videos v ON v.instituciones_instituciones_id = a.INSTITUCIONES_ID
GROUP BY a.INSTITUCIONES_ID;

SELECT * FROM INSTITUCIONES A LEFT JOIN Institucion_tiene_links B ON A.instituciones_id = B.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_imagenes C ON A.instituciones_id = C.instituciones_instituciones_id
LEFT JOIN instituciones_tiene_videos D ON A.instituciones_id = D.instituciones_instituciones_id;

SELECT MainTable.main_key, GROUP_CONCAT(SecondaryTable.attribute) AS attribute_list
FROM MainTable
JOIN SecondaryTable ON MainTable.secondary_key = SecondaryTable.secondary_key
GROUP BY MainTable.main_key;

SELECT INSTITUCIONES_ID, GROUP_CONCAT(b.url) AS attribute_list
FROM INSTITUCIONES A
JOIN instituciones_tiene_imagenes B ON A.INSTITUCIONES_ID = B.instituciones_instituciones_id
GROUP BY A.INSTITUCIONES_ID;