const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const PDFDocument = require('pdfkit');


const upload = multer();
const app = express();
const dirPath = path.join('C:\Users\jafarif\\OneDrive - Colas\\Desktop' , 'Savedforms');
app.use(express.urlencoded({ extended: true }));


// Serve the HTML form when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Ensure this points to your actual HTML file
});


app.post('/submit', upload.none(), (req, res) => {
    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath,{ recursive:true});
    }
    const filePath = path.join(dirPath, 'data.pdf')  
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
   


    doc.pipe(stream); // Write the PDF to a file
    doc.fontSize(12);


    // Format each field in the form data
    for (const [key, value] of Object.entries(req.body)) {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, {
            align: 'left'
        });
        doc.moveDown(0.5);  // Adds a little space between lines for better readability
    }


    doc.end(); // Finalize the PDF and end the stream


    stream.on('finish',function() {


       res.send({ status: 'success', message: 'PDF saved' });
    });  
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




