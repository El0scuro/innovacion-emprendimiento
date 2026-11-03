-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS innovacion;
USE innovacion;


CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    contrasena_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(10) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    estado VARCHAR(15) NOT NULL
);

CREATE TABLE COMUNA (
    id_comuna INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    region VARCHAR(60) NOT NULL
);

CREATE TABLE TIPO_TRABAJO (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    descripcion TEXT
);

CREATE TABLE EMPRESA (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    id_comuna INT NOT NULL,
    razon_social VARCHAR(120) NOT NULL,
    rut VARCHAR(12) NOT NULL UNIQUE,
    rubro VARCHAR(60),
    direccion VARCHAR(150),
    descripcion TEXT,
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_empresa_comuna FOREIGN KEY (id_comuna) REFERENCES COMUNA(id_comuna)
);

CREATE TABLE TRABAJADOR (
    id_trabajador INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    id_comuna INT NOT NULL,
    fecha_nacimiento DATE,
    descripcion TEXT,
    calificacion_prom DECIMAL(3,2),
    CONSTRAINT fk_trabajador_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_trabajador_comuna FOREIGN KEY (id_comuna) REFERENCES COMUNA(id_comuna)
);

CREATE TABLE OFERTA (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    id_tipo INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_turno DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    pago_ofrecido INT NOT NULL,
    cupos INT NOT NULL,
    destacada BOOLEAN DEFAULT FALSE,
    estado VARCHAR(15) NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    CONSTRAINT fk_oferta_empresa FOREIGN KEY (id_empresa) REFERENCES EMPRESA(id_empresa),
    CONSTRAINT fk_oferta_tipo FOREIGN KEY (id_tipo) REFERENCES TIPO_TRABAJO(id_tipo)
);

CREATE TABLE POSTULACION (
    id_postulacion INT AUTO_INCREMENT PRIMARY KEY,
    id_oferta INT NOT NULL,
    id_trabajador INT NOT NULL,
    fecha_postulacion DATETIME NOT NULL,
    estado VARCHAR(15) NOT NULL,
    CONSTRAINT fk_postulacion_oferta FOREIGN KEY (id_oferta) REFERENCES OFERTA(id_oferta),
    CONSTRAINT fk_postulacion_trabajador FOREIGN KEY (id_trabajador) REFERENCES TRABAJADOR(id_trabajador)
);

CREATE TABLE TURNO (
    id_turno INT AUTO_INCREMENT PRIMARY KEY,
    id_postulacion INT NOT NULL UNIQUE,
    hora_inicio_real TIME,
    hora_fin_real TIME,
    estado VARCHAR(15) NOT NULL,
    CONSTRAINT fk_turno_postulacion FOREIGN KEY (id_postulacion) REFERENCES POSTULACION(id_postulacion)
);

CREATE TABLE TRANSACCION (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    id_turno INT NOT NULL,
    monto_comision INT NOT NULL,
    fecha DATETIME NOT NULL,
    estado VARCHAR(15) NOT NULL,
    CONSTRAINT fk_transaccion_turno FOREIGN KEY (id_turno) REFERENCES TURNO(id_turno)
);

CREATE TABLE RESENA (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_turno INT NOT NULL,
    id_autor INT NOT NULL,
    id_destinatario INT NOT NULL,
    puntuacion TINYINT NOT NULL,
    comentario TEXT,
    fecha DATETIME NOT NULL,
    CONSTRAINT fk_resena_turno FOREIGN KEY (id_turno) REFERENCES TURNO(id_turno),
    CONSTRAINT fk_resena_autor FOREIGN KEY (id_autor) REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_resena_destinatario FOREIGN KEY (id_destinatario) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE DISPONIBILIDAD (
    id_disponibilidad INT AUTO_INCREMENT PRIMARY KEY,
    id_trabajador INT NOT NULL,
    dia_semana TINYINT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT fk_disponibilidad_trabajador FOREIGN KEY (id_trabajador) REFERENCES TRABAJADOR(id_trabajador)
);

CREATE TABLE TRABAJADOR_TIPO (
    id_trabajador INT NOT NULL,
    id_tipo INT NOT NULL,
    PRIMARY KEY (id_trabajador, id_tipo),
    CONSTRAINT fk_trabajadortipo_trabajador FOREIGN KEY (id_trabajador) REFERENCES TRABAJADOR(id_trabajador),
    CONSTRAINT fk_trabajadortipo_tipo FOREIGN KEY (id_tipo) REFERENCES TIPO_TRABAJO(id_tipo)
);