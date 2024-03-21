import makeQuestion from './utils/makeQuestion.js'
import actualizarPackage from './utils/updatePackage.js'
import loadModules from './utils/getModules.js'
import { deleteFile, fillCompileFolder, copyFile} from './utils/fillFolder.js'
import { exec } from 'node:child_process' 
import { join } from 'node:path'
const compilePath = "compilado"
const __dirname = import.meta.dirname

const createInstaller = async (path) => {
  try {
    const nsisPath = '"C:\\Program Files (x86)\\NSIS\\makensis.exe"'
    exec(`${nsisPath} ../installer.nsi`, {cwd: path}, (err, succ)=>{
      if(err){
        throw err
      } else {
        console.log(succ);
      }
    })
  } catch (error) {
    console.log(error);
  }
}

const genExe = async (proyectPath) => {
  try {
    const rhPath = 'C:\\Program Files (x86)\\Resource Hacker\\ResourceHacker.exe'
    //-open nw.exe -save demoApp.exe -action addoverwrite -res NextFuel.ico -mask ICONGROUP,MAINICON, -action addoverwrite -res version.res
    const command = "-open nw.exe -save demoApp.exe -action addoverwrite -res NextFuel.ico -mask ICONGROUP,MAINICON,"
    exec(`"${rhPath}" ${command}`, {cwd: proyectPath}, (err, succ)=>{
      if(err){
        console.log(err);
        throw err
      } else {
        createInstaller(compilePath)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const loadVersion = async (proyectPath) => {
  try {
    const rhPath = 'C:\\Program Files (x86)\\Resource Hacker\\ResourceHacker.exe'
    exec(`"${rhPath}" -open version.rc -save version.res -action compile -log NUL`, {cwd: proyectPath}, (error, succ)=> {
      if(error){
        throw error
      } else {
        exec('del version.rc', {cwd: proyectPath})
        genExe(proyectPath)
      }
    })
  } catch (error) {
   console.log(error); 
  }
}

const installDependencies = (path)  => {
  exec('npm install',{cwd: path}, (error, stdout) => {
    if(error){
      console.log(error);
    } else {
      loadVersion(path)
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
  'compilado.js',
  'test-updater',
  '.env',
  '.gitignore',
  'package-lock.json',
  'compiler.js',
  'node_modules',
  'utils',
  'src',
  "test.js"
]

const startCompilation = async () => {
  try {
    const choices = [{name: 'Si', value: true}, {name: 'No', value: false}]
    const upload = await makeQuestion({type: 'list', name: 'update', message: '¿Se actualizará a una nueva versión?', choices})
    if(upload){
      await actualizarPackage('./package.json')
    }
    const modules = await loadModules('./src')
    await fillCompileFolder(compilePath, modules)
    const proyectFiles = await loadModules(__dirname, ignore)
    for (const file of proyectFiles) {
      const filePath = file
      const copyPath = join(file.replace('updater', `updater/${compilePath}/proyect`))
      await copyFile(filePath, copyPath, true)
    }
    
    const proyectModules = await loadModules('./compilado/proyect/src')
    const finish = createBinaries(proyectModules)
    if(finish){
      installDependencies('./compilado/proyect')
    }
  } catch (error) {
    console.log(error);
  }
}

startCompilation()