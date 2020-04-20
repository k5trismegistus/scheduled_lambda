import { scheduled } from './handler'

const event = {}

const context = {
  done: () => { console.log('done') }
}

switch(process.argv[2]) {
  case 'scheduled':
    scheduled(event, context)
}