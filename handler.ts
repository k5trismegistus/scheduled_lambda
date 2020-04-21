import * as moment from 'moment'
import 'moment-timezone'
import { S3 } from 'aws-sdk'
import 'source-map-support/register'

const s3 = new S3()

const BUCKET_NAME = 'scheduled-lambda-w-serverless-raw'

export const eachTwoMinutes = (_event, context) => {
  const dt = moment().tz('Asia/Tokyo')
  console.log(dt.format('YYYY-MM-DD HH:mm'))

  const putParams: S3.Types.PutObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: `unformatted/${dt.format('YYYYMMDDHH')}/${dt.format('HHmm')}`,
    Body: `${dt.format('YYYY-MM-DD HH:mm')}`,
    ContentType: 'text/plain',
  }

  s3.putObject(putParams, (err, _data) => {
    if (err) {
      console.error(err)
      context.fail()
    } else {
      context.succeed()
    }
  })
}

export const eachDay = async (event, context) => {
  console.log(event)
  console.log(context)
}
