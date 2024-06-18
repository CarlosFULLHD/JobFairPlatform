-- Crear base de datos
CREATE DATABASE IF NOT EXISTS feria;
USE feria;

-- Crear tablas

CREATE TABLE instituciones (
    instituciones_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    resena VARCHAR(2000) NOT NULL,
    telefonowp VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(280) NOT NULL
);

CREATE TABLE cuenta (
    cuenta_id BIGINT NOT NULL AUTO_INCREMENT,
    cuenta VARCHAR(200) NOT NULL,
    pwd VARCHAR(200) NOT NULL,
    superusuario INT NOT NULL,
    email VARCHAR(200) NOT NULL,
    CONSTRAINT cuenta_pk PRIMARY KEY (cuenta_id)
);

CREATE TABLE charlas (
    charlas_id BIGINT NOT NULL AUTO_INCREMENT,
    nombrecharla VARCHAR(250) NOT NULL,
    link VARCHAR(500) NOT NULL,
    fechaInicio TIMESTAMP NOT NULL,
    fechaFina TIMESTAMP NOT NULL,
    Cupos_charla INT NOT NULL,
    Color VARCHAR(250) NOT NULL,
    instituciones_instituciones_id BIGINT NOT NULL,
    CONSTRAINT charlas_pk PRIMARY KEY (charlas_id),
    CONSTRAINT Feria_tiene_charlas_instituciones FOREIGN KEY (instituciones_instituciones_id) REFERENCES instituciones (instituciones_id) ON DELETE CASCADE
);

CREATE TABLE Charla_tiene_estudiantes (
    estudcha_id BIGINT NOT NULL AUTO_INCREMENT,
    flag INT NOT NULL,
    cuenta_cuenta_id BIGINT NOT NULL,
    charlas_charlas_id BIGINT NOT NULL,
    CONSTRAINT Charla_tiene_estudiantes_pk PRIMARY KEY (estudcha_id),
    CONSTRAINT Charla_tiene_estudiantes_charlas FOREIGN KEY (charlas_charlas_id) REFERENCES charlas (charlas_id) ON DELETE CASCADE,
    CONSTRAINT Charla_tiene_estudiantes_cuenta FOREIGN KEY (cuenta_cuenta_id) REFERENCES cuenta (cuenta_id) ON DELETE CASCADE
);

CREATE TABLE Charla_tiene_links (
    linkcha_id BIGINT NOT NULL AUTO_INCREMENT,
    llave VARCHAR(280) NOT NULL,
    url VARCHAR(280) NOT NULL,
    charlas_charlas_id BIGINT NOT NULL,
    CONSTRAINT Charla_tiene_links_pk PRIMARY KEY (linkcha_id),
    CONSTRAINT Charla_tiene_links_charlas FOREIGN KEY (charlas_charlas_id) REFERENCES charlas (charlas_id) ON DELETE CASCADE
);

CREATE TABLE Institucion_tiene_links (
    linkin BIGINT NOT NULL AUTO_INCREMENT,
    llave VARCHAR(280) NOT NULL,
    url VARCHAR(280) NOT NULL,
    instituciones_instituciones_id BIGINT NOT NULL,
    CONSTRAINT Institucion_tiene_links_pk PRIMARY KEY (linkin),
    CONSTRAINT Institucion_tiene_links_instituciones FOREIGN KEY (instituciones_instituciones_id) REFERENCES instituciones (instituciones_id) ON DELETE CASCADE
);

CREATE TABLE instituciones_tiene_imagenes (
    imagenin_id BIGINT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    instituciones_instituciones_id BIGINT NOT NULL,
    CONSTRAINT instituciones_tiene_imagenes_pk PRIMARY KEY (imagenin_id),
    CONSTRAINT instituciones_tiene_imagenes_instituciones FOREIGN KEY (instituciones_instituciones_id) REFERENCES instituciones (instituciones_id) ON DELETE CASCADE
);

