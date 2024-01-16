

CREATE DATABASE trailblaze;


\c trailblaze;

-- Crear un usuario y asignarle privilegios
CREATE USER kevin WITH PASSWORD '1234';
ALTER ROLE kevin SET client_encoding TO 'utf8';
ALTER ROLE kevin SET default_transaction_isolation TO 'read committed';
ALTER ROLE kevin SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE trailblaze TO kevin;