const {CronJob} = require('cron')
import {getUpdate} from './watcher.js'
const fs = require('node:fs/promises')
import compareVersions from './versionComparer.js'

const update = new CronJob('*/10 * * * * *', async ()=>{
  try {
    const {newVersion, link, changelog} = await getUpdate()
    const pkg = await fs.readFile('./package.json', 'utf-8')
    const pkgJSON = JSON.parse(pkg)
    const { version } = pkgJSON

    const update = compareVersions(version, newVersion)
    console.log(version);
    console.log(newVersion);
    console.log(update);
    
    if(update == 1){
      Swal.fire({
        title: 'Update Available',
        html: `<a href="${link}">${newVersion}</a>`,
      })
    }
  } catch (error) {
    console.log(error);
  }
})

export {
  update
}