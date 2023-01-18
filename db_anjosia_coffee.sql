-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 17 Jan 2023 pada 01.27
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_anjosia_coffee`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_barang_keluar`
--

CREATE TABLE `tbl_barang_keluar` (
  `id_keluar` int(11) NOT NULL,
  `nama_produk` text NOT NULL,
  `tgl_keluar` date NOT NULL,
  `stok_keluar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_barang_keluar`
--

INSERT INTO `tbl_barang_keluar` (`id_keluar`, `nama_produk`, `tgl_keluar`, `stok_keluar`) VALUES
(1, 'Pengharum Mobil', '2023-01-21', 5),
(2, 'Gold', '2023-01-07', 1),
(3, 'Khaga', '2023-01-27', 2),
(4, 'Gold', '2023-01-26', 3),
(5, 'Khaga', '2023-01-28', 1),
(6, 'Khaga', '2023-01-23', 1),
(7, 'Platinum', '2023-01-15', 1),
(8, 'Gold', '2023-01-18', 2),
(9, 'Gold', '2023-01-18', 5),
(10, 'Gold', '2023-01-12', 1),
(11, 'Gold', '2023-01-19', 5),
(12, 'Gold', '2023-01-14', 3);

--
-- Trigger `tbl_barang_keluar`
--
DELIMITER $$
CREATE TRIGGER `tbl_delete_keluar` AFTER DELETE ON `tbl_barang_keluar` FOR EACH ROW UPDATE tbl_produk SET stok = stok + old.stok_keluar
WHERE nama_produk = old.nama_produk
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tbl_insert_keluar` AFTER INSERT ON `tbl_barang_keluar` FOR EACH ROW UPDATE tbl_produk SET stok = stok - new.stok_keluar
WHERE nama_produk = new.nama_produk
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_barang_masuk`
--

CREATE TABLE `tbl_barang_masuk` (
  `id_masuk` int(11) NOT NULL,
  `nama_produk` text NOT NULL,
  `tgl_masuk` date NOT NULL,
  `stok_masuk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_barang_masuk`
--

INSERT INTO `tbl_barang_masuk` (`id_masuk`, `nama_produk`, `tgl_masuk`, `stok_masuk`) VALUES
(1, 'Gold', '2023-01-12', 5),
(2, 'Pengharum Mobil', '2023-01-28', 5),
(3, 'Khaga', '2023-01-12', 31);

--
-- Trigger `tbl_barang_masuk`
--
DELIMITER $$
CREATE TRIGGER `trigger _delete_product` AFTER DELETE ON `tbl_barang_masuk` FOR EACH ROW UPDATE tbl_produk SET stok = stok - old.stok_masuk
WHERE nama_produk = old.nama_produk
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger _insert_product` AFTER INSERT ON `tbl_barang_masuk` FOR EACH ROW UPDATE tbl_produk SET stok = stok + new.stok_masuk
WHERE nama_produk = new.nama_produk
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_produk`
--

CREATE TABLE `tbl_produk` (
  `id_produk` int(5) NOT NULL,
  `jenis_kopi` varchar(255) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `tbl_produk`
--

INSERT INTO `tbl_produk` (`id_produk`, `jenis_kopi`, `nama_produk`, `harga`, `stok`) VALUES
(1, 'Robusta', 'Gold', 120000, 25),
(2, 'Arabika', 'Khaga', 120000, 8),
(3, 'Arabika', 'Platinum', 120000, 11),
(4, 'Robusta', 'Pengharum Mobil', 120000, 12),
(7, '--Pilih Jenis Kopi--', '--Pilih Kopi--', 1210000, 10);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nomer_hp` int(15) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `nomer_hp`, `password`) VALUES
(1, 'adminanjosia', 29983912, '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79'),
(3, 'devi', 2923205, '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_barang_keluar`
--
ALTER TABLE `tbl_barang_keluar`
  ADD PRIMARY KEY (`id_keluar`);

--
-- Indeks untuk tabel `tbl_barang_masuk`
--
ALTER TABLE `tbl_barang_masuk`
  ADD PRIMARY KEY (`id_masuk`);

--
-- Indeks untuk tabel `tbl_produk`
--
ALTER TABLE `tbl_produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indeks untuk tabel `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tbl_barang_keluar`
--
ALTER TABLE `tbl_barang_keluar`
  MODIFY `id_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tbl_barang_masuk`
--
ALTER TABLE `tbl_barang_masuk`
  MODIFY `id_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `tbl_produk`
--
ALTER TABLE `tbl_produk`
  MODIFY `id_produk` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
