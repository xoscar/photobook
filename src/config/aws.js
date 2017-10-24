const skipperS3 = require('skipper-s3');

module.exports.aws = {
  key: process.env.AWS_KEY,
  secret: process.env.AWS_SECRET,
  s3Region: process.env.S3_REGION,
  bucketName: process.env.BUCKET_NAME,
  skipperS3,
};
