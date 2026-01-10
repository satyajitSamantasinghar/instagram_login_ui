const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../logins.xlsx");
const SHEET_NAME = "Logins";

exports.writeToExcel = (username, password) => {
  let workbook;
  let worksheet;
  let data = [];

  // If file exists → read it
  if (fs.existsSync(FILE)) {
    workbook = XLSX.readFile(FILE);

    // If sheet exists → read data
    if (workbook.Sheets[SHEET_NAME]) {
      worksheet = workbook.Sheets[SHEET_NAME];
      data = XLSX.utils.sheet_to_json(worksheet);
    }
  } else {
    // Create new workbook if file doesn't exist
    workbook = XLSX.utils.book_new();
  }

  // Add new entry
  data.push({
    Timestamp: new Date().toLocaleString(),
    Username: username,
    Password: password
  });

  // Convert JSON → worksheet
  worksheet = XLSX.utils.json_to_sheet(data);

  // Assign sheet directly (NO append if exists)
  workbook.Sheets[SHEET_NAME] = worksheet;

  // Ensure sheet name is listed
  if (!workbook.SheetNames.includes(SHEET_NAME)) {
    workbook.SheetNames.push(SHEET_NAME);
  }

  // Write file
  XLSX.writeFile(workbook, FILE);
};

