import { datetimeToS3Prefix } from './utils'
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
    Key: `${datetimeToS3Prefix(dt)}/${dt.format('HHmm')}`,
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

export const eachHour = async (event, context) => {
  const calledDt = moment(event.time).tz('Asia/Tokyo')
  console.log(calledDt.tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'))
  const targetPrefix = `${datetimeToS3Prefix(calledDt)}`

  s3.

  context.succeed()
}
