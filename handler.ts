import axios from 'axios'
import * as moment from 'moment'
import { S3 } from 'aws-sdk'
import 'source-map-support/register'

const s3 = new S3()

const BUCKET_NAME = 'scheduled-lambda-w-serverless-raw'

export const scheduled = async (_event, context) => {
  const dt = moment()

  const resp = await axios.get('https://ntp-a1.nict.go.jp/cgi-bin/json')
  const st = resp.data.st

  const putParams: S3.Types.PutObjectRequest = {
    Bucket: BUCKET_NAME,
    Key: `unformatted/${dt.format('YYYYMMDD')}/${dt.format('HHMM')}`,
    Body: `${st}`,
    ContentType: 'text/plain',
  }

  await s3.putObject(putParams, (err, _data) => {
    if (err) {
      console.error(err)
    }
    context.done()
  })
}
