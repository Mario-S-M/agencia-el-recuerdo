#!/bin/bash
# Script de inicialización de base de datos
# Se ejecuta automáticamente la primera vez que se levanta PostgreSQL

# Crear extensiones útiles para PostgreSQL
psql -v ON_ERROR_STOP=1 <<EOF
-- Habilitar extensión pgcrypto para encriptación
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Habilitar extensión pg_trgm para búsquedas de texto similar
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Habilitar extension para JSONB avanzado
CREATE EXTENSION IF NOT EXISTS "pgstattuple";

-- Crear tablas de ejemplo (puedes modificar o eliminar esto)
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE config (
--     key VARCHAR(100) PRIMARY KEY,
--     value JSONB NOT NULL,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Crear índices para búsquedas comunes
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_users_created_at ON users(created_at);

EOF

echo "Base de datos inicializada correctamente"
