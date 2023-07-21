import * as XLSX from "xlsx";

export const convertToExcel = (data) => {
  if (!data) {
    console.error("JSON data is undefined or null.");
    return;
  }

  const workbook = XLSX.utils.book_new();

  // Process the dynamic JSON data
  Object.keys(data).forEach((sheetName) => {
    const sheetData = data[sheetName];

    // Make sure the sheetData is an array before proceeding
    if (Array.isArray(sheetData)) {
      const worksheet = XLSX.utils.json_to_sheet(sheetData, {
        header: Object.keys(sheetData[0]),
      });

      // Add the worksheet to the workbook with the sheet name
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
  });

  // Generate a buffer containing the Excel file
  const excelBuffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a URL from the Blob
  const url = URL.createObjectURL(blob);

  // Create a link to download the Excel file
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.xlsx";
  a.click();

  // Clean up the URL and remove the link element
  URL.revokeObjectURL(url);
};