CREATE TABLE instituciones_tiene_videos (
    videoin_id BIGINT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    instituciones_instituciones_id BIGINT NOT NULL,
    CONSTRAINT instituciones_tiene_videos_pk PRIMARY KEY (videoin_id),
    CONSTRAINT instituciones_tiene_videos_instituciones FOREIGN KEY (instituciones_instituciones_id) REFERENCES instituciones (instituciones_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CHARLA_NOTIFICACION_ESTUDIANTES (
    notiestu_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    flag INT NOT NULL,
    estudcha_id BIGINT NOT NULL,
    CONSTRAINT fk_estudiantescharlanotificacion FOREIGN KEY (estudcha_id) REFERENCES Charla_tiene_estudiantes(estudcha_id) ON DELETE CASCADE
);

-- Insertar datos en tablas
INSERT INTO instituciones (nombre, email, institucion, telefono, resena, telefonowp, ubicacion) VALUES
  ('Banco BNB', 'contacto@bnb.com', 'Banca', '22256584', 'El Banco Nacional de Bolivia S.A. es una empresa boliviana que está comprometida con sus clientes, con la integridad del negocio, la excelencia y el desarrollo sostenible. Se caracteriza por ser una institución sólida que invariablemente, ha actuado eficiente, responsable y transparente frente a sus accionistas y clientes, procurando el desarrollo profesional y personal de sus funcionarios y ejecutando proyectos sociales con miras a contribuir al desarrollo sostenible para así contribuir a mejorar la calidad de vida de los bolivianos. Somos un banco tradicional pero moderno, con raíces firmes en el pasado pero nuevo en nuestros sistemas operativos, productos y filosofía.', '+591 7554654', 'Av Libertador #1233'),
  ('Banco Mercantil Santa Cruz', 'info@mercantilsantacruz.com', 'Bancaria', '22256546', 'El mejor banco de Bolivia.', '+591 7235640', 'Av Simon Bolivar #2222'),
  ('TOYOTA', 'contacto@toyota.com', 'Automotriz', '2123132', 'Toyota, siempre adelante.', '+591 73024872', 'Av Wallace #3333'),
  ('Banco BISA', 'contacto@bisa.com', 'Banca', '22256584', 'Banco BISA, siempre contigo.', '+591 7554654', 'Av Libertador #1233'),
  ('Banco BISA', 'info@bisa.com', 'Bancaria', '22256546', 'Es un referente del Sistema Financiero Boliviano y parte de uno de los principales conglomerados financieros del país, dado que el Grupo Financiero BISA cuenta con siete empresas, que le permite generar una ventaja competitiva al brindar atención integral a sus usuarios y clientes.', '+591 7235640', 'Av Simon Bolivar #2222'),
  ('SUSUKI', 'contacto@suzuki.com', 'Automotriz', '2123132', 'Suzuki, siempre adelante.', '+591 73024872', 'Av Wallace #3333');

INSERT INTO instituciones_tiene_imagenes (url, instituciones_instituciones_id) VALUES
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYw2slsPOfyUviVzkTeWSuV3mfTXOuSOBYhQ&s', 1),
  ('https://lpz.ucb.edu.bo/wp-content/uploads/2021/10/Mercantil-Santa-Cruz.png', 2),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgeUI4uPpTnu5OJ_OEMNc9bPfyUE9IYU8mg&s', 3),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUXPFaPITtyWUEMwtTfWIYXX1KT17BYoTiw&s', 4),
  ('https://lpz.ucb.edu.bo/wp-content/uploads/2021/10/Bisa.png', 5),
  ('https://logowik.com/content/uploads/images/197_suzuki.jpg', 6);

INSERT INTO instituciones_tiene_videos (url, instituciones_instituciones_id) VALUES
  ('https://www.youtube.com/watch?v=hwSRB2VImmM', 1),
  ('https://www.youtube.com/watch?v=OtwH7MxmoqA', 2),
  ('https://www.youtube.com/watch?v=sswt8Igg9S0', 3);

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
