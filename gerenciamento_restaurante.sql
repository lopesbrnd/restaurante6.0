-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Fev-2025 às 18:46
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gerenciamento_restaurante`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` bigint(20) UNSIGNED NOT NULL,
  `nome` varchar(255) NOT NULL,
  `numero` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `garcom`
--

CREATE TABLE `garcom` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `disponibilidade` int(11) NOT NULL,
  `taxa` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `garcom`
--

INSERT INTO `garcom` (`id`, `nome`, `disponibilidade`, `taxa`) VALUES
(1, 'Gabriela', 1, '0.05'),
(2, 'Bernardo', 1, '0.05'),
(3, 'Marina', 1, '0.05'),
(4, 'Guilherme', 1, '0.05');

-- --------------------------------------------------------

--
-- Estrutura da tabela `mesa`
--

CREATE TABLE `mesa` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `numero` int(11) NOT NULL,
  `disponibilidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `mesa`
--

INSERT INTO `mesa` (`id`, `nome`, `numero`, `disponibilidade`) VALUES
(1, 'Mesa 1', 1, 1),
(2, 'Mesa 2', 2, 1),
(3, 'Mesa 3', 3, 1),
(4, 'Mesa 4', 4, 1),
(5, 'Mesa 5', 5, 1),
(6, 'Mesa 6', 6, 1),
(7, 'Mesa 7', 7, 1),
(8, 'Mesa 8', 8, 1),
(9, 'Mesa 9', 9, 1),
(10, 'Mesa 10', 10, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidoprato`
--

CREATE TABLE `pedidoprato` (
  `pedido_id` int(11) NOT NULL,
  `prato_id` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `mesa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `prato`
--

CREATE TABLE `prato` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `descricao` text NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `prato`
--

INSERT INTO `prato` (`id`, `nome`, `preco`, `descricao`, `quantidade`) VALUES
(1, 'X-Braga', '13.00', 'Pão, Hambúrguer Smash, Cheddar e Molho da casa', 10),
(2, 'Duplo Braga', '20.00', 'Pão, 2 Hambúrguer Smash, Cheddar e Molho da casa', 5),
(3, 'Clássico Bacurau', '15.00', 'Pão, Hambúrguer de Crane de Sol, Queijo de Coalho, Cebola Roxa e Molho da casa', 8),
(4, 'Garcia Burguer', '16.00', 'Pão, Hambúrguer de Frango, Queijo sem lactose e Molho da casa', 10),
(5, 'Felix Vegetariano', '17.00', 'Pão, Hambúrguer de Soja assado na brasa, Alface, Tomate, Cebola e Molho da casa', 5),
(6, 'Batata Arante', '10.00', 'Batatas Fritas com tempero do chefe (acompanha Molho da casa)', 20),
(7, 'Batata Arante com Cheddar e Bacon', '15.00', 'Batatas Fritas com tempero do chefe, Cheddar e Bacon (acompanha Molho da casa)', 15),
(8, 'Anéis de Farias', '12.00', 'Anéis de Cebola fritos (acompanha molho)', 30),
(9, 'Giva Shake de Morango', '16.00', 'Milk Shake de morango com calda de morango batido na hora', 12),
(10, 'Giva Shake de Ninho com Nutella', '18.00', 'Milk Shake de Ninho com cobertura de Nutella batido na hora', 8),
(11, 'Petit Gateau a La França', '22.00', 'Petit Gateau de chocolate com sorvete de creme e calda de chocolate', 5),
(12, 'Refrigerante 2L', '15.00', 'Coca-Cola, Cajuína, Guaraná, Sprite', 25),
(13, 'Refrigerante 1L', '10.00', 'Coca-Cola, Cajuína, Guaraná, Pepsi', 30),
(14, 'Refrigerante Latinha', '6.00', 'Coca-Cola, Guaraná, Sprite', 50),
(15, 'Suco (Copo)', '7.00', 'Limão, Morango, Maracujá e Laranja', 15),
(16, 'Suco (Jarra)', '15.00', 'Limão, Morango, Maracujá e Laranja', 10);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices para tabela `garcom`
--
ALTER TABLE `garcom`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pedidoprato`
--
ALTER TABLE `pedidoprato`
  ADD PRIMARY KEY (`pedido_id`,`prato_id`),
  ADD KEY `prato_id` (`prato_id`);

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Índices para tabela `prato`
--
ALTER TABLE `prato`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `garcom`
--
ALTER TABLE `garcom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `mesa`
--
ALTER TABLE `mesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prato`
--
ALTER TABLE `prato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
