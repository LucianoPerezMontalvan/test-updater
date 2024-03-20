const axios = require('axios')
require('dotenv').config()
const owner = process.env.OWNER
const repo = process.env.REPO

const getUpdate = async () => {
  try {
    const changelog = await axios.get(`https://api.github.com/repos/${owner}/${repo}/tags`)
    console.log(changelog.data);
  } catch (error) {
    console.log(error)
  }
}

export {
  getUpdate
}