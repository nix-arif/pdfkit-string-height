const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream("quote.pdf"));

// doc.rect(0, 0, 300, 300).lineWidth(10).stroke();
doc.lineWidth(20);
doc.polygon([0, 0], [300, 0], [300, 300], [0, 300]).stroke();
doc.fillColor("white").text(".", 0, 0);

doc.end();
