import React from "react";
import { convertToExcel } from "./converter";

const Download = ({ output, filename, onReset }) => {
  const handleDownload = () => {
    convertToExcel(output, filename);
  };

  return (
    <div className="bg-[#EBF0F8] rounded-lg mt-4 p-8 sm:p-8 text-center">
      <p className="font-bold max-w-xl mx-auto">
        Dokumen kamu sudah selesai diproses! <br /> Klik tombol di bawah ini
        untuk mengunduh dokumennya.
      </p>
      <div
        className={`flex justify-center rounded-md p-4 mb-8`}
        onClick={handleDownload}
      >
        <p className="flex items-center gap-4 bg-primary text-white text-lg font-bold text-center py-4 px-8 rounded-lg cursor-pointer">
          <img src="/asset/icon/Download.svg" alt="download" width={20} />
          Download EXCEL
        </p>
      </div>
      <span
        className="text-[#32D07B] text-center w-full font-medium cursor-pointer mt-8"
        onClick={onReset}
      >
        Perlu mengunggah dokumen lain?
      </span>
    </div>
  );
};

export default Download;
