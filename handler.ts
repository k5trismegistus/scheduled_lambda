import { datetimeToS3PrefixForUnformatted, datetimeToS3PrefixForFormatted } from './utils'
import * as moment from 'moment'
import 'moment-timezone'
import { putTextFile, getFilesByPrefix } from './s3client'
import 'source-map-support/register'

export const eachTwoMinutes = async (_event, context) => {
  const dt = moment().tz('Asia/Tokyo')

  const key = `${datetimeToS3PrefixForUnformatted(dt)}/${dt.format('HHmm')}`
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
  const targetPrefix = `${datetimeToS3PrefixForUnformatted(calledDt)}`

  try {
    const result: Array<string> = await getFilesByPrefix(targetPrefix)

    const content = result.join('\n')
    await putTextFile(`formatted/${datetimeToS3PrefixForFormatted(calledDt)}`, content)
  } catch(err) {
    console.error(err)
    context.fail()
  }

  context.succeed()
}
