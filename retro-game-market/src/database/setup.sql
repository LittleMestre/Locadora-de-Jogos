
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema loja_games
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema loja_games
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS loja_games DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
SHOW WARNINGS;
USE loja_games ;

-- -----------------------------------------------------
-- Table loja_games.clientes
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.clientes ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NULL DEFAULT NULL,
  email VARCHAR(100) NULL DEFAULT NULL,
  senha VARCHAR(255) NULL DEFAULT NULL,
  criado_em TIMESTAMP NULL DEFAULT NULL,
  telefone INT NULL DEFAULT NULL,
  cpf INT NULL DEFAULT NULL,
  clientescol VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.carrinho
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.carrinho ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.carrinho (
  id INT NOT NULL AUTO_INCREMENT,
  quantidade INT NULL DEFAULT NULL,
  clientes_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT carrinho_ibfk_1
    FOREIGN KEY (clientes_id)
    REFERENCES loja_games.clientes (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX clientes_id ON loja_games.carrinho (clientes_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.formas_pagamento
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.formas_pagamento ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.formas_pagamento (
  id INT NOT NULL AUTO_INCREMENT,
  tipo_pagamento ENUM('Crédito', 'Débito', 'Boleto', 'Pix', 'Dinheiro') NULL DEFAULT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.jogos
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.jogos ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.jogos (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NULL DEFAULT NULL,
  genero VARCHAR(50) NULL DEFAULT NULL,
  classificacao VARCHAR(10) NULL DEFAULT NULL,
  disponibilidade ENUM('Disponível', 'Indisponível') NULL DEFAULT NULL,
  preco DECIMAL(10,2) NULL DEFAULT NULL,
  quantidade INT NULL DEFAULT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.funcionarios
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.funcionarios ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.funcionarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NULL DEFAULT NULL,
  email VARCHAR(100) NULL DEFAULT NULL,
  cpf VARCHAR(14) NULL DEFAULT NULL,
  senha VARCHAR(255) NULL DEFAULT NULL,
  criado_em TIMESTAMP NULL DEFAULT NULL,
  jogos_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT funcionarios_ibfk_1
    FOREIGN KEY (jogos_id)
    REFERENCES loja_games.jogos (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX jogos_id ON loja_games.funcionarios (jogos_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.pedidos
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.pedidos ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.pedidos (
  id INT NOT NULL AUTO_INCREMENT,
  data_pedido DATETIME NULL DEFAULT NULL,
  total DECIMAL(10,2) NULL DEFAULT NULL,
  formas_pagamento_id INT NULL DEFAULT NULL,
  clientes_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT pedidos_ibfk_1
    FOREIGN KEY (formas_pagamento_id)
    REFERENCES loja_games.formas_pagamento (id),
  CONSTRAINT pedidos_ibfk_2
    FOREIGN KEY (clientes_id)
    REFERENCES loja_games.clientes (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX formas_pagamento_id ON loja_games.pedidos (formas_pagamento_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX clientes_id ON loja_games.pedidos (clientes_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.historico_vendas
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.historico_vendas ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.historico_vendas (
  id INT NOT NULL AUTO_INCREMENT,
  nome_jogo VARCHAR(100) NULL DEFAULT NULL,
  quantidade_vendida INT NULL DEFAULT NULL,
  valor_total DECIMAL(10,2) NULL DEFAULT NULL,
  data_venda DATETIME NULL DEFAULT NULL,
  funcionarios_jogos_id INT NULL DEFAULT NULL,
  pedidos_id INT NULL DEFAULT NULL,
  pedidos_formas_pagamento_id INT NULL DEFAULT NULL,
  pedidos_clientes_id INT NULL DEFAULT NULL,
  jogos_id INT NULL DEFAULT NULL,
  clientes_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT historico_vendas_ibfk_1
    FOREIGN KEY (funcionarios_jogos_id)
    REFERENCES loja_games.funcionarios (id),
  CONSTRAINT historico_vendas_ibfk_2
    FOREIGN KEY (pedidos_id)
    REFERENCES loja_games.pedidos (id),
  CONSTRAINT historico_vendas_ibfk_3
    FOREIGN KEY (pedidos_formas_pagamento_id)
    REFERENCES loja_games.formas_pagamento (id),
  CONSTRAINT historico_vendas_ibfk_4
    FOREIGN KEY (pedidos_clientes_id)
    REFERENCES loja_games.clientes (id),
  CONSTRAINT historico_vendas_ibfk_5
    FOREIGN KEY (jogos_id)
    REFERENCES loja_games.jogos (id),
  CONSTRAINT historico_vendas_ibfk_6
    FOREIGN KEY (clientes_id)
    REFERENCES loja_games.clientes (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX funcionarios_jogos_id ON loja_games.historico_vendas (funcionarios_jogos_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX pedidos_id ON loja_games.historico_vendas (pedidos_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX pedidos_formas_pagamento_id ON loja_games.historico_vendas (pedidos_formas_pagamento_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX pedidos_clientes_id ON loja_games.historico_vendas (pedidos_clientes_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX jogos_id ON loja_games.historico_vendas (jogos_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX clientes_id ON loja_games.historico_vendas (clientes_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.jogos_has_carrinho
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.jogos_has_carrinho ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.jogos_has_carrinho (
  jogos_id INT NOT NULL,
  carrinho_id INT NOT NULL,
  PRIMARY KEY (jogos_id, carrinho_id),
  CONSTRAINT jogos_has_carrinho_ibfk_1
    FOREIGN KEY (jogos_id)
    REFERENCES loja_games.jogos (id),
  CONSTRAINT jogos_has_carrinho_ibfk_2
    FOREIGN KEY (carrinho_id)
    REFERENCES loja_games.carrinho (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX carrinho_id ON loja_games.jogos_has_carrinho (carrinho_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.jogos_has_pedidos
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.jogos_has_pedidos ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.jogos_has_pedidos (
  jogos_id INT NOT NULL,
  pedidos_id INT NOT NULL,
  pedidos_formas_pagamento_id INT NULL DEFAULT NULL,
  pedidos_clientes_id INT NULL DEFAULT NULL,
  PRIMARY KEY (jogos_id, pedidos_id),
  CONSTRAINT jogos_has_pedidos_ibfk_1
    FOREIGN KEY (jogos_id)
    REFERENCES loja_games.jogos (id),
  CONSTRAINT jogos_has_pedidos_ibfk_2
    FOREIGN KEY (pedidos_id)
    REFERENCES loja_games.pedidos (id),
  CONSTRAINT jogos_has_pedidos_ibfk_3
    FOREIGN KEY (pedidos_formas_pagamento_id)
    REFERENCES loja_games.formas_pagamento (id),
  CONSTRAINT jogos_has_pedidos_ibfk_4
    FOREIGN KEY (pedidos_clientes_id)
    REFERENCES loja_games.clientes (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX pedidos_id ON loja_games.jogos_has_pedidos (pedidos_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX pedidos_formas_pagamento_id ON loja_games.jogos_has_pedidos (pedidos_formas_pagamento_id ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX pedidos_clientes_id ON loja_games.jogos_has_pedidos (pedidos_clientes_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.plataformas
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.plataformas ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.plataformas (
  id INT NOT NULL AUTO_INCREMENT,
  nome_plataforma ENUM('PC', 'Xbox', 'PlayStation', 'Switch', 'Mobile') NULL DEFAULT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.jogos_has_plataformas
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.jogos_has_plataformas ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.jogos_has_plataformas (
  jogos_id INT NOT NULL,
  plataformas_id INT NOT NULL,
  PRIMARY KEY (jogos_id, plataformas_id),
  CONSTRAINT jogos_has_plataformas_ibfk_1
    FOREIGN KEY (jogos_id)
    REFERENCES loja_games.jogos (id),
  CONSTRAINT jogos_has_plataformas_ibfk_2
    FOREIGN KEY (plataformas_id)
    REFERENCES loja_games.plataformas (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX plataformas_id ON loja_games.jogos_has_plataformas (plataformas_id ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table loja_games.logs_sistema
-- -----------------------------------------------------
DROP TABLE IF EXISTS loja_games.logs_sistema ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS loja_games.logs_sistema (
  id INT NOT NULL AUTO_INCREMENT,
  acao VARCHAR(255) NULL DEFAULT NULL,
  data_log DATETIME NULL DEFAULT NULL,
  funcionarios_jogos_id INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT logs_sistema_ibfk_1
    FOREIGN KEY (funcionarios_jogos_id)
    REFERENCES loja_games.funcionarios (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;
CREATE INDEX funcionarios_jogos_id ON loja_games.logs_sistema (funcionarios_jogos_id ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Insert sample data for testing
INSERT INTO loja_games.jogos (nome, genero, classificacao, disponibilidade, preco, quantidade) VALUES
('The Legend of Adventure', 'RPG', '12', 'Disponível', 199.99, 15),
('Space Warriors', 'Ação', '16', 'Disponível', 159.90, 8),
('Racing Champions', 'Corrida', '0', 'Disponível', 129.90, 20),
('Strategy Masters', 'Estratégia', '10', 'Disponível', 89.90, 12);

-- Insert sample payment methods
INSERT INTO loja_games.formas_pagamento (tipo_pagamento) VALUES
('Crédito'),
('Débito'),
('Boleto'),
('Pix'),
('Dinheiro');

-- Insert sample platforms
INSERT INTO loja_games.plataformas (nome_plataforma) VALUES
('PC'),
('Xbox'),
('PlayStation'),
('Switch'),
('Mobile');

-- Verify the data
SELECT * FROM loja_games.jogos;
SELECT * FROM loja_games.formas_pagamento;
SELECT * FROM loja_games.plataformas;
