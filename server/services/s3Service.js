const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function uploadToBucket(file) {
    const bucket = process.env.AWS_S3_BUCKET_NAME;
    const filename = `${Date.now()}_${file.originalname}`;

    const key = `technical-proposals/${filename}`;

    const uploadParams = {
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { key, filename, url };
}

async function generatePresignedUrl(key, expiresIn = 3600) {
    const bucket = process.env.AWS_S3_BUCKET_NAME;

    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    });

    const url = await getSignedUrl(s3, command, { expiresIn });
    return url;
}

module.exports = { uploadToBucket, generatePresignedUrl };