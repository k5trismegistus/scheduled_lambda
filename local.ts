import { eachTwoMinutes, eachDay } from './handler'

const event = {}

const context = {
  done: () => { console.log('done') }
}

switch(process.argv[2]) {
  case 'eachTwoMinutes':
    eachTwoMinutes(event, context)
  case 'eachDay':
    eachDay(event, context)
}