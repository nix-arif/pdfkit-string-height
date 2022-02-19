const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

console.log("Height:", doc.page.height);
console.log("Width:", doc.page.width);
