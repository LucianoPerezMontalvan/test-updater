const axios = require('axios')
require('dotenv').config()
const owner = process.env.OWNER
const repo = process.env.REPO

const getUpdate = async () => {
  try {
    const changelog = await axios.get(`https://api.github.com/repos/${owner}/${repo}/tags`)
    const latest = changelog.data[0].name
    return {newVersion: latest.replace('v', ''), link: changelog.data[0].zipball_url, changelog: changelog.data[0].body}
  } catch (error) {
    console.log(error)
  }
}

export {
  getUpdate
}