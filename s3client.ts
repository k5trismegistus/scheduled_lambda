import { S3 } from 'aws-sdk'

const s3 = new S3()

const BUCKET_NAME = 'scheduled-lambda-w-serverless-raw'

export const putTextFile = async (key: string, content: string) => {
  return new Promise((resolve, reject) => {
    const putParams: S3.Types.PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: 'text/plain',
    }

    s3.putObject(putParams, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}