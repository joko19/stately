import React from "react";

const Loader = ({ isSubmitting, fileName, progress, estimatedTime }) => {
  if (!isSubmitting) {
    return;
  }
  
  return (
    <div className="bg-[#EBF0F8] rounded-lg mt-4 p-8 sm:p-20 text-center">
      <span className="text-[#697584] text-center w-full">Memproses File:</span>
      <p className="font-bold text-lg">{fileName}</p>
      <div className="bg-[#CAECE6] h-8 w-full rounded mt-4">
        <div
          className={`bg-[#32D07B] h-full rounded ${
            progress === 100 && "animate-pulse"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {estimatedTime !== 0 ? (
        <p className="text-gray-600 mt-2">
          Perkiraan Waktu Selesai: {Math.ceil(estimatedTime / 1000)} detik
        </p>
      ) : (
        <div className="text-center mt-2 text-green-500">
          Please wait
        </div>
      )}
    </div>
  );
};

export default Loader;
