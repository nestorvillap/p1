import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '../config/s3.js'
import { S3_ENDPOINT, S3_BUCKET_NAME } from '../config/config.js'

const uploadImageToS3 = async (imageBuffer, mimeType) => {
  const extension = mimeType.split('/')[1]
  const key = `images/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`

  const params = {
    Body: imageBuffer,
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: mimeType,
    ACL: 'public-read'
  }

  try {
    const upload = new Upload({
      client: s3Client,
      params
    })

    await upload.done()

    return `${S3_ENDPOINT}/${params.Bucket}/${params.Key}`
  } catch (error) {
    console.error('Error uploading image', error)
    throw error
  }
}

export { uploadImageToS3 }
