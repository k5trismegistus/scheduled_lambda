import { eachTwoMinutes, eachHour } from './handler'

const event = {}

const context = {
  done: () => { console.log('done') },
  succeed: () => { console.log('succeed') },
  fail: () => { console.log('fail') }
}

const eachHourEvent = {
  version: '0',
  id: 'xxxxx',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: 'xxxxx',
  time: '2020-04-22T10:05:00Z',
  region: 'ap-northeast-1',
  resources: [
    'arn:aws:events:ap-northeast-1:xxxxx'
  ],
  detail: {}
}

switch(process.argv[2]) {
  case 'eachTwoMinutes':
    eachTwoMinutes(event, context)
  case 'eachHour':
    eachHour(eachHourEvent, context)
}