const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const upload = multer();
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', upload.none(), (req, res) => {
    
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="downloaded.pdf"');
   


    doc.pipe(res);
    
    for (const [key, value] of Object.entries(req.body)) {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, {
            align: 'left'
        });
        doc.moveDown(0.5);  // Adds a little space between lines
    }

    doc.end(); // Finalize the PDF and end the stream


});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
