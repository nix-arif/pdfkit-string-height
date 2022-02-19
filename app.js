const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream("hello.pdf"));

doc.text("Hello", 100, 100);
doc.text("Hai");

doc.end();

const lorem = [
  "PDFKit includes support for line wrapping out of the box! If no options are given, text is automatically wrapped within the page margins and placed in the document flow below any previous text, or at the top of the page. PDFKit automatically inserts new pages as necessary so you don't have to worry about doing that for long pieces of text. PDFKit can also automatically wrap text into multiple columns.",
  "Internally, PDFKit keeps track of the current X and Y position of text as it is added to the document. This way, subsequent calls to the text method will automatically appear as new lines below the previous line. However, you can modify the position of text by passing X and Y coordinates to the text method after the text itself.",
];

for (index in lorem) {
  console.log(lorem[index]);
}
