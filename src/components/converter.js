import * as XLSX from "xlsx";

export const convertToExcel = (data, filename) => {
  if (!data) {
    console.error("JSON data is undefined or null.");
    return;
  }

  const workbook = XLSX.utils.book_new();

  // Process the dynamic JSON data
  Object.keys(data).forEach((sheetName) => {
    const sheetData = data[sheetName];
    let updatedJsonData;
    if (sheetName === "item_line") {
      updatedJsonData = changeItemNameToLineItems(sheetData);
    } else {
      updatedJsonData = sheetData;
    }

    // Make sure the sheetData is an array before proceeding
    if (Array.isArray(updatedJsonData)) {
      const worksheet = XLSX.utils.json_to_sheet(updatedJsonData, {
        header: Object.keys(updatedJsonData[0]),
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
  a.download = `${filename}.xlsx`;
  a.click();

  // Clean up the URL and remove the link element
  URL.revokeObjectURL(url);
};

function changeItemNameToLineItems(data) {
  return data.map((item) => {
    item.line_items = item.item_name;
    delete item.item_name;
    return item;
  });
}
