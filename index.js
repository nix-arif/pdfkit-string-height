const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream("./example.pdf"));

console.log("Height:", doc.page.height);
console.log("Width:", doc.page.width);
console.log("MaxY:", doc.page.maxY());
// console.log("Layout:", doc.page.layout);

// doc.text("Hello", doc.x, doc.y);
// console.log("x1:", doc.x);
// console.log("y1:", doc.y);
// doc.text("Arif", doc.x, doc.y);
// console.log("y2:", doc.y);
// doc.text("Arif", doc.x, doc.y);
// console.log("y3:", doc.y);

// doc.text("A", doc.x, doc.y);
// doc.moveUp();
// doc.text("B", doc.x, doc.y);

const drawLineAbove = (xFrom, yFrom, xTo, yTo, width) => {
  doc.moveTo(xFrom, yFrom).lineTo(xTo, yTo).lineWidth(width).stroke();
};

// for (let i = 0; i < 1; i++) {
//   doc.text(i, doc.x, doc.y);
//   console.log(`x: ${doc.x}, y: ${doc.y}`);
//   doc.rect(doc.x, 0, 410, doc.y).stroke();
// }

let x = 13.872;

let cellPaddingX = 10;
let cellPaddingY = 10;
let cellWidth = 200;

// store doc.x value before box created
let docXBefore = doc.x;

const computeRowHeight = (cell) => {
  const rowHeight = doc.heightOfString(cell, {
    width: cellWidth + 2 * cellPaddingX,
    align: "justify",
  });
  return rowHeight;
};

const lorem = [
  "PDFKit includes support for line wrapping out of the box! If no options are given, text is automatically wrapped within the page margins and placed in the document flow below any previous text, or at the top of the page. PDFKit automatically inserts new pages as necessary so you don't have to worry about doing that for long pieces of text. PDFKit can also automatically wrap text into multiple columns.",
  "Internally, PDFKit keeps track of the current X and Y position of text as it is added to the document. This way, subsequent calls to the text method will automatically appear as new lines below the previous line. However, you can modify the position of text by passing X and Y coordinates to the text method after the text itself.",
];
for (index in lorem) {
  // check if the height is enough for remaining space
  // let beforeY = doc.y;
  // let afterY = 0;
  // console.log(afterY - beforeY);

  if (doc.y + computeRowHeight(lorem) < doc.page.maxY()) {
    // Return current line feed
    doc.x = docXBefore;
    let docYBefore = doc.y;

    let xTextPosAfterPad = doc.x + cellPaddingX;
    let yTextPosAfterPad = doc.y + cellPaddingY;
    doc.text(
      `This text is justified. ${lorem}`,
      xTextPosAfterPad,
      yTextPosAfterPad,
      {
        width: cellWidth,
        align: "justify",
      }
    );

    // Position Y Line Feed include the Y padding

    doc.y += cellPaddingY;
    let docXPosForBox = doc.x - cellPaddingX;
    let docYPosForBox = docYBefore;

    doc
      .rect(docXPosForBox, docYPosForBox, cellWidth + 2 * cellPaddingX, doc.y)
      .stroke();
    doc.text("Hello", docXPosForBox, docYPosForBox);
  }
}

// if (doc.y + 100 > doc.page.maxY()) {
//   doc.addPage();
// }
// doc.rect(doc.x, doc.y, 100, 100).stroke();

doc.end();
