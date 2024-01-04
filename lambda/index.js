const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'username',
  host: 'database_host',
  database: 'database',
  password: 'password',
  port: 5432,
});

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    const s3Stream = s3.getObject(params).createReadStream();
    
    await new Promise((resolve, reject) => {
      s3Stream.pipe(csv())
        .on('data', async (data) => {
          await pool.query(`INSERT INTO PriceSync (UserId, StoreID, SKU, ProductName, Price, LastUpdated) VALUES ${(data.column1, data.column2, data.column3, data.column4, data.column5, data.column6)}`);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });

    return { statusCode: 200, body: JSON.stringify('CSV processed successfully') };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify('Error processing CSV file') };
  }
};
