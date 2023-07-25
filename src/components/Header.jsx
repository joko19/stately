import React from "react";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="font-bold text-3xl ">
        Menyederhanakan Pencatatan Keuangan dari Laporan Bank Kamu
      </h1>
      <p className="mt-2">
        Mencatat pengeluaran dan pemasukan merupakan hal yang memakan waktu,
        apalagi dengan laporan bank yang perlu banyak disortir, dianalisa, dan
        diketik. <br/> Tenang, Stately akan membantu kamu dalam proses ini! <br/> Hanya
        dengan mengunggah laporan bank (estatement) kamu dalam format{" "}
        <b> PDF</b>, kamu akan dengan mudah mendapatkan laporan kamu dengan
        bentuk <b> EXCEL.</b>
      </p>
    </header>
  );
};

export default Header;
