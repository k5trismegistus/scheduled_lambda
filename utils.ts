import * as moment from 'moment'

export const datetimeToS3PrefixForUnformatted = (dt: moment.Moment) => {
  return `unformatted/${dt.format('YYYYMMDDHH')}`
}

export const datetimeToS3PrefixForFormatted = (dt: moment.Moment) => {
  return `formatted/${dt.format('YYYYMMDD')}`
}