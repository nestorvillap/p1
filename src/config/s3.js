import { S3Client } from '@aws-sdk/client-s3'
import { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_ENDPOINT, S3_REGION } from '../config/config.js'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  },
  endpoint: S3_ENDPOINT,
  region: S3_REGION
})

export { s3Client }
