import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { bankOptions } from "./const";

const PDFtoExcelConverter = () => {
  const [bankSelected, setBankSelected] = useState();
  const [files, setFiles] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    setIsSubmitting(true);
    console.log(acceptedFiles[0]);
    setFiles(acceptedFiles[0]);

    const fileSize = acceptedFiles[0].size;

    const updateProgress = (percentage) => {
      setProgress(percentage);
    };

    // Simulating file upload progress
    const simulateUploadProgress = () => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        updateProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
        }
      }, 500);
    };

    simulateUploadProgress();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf",
    multiple: true,
  });

  const handleDownload = () => {
    if (files) {
      const downloadUrl = URL.createObjectURL(files);

      // Create a hidden link element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "testing.pdf";
      link.style.display = "none";
      document.body.appendChild(link);

      // Programmatically trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }
  };
  console.log(bankSelected ? false : true);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex items-center gap-4">
        Pertama, pilih bank kamu{" "}
        <div className="relative inline-block">
          <select
            className="cursor-pointer block appearance-none px-4 py-2 pr-8 leading-tight bg-white border border-[#9AA8B8] rounded shadow focus:outline-none focus:shadow-outline text-[#697584]"
            id="select-input"
            onChange={(e) => setBankSelected(e.target.value)}
          >
            <option value="">Pilih Bank</option>
            {bankOptions.map((bank) => (
              <option value={bank}>{bank}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <AiOutlineDown className="text-[#697584]" size={12} />
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm">
          OK
        </button>
      </div>

      {!files && !isSubmitting && (
        <div className="bg-[#EBF0F8] rounded-lg mt-4 p-8 sm:p-20 text-center">
          {bankSelected ? (
            <div
              {...getRootProps()}
              className={`flex justify-center rounded-md p-4 `}
            >
              <input {...getInputProps()} />
              <p
                className={
                  "bg-primary text-white text-lg font-bold text-center py-4 px-8 rounded-lg cursor-pointer"
                }
              >
                {isDragActive
                  ? "Drop the PDF files here"
                  : "Upload file disini"}
              </p>
            </div>
          ) : (
            <div className={`flex justify-center rounded-md p-4 `}>
              <p className="bg-blue-300 text-white text-lg font-bold text-center py-4 px-8 rounded-lg">
              Upload file disini
              </p>
            </div>
          )}
          <span className="text-[#697584] text-center w-full">
            Max file size is 10 MB per upload
          </span>
        </div>
      )}

      {isSubmitting && (
        <div className="bg-[#EBF0F8] rounded-lg mt-4 p-8 sm:p-20 text-center">
          <span className="text-[#697584] text-center w-full">
            Memproses File:
          </span>
          <p className="font-bold text-lg">{files?.name}</p>
          <div className="bg-[#CAECE6] h-8 w-full rounded mt-4">
            <div
              className="bg-[#32D07B] h-full rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {progress > 0 && progress < 100 && (
            <div className="text-center mt-2">Uploading: {progress}%</div>
          )}

          {progress === 100 && (
            <div className="text-center mt-2 text-green-500">
              Upload complete!
            </div>
          )}
        </div>
      )}

      {files && !isSubmitting && (
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
            onClick={() => setFiles(null)}
          >
            Perlu mengunggah dokumen lain?
          </span>
        </div>
      )}
    </section>
  );
};

export default PDFtoExcelConverter;
