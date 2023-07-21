import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { bankOptions } from "./const";
import axios from "axios";
import { convertToExcel } from "./converter";

const PDFtoExcelConverter = () => {
  const [bankSelected, setBankSelected] = useState();
  const [files, setFiles] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [output, setOutput] = useState()
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = async (acceptedFiles) => {
    const allowedTypes = ['application/pdf'];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (acceptedFiles[0].size > maxSizeInBytes) {
      setErrorMessage('Max file size is 10 MB per upload');
      setFiles(null);
      return;
    }

    if (!allowedTypes.includes(acceptedFiles[0].type)) {
      setErrorMessage('Invalid file type. Please select a PDF file.');
      setFiles(null);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setFiles(acceptedFiles[0]);

    // submit to server
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("document_type", "INVOICE");
      formData.append("external_id", "dev-stately");

      const startTime = Date.now();
      const apiKey = "stag_7qcj9QPJDV59N9KC2myR";
      await axios
        .post(
          "https://staging-api.fintelite.id/v1/business/categorization/ocr",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "api-key": `${apiKey}`,
              "external-id": "dev-stately",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(progress);
    
              const currentTime = Date.now();
              const elapsedTime = currentTime - startTime;
              const remainingTime = ((100 - progress) / progress) * elapsedTime;
    
              setEstimatedTime(remainingTime);
            },
          }
        )
        .then((response) => {
          console.log(response)
          setOutput(response.data.data)
          setIsSubmitting(false)
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf",
    multiple: true,
  });

  const handleDownload = () => {
    convertToExcel(output)
  };

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
              <input {...getInputProps()} type="file" accept=".pdf" />
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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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

          {estimatedTime !== null && (
        <p>Estimated Time Remaining: {Math.ceil(estimatedTime / 1000)} seconds</p>
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
