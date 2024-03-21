import { join } from 'node:path'
import fs from 'node:fs/promises'
const __dirname = import.meta.dirname

const copyFile = async (source, destination, recursive) => {
  try {
    await fs.cp(source, destination, {recursive})
  } catch (error) {
    throw error
  }
}

const deleteFile = async (path) => {
  try {
    await fs.unlink(path)
  } catch (error) {
    throw error
  }
}

const deleteFolder = async (path) => {
  try {
    await fs.rm(path, { recursive: true })
  } catch (error) {
    throw error
  }
}

const createFolder = async (path) => {
  try {
    await fs.mkdir(path, {recursive: true})
  } catch (error) {
    throw error
  }
}

const folderExists = async (folderPath) => {
  try {
    await fs.access(folderPath, fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

const fillCompileFolder = async (folderName, paths) => {
  try {
    const proyectPath = join(__dirname, `../${folderName}`, 'proyect')
    const viewFolder = await folderExists(proyectPath)
    if(!viewFolder){
      await createFolder(proyectPath)
    } else {
      await deleteFolder(proyectPath)
      await createFolder(proyectPath)
    }
    for (const file of paths) {
      const fullPath = join(proyectPath, file.replace('./', '/'))
      await copyFile(file, fullPath, true)
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  fillCompileFolder,
  folderExists,
  createFolder,
  deleteFolder,
  deleteFile,
  copyFile
}