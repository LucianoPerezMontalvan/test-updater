import makeQuestion from './utils/makeQuestion.js'
import actualizarPackage from './utils/updatePackage.js'
import loadModules from './utils/getModules.js'
import { deleteFile, fillCompileFolder, filtrarArchivos } from './utils/fillFolder.js'
import { exec } from 'node:child_process' 
const compilePath = "compilado"
const __dirname = import.meta.dirname

const installDependencies = (path)  => {
  exec('npm install',{cwd: path}, (error, stdout) => {
    if(error){
      console.log(error);
    } else {
      console.log(stdout);
    }
  })
}

const createBinaries = (paths) => {
  for (const path of paths) {
    if(!path.includes('.html')){
      const jsPath = path
      const binPath = path.replace('.js', '.bin')
      exec(`nwjc ${jsPath} ${binPath} --nw-module`, {maxBuffer: 1024 * 2048}, (error, stdout) => {
        if(error){
          console.log(error);
        } else {
          deleteFile(jsPath)
        }
      })
    }
  }
  return true
}

const ignore = [
  '.git',
  './compilado',
  './test-updater',
  '.env',
  '.gitignore',
  'package-lock.json',
  'compiler.js'
]

const startCompilation = async () => {
  try {
    const choices = [{name: 'Si', value: true}, {name: 'No', value: false}]
    const upload = await makeQuestion({type: 'list', name: 'update', message: '¿Se actualizará a una nueva versión?', choices})
    if(upload){
      await actualizarPackage('./package.json')
    }
    const proyectFiles = await loadModules(__dirname)
    const filtered = filtrarArchivos(proyectFiles, ignore)
    console.log(filtered);

    // const modules = await loadModules('./src')
    // await fillCompileFolder(compilePath, modules)
    
    // const proyectModules = await loadModules('./compilado/proyect/src')
    // const finish = createBinaries(proyectModules)
    // if(finish){
    //   installDependencies('./compilado/proyect')
    // }
  } catch (error) {
    console.log(error);
  }
}

startCompilation()