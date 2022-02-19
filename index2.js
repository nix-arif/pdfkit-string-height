const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream("quote.pdf"));

const lorem = [
  "PDFKit includes support for line wrapping out of the box! If no options are given, text is automatically wrapped within the page margins and placed in the document flow below any previous text, or at the top of the page. PDFKit automatically inserts new pages as necessary so you don't have to worry about doing that for long pieces of text. PDFKit can also automatically wrap text into multiple columns.",
  "Internally, PDFKit keeps track of the current X and Y position of text as it is added to the document. This way, subsequent calls to the text method will automatically appear as new lines below the previous line. However, you can modify the position of text by passing X and Y coordinates to the text method after the text itself.",
];

// set xCellPading
const xCellPading = 10;
// set yCellPadding
const yCellPadding = 10;
// set cellWidth
const cellWidth = 200;
// set cellBorderWeight
const cellBorderWeight = 1;

const computeRowHeight = (cell) => {
  const rowHeight = doc.heightOfString(cell, {
    width: cellWidth + 2 * xCellPading + 2 * cellBorderWeight,
    align: "justify",
  });
  return rowHeight;
};

lorem.forEach((item) => {
  // calculate row height
  const rowHeight = computeRowHeight(item);
  // check whether enough space to write on the paper
  if (rowHeight + yCellPadding + cellBorderWeight < doc.page.maxY()) {
    // reset x position to write text
    doc.x = doc.page.margins.left;
    // set x position to write text
    const xPositionText = doc.x + xCellPading + cellBorderWeight;
    // set y position to write text
    const yPositionText = doc.y + yCellPadding + cellBorderWeight;
    // write the text on paper
    doc.fillColor("black");
    doc.text(item, xPositionText, yPositionText, {
      width: cellWidth,
      align: "justify",
    });
    // set x position to draw box
    const xPositionBox = doc.page.margins.left;
    // set y position to draw box
    const yPositionBox = yPositionText - yCellPadding - cellBorderWeight;

    // set width and height of the box
    const boxWidth = cellWidth,
      boxHeight = rowHeight;

    // necx doc.y
    doc.y = doc.y + yCellPadding + cellBorderWeight;
    // draw the box

    doc
      .rect(
        xPositionBox,
        yPositionBox,
        boxWidth + 2 * xCellPading + 2 * cellBorderWeight,
        doc.y
      )
      .lineWidth(cellBorderWeight)
      .stroke();
    console.log(doc.y);
    // set the x and y position to next line feed
  } else {
    // addnewPage
    // set x position to write text
    // set y position to write text
    // write the text on paper
    // set x position to draw box
    // set y position to draw box
    // set width and height of the box
    // draw the box
    // set the x and y position to next line feed
  }
});

doc.end();
