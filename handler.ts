import { datetimeToS3Prefix } from './utils'
import * as moment from 'moment'
import 'moment-timezone'
import { putTextFile } from './s3client'
import 'source-map-support/register'

export const eachTwoMinutes = async (_event, context) => {
  const dt = moment().tz('Asia/Tokyo')
  console.log(dt.format('YYYY-MM-DD HH:mm'))

  const key = `${datetimeToS3Prefix(dt)}/${dt.format('HHmm')}`
  const content = `${dt.format('YYYY-MM-DD HH:mm')}`

  try {
    await putTextFile(key, content)
    context.succeed()
  } catch(err) {
    console.error(err)
    context.fail()
  }
}

export const eachHour = async (event, context) => {
  const calledDt = moment(event.time).tz('Asia/Tokyo')
  console.log(calledDt.tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss'))
  const targetPrefix = `${datetimeToS3Prefix(calledDt)}`
  console.log(targetPrefix)

  context.succeed()
}
