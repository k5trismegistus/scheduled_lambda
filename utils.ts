import * as moment from 'moment'

export const datetimeToS3Prefix = (dt: moment.Moment) => {
  return `unformatted/${dt.format('YYYYMMDDHH')}`
}