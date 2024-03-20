import { join } from 'node:path'
import fs from 'node:fs/promises'
const __dirname = import.meta.dirname

const filtrarArchivos = (archivosProyecto, archivosIgnorados) => {
  return archivosProyecto.filter(archivo => {
    if(archivosIgnorados.includes(archivo)){
      return false
    }

    for (const ruta of archivosIgnorados) {
      if(archivo.startsWith(ruta)){
        return false
      }
    }
    return true
  })
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
      await fs.cp(file, join(proyectPath, file.replace('./', '/')), {recursive: true})
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
  filtrarArchivos
}