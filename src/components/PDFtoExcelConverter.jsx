import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "./Loader";
import Download from "./Download";

const PDFtoExcelConverter = () => {
  const [files, setFiles] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [output, setOutput] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = async (acceptedFiles) => {
    const allowedTypes = ["application/pdf"];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (acceptedFiles[0].size > maxSizeInBytes) {
      setErrorMessage("Max file size is 10 MB per upload");
      setFiles(null);
      return;
    }

    if (!allowedTypes.includes(acceptedFiles[0].type)) {
      setErrorMessage("Invalid file type. Please select a PDF file.");
      setFiles(null);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
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
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(progress);

              const currentTime = Date.now();
              const elapsedTime = currentTime - startTime;
              const remainingTime = ((100 - progress) / progress) * elapsedTime;
              setEstimatedTime(remainingTime);
            },
            // onUploadProgress: (progressEvent) => {
            //   const percentCompleted = Math.round(
            //     (progressEvent.loaded * 100) / progressEvent.total
            //   );
            //   setProgress(percentCompleted);

            //   // Calculate remaining time estimation for upload
            //   const remainingBytes = progressEvent.total - progressEvent.loaded;
            //   const bytesPerSecond =
            //     progressEvent.loaded / (Date.now() - progressEvent.timeStamp);
            //   const remainingTimeInSeconds = remainingBytes / bytesPerSecond;
            //   setEstimatedTime(remainingTimeInSeconds);
            // },
          }
        )
        .then((response) => {
          // setOutput(response.data.data);
          // setIsSubmitting(false);
          // Handle successful file upload response
          setIsSubmitting(true); // Show the loading spinner
          // setResponseTime(null);
          const endTime = Date.now(); // End time for measuring response time
          const responseTimeInSeconds = (endTime - startTime) / 1000;
          setEstimatedTime(responseTimeInSeconds);

          setTimeout(() => {
            setOutput(response.data.data);
            setIsSubmitting(false); // Hide the loading spinner after a simulated delay
            // console.log("Upload success:", response.data);
            // Add any further actions you want to take after successful upload and response
          }, 2000); // Simulated delay of 2 seconds
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    // Set a timeout to estimate response time
    setTimeout(() => {
      if (!estimatedTime) {
        setEstimatedTime(null); // Reset responseTime when the response is still not ready
      }
    }, 5000); // Wait for 5 seconds before assuming the response is not ready
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf",
    multiple: true,
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {!files && !isSubmitting && (
        <div className="bg-[#EBF0F8] rounded-lg mt-4 p-8 sm:p-20 text-center">
          <div
            {...getRootProps()}
            className={`flex justify-center rounded-md p-4 `}
          >
            <input {...getInputProps()} type="file" accept=".pdf" />
            <p
              className={
                "bg-primary hover:bg-blue-500 text-white text-lg font-bold text-center py-4 px-8 rounded-lg cursor-pointer"
              }
            >
              {isDragActive ? "Drop the PDF files here" : "Upload file disini"}
            </p>
          </div>
          <span className="text-[#697584] text-center w-full">
            <p style={{ color: "#697584" }}>
              Max file size is 10 MB per upload
            </p>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </span>
        </div>
      )}

      <Loader
        isSubmitting={isSubmitting}
        progress={progress}
        estimatedTime={estimatedTime}
        fileName={files?.name}
      />

      {files && !isSubmitting && (
        <Download
          output={output}
          onReset={() => setFiles(null)}
          filename={files?.name}
        />
      )}
    </section>
  );
};

export default PDFtoExcelConverter;
