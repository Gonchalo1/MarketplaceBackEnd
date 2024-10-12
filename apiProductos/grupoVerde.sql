-- PostgreSQL dump
--
-- Host: localhost    Database: GrupoVerde
-- ------------------------------------------------------

-- Crear la tabla Categoria
CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Crear la tabla Etiqueta
CREATE TABLE Etiqueta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla Producto
CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_id INTEGER REFERENCES Categoria(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    stock INTEGER DEFAULT 0,
    imagen_url VARCHAR(255)
);


-- Final del dump
