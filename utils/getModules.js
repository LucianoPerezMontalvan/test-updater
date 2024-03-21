import fs from 'node:fs/promises'
import { join } from 'node:path'

const shouldIgnore = (elementName, toIgnores) => {
  return toIgnores.includes(elementName)
}

const readPath = async (path, ignore = []) => {
  try {
    let files = []
    const elements = await fs.readdir(path)
    
    for (const pathName of elements) {
      const fullPath = join(path, pathName)
      const stats = await fs.stat(fullPath)
      
      if (stats.isDirectory()) {
        if(ignore.length > 0){
          if(!shouldIgnore(pathName, ignore)){
            const nestedFiles = await readPath(fullPath, ignore);
            files = files.concat(nestedFiles);
          }
        } else {
          const nestedFiles = await readPath(fullPath, ignore);
          files = files.concat(nestedFiles);
        }
      } else if(stats.isFile()) {
        if(ignore.length > 0){
          if(!shouldIgnore(pathName, ignore)){
            files.push(fullPath)
          }
        } else {
          files.push(fullPath)
        }
      }
    }
    return files
  } catch (error) {
    console.log(error);
  }
}

const loadModules = async (origin, ignorePaths) => {
  try {
    const modules = await readPath(origin, ignorePaths)
    return modules
  } catch (error) {
    console.log(error);
  }
}

export default loadModules