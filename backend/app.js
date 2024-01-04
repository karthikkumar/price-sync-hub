const express = require('express');

const search = require('./routes/search');
const fileStatus = require('./routes/file');
const updateProduct = require('./routes/update');

const app = express();

const port = 3000;

app.use(express.json());

// note, S3 APIs can be used directly at frontend to check the status of a file processing
// this is an extra API to serve frontend
app.get('/check-file-status/:fileId', fileStatus); 

app.get('/search', search);
app.patch('/update-product/:sku', updateProduct);
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });