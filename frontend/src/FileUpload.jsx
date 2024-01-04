import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { s3 } from 'aws-sdk';

const MAX_SIZE = 1024 * 1024 * 100; // 100MB
// const AWS_S3_BUCKET = '<s3-bucket-name>';
// const AWS_S3_REGION = '<s3-region>';

const FileUpload = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');

  const onFileUpload = async (data) => {
    const file = data.file[0];
    
    if (file.size > MAX_SIZE) {
      setMessage('File size is too large');
      return;
    }

    const userId = 'user-id';
    const timestamp = Date.now().toString();
    const fileName = userId + timestamp + file.name;

    try {
      // const params = {
      //   Bucket: AWS_S3_BUCKET,
      //   Key: fileName,
      //   Body: file,
      // };

      // await s3.upload(params).promise();
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFileUpload)}>
      <input type="file" {...register('file')} />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FileUpload;
