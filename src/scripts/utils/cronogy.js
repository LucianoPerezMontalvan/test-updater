const {CronJob} = require('cron')
import {getUpdate} from './watcher.js'

const update = new CronJob('*/5 * * * * *', ()=>{
  getUpdate()
  console.log('Revisando por actualización')
})

export {
  update
}