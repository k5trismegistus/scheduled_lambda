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

const listObjectsAsync = async (listParams) => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(listParams, (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        const result = { contents: data.Contents }
        if (data.IsTruncated) result['nextContinuationToken'] = data.NextContinuationToken
        resolve(result)
      }
    })
  })
}

const getObjectAsync = async(key) => {
  return new Promise((resolve, reject) => {
    const getParams: S3.Types.GetObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: key,
    }
    s3.getObject(getParams, (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const getFilesByPrefix = async (prefix: string): Promise<Array<string>> => {
  return new Promise(async (resolve, reject) => {
    let objectList = []
    let listParams: S3.Types.ListObjectsV2Request = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    }

    while(true) {
      try {
        let result = await listObjectsAsync(listParams)
        objectList =  [...objectList, ...result['contents']]

        if (!result['nextContinuationToken']) {
          break
        }

      } catch(err) {
        console.error(err)
        reject(err)
        break
      }
    }

    // 全件並列で取得してしまうので、必要に応じて
    const fetchResult = await Promise.all(objectList.map((o) => (getObjectAsync(o.Key))))
    const allResult = fetchResult.map(r => r['Body'].toString())
    resolve(allResult)
  })
}