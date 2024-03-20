import fs from 'node:fs/promises'
const readPath = async (path, files) => {
  try {
    const elements = await fs.readdir(path)
    for (const element of elements) {
      const elementPath = `${path}/${element}`
      const stats = await fs.stat(elementPath)
      if (stats.isDirectory()) {
        await readPath(elementPath, files)
      } else if(stats.isFile()) {
        files.push(elementPath)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const loadModules = async (origin) => {
  try {
    const modules = []
    await readPath(origin, modules)
    return modules
  } catch (error) {
    console.log(error);
  }
}

export default loadModules