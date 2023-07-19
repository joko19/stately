import React from "react";

const BankSupport = () => {
  const banks = [
    "bca.svg",
    "danamon.svg",
    "bni.svg",
    "mandiri.svg",
    "bri.svg",
    "cimb.svg",
    "ocbc.svg",
    "bsi.svg",
    "seabank.svg",
    "jenius.svg",
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h1 className="font-bold text-3xl ">Supported Banks</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center items-center bg-[#EBF0F8] p-2 rounded-lg">
        {banks.map((bank) => (
          <img
            key={bank}
            src={`/asset/icon/${bank}`}
            alt={bank}
            className="mt-4 mx-auto"
          />
        ))}
      </div>
    </section>
  );
};

export default BankSupport;
