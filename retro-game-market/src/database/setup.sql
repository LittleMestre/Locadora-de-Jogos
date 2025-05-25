
-- Create database
CREATE DATABASE IF NOT EXISTS gamestore_db;
USE gamestore_db;

-- No need to create user since we're using root
-- CREATE USER IF NOT EXISTS 'gamestore_user'@'localhost' IDENTIFIED BY 'sua_senha_aqui';
-- GRANT ALL PRIVILEGES ON gamestore_db.* TO 'gamestore_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  codigo INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  genero VARCHAR(50),
  classificacao INT DEFAULT 0,
  disponibilidade VARCHAR(50) DEFAULT 'Em estoque',
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  imagem VARCHAR(255) DEFAULT NULL,
  descricao TEXT
);

-- Insert sample data for testing
INSERT INTO games (nome, genero, classificacao, preco, quantidade, descricao) VALUES
('The Legend of Adventure', 'RPG', 12, 199.99, 15, 'Um jogo épico de aventura em um mundo fantástico'),
('Space Warriors', 'Ação', 16, 159.90, 8, 'Batalhas espaciais intensas em um universo vasto'),
('Racing Champions', 'Corrida', 0, 129.90, 20, 'Sinta a adrenalina das corridas de alta velocidade'),
('Strategy Masters', 'Estratégia', 10, 89.90, 12, 'Use sua inteligência para conquistar territórios');

-- Verify the data
SELECT * FROM games;
