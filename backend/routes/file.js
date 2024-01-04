import { AWS_S3_BUCKET_NAME } from "../constants";

const fileStatus = async (req, res) => {
  const fileName = req.params.fileId;

  try {
    const params = { Bucket: AWS_S3_BUCKET_NAME, Key: fileName };
    const headObject = await s3.headObject(params).promise();

    const status = headObject.Metadata.status;
    res.json({ fileName, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = fileStatus;