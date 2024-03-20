import fs from 'node:fs/promises'
import makeQuestion from './makeQuestion.js'
const updateOptions = [
  { name: 'Major', value: 0 },
  { name: 'Minor', value: 1 },
  { name: 'Bug Fix', value: 2 }
]

const yesOrNo = [
  {name: 'Si', value: true},
  {name: 'No', value: false}
]

const actualizarPackage = async (path) => {
  try {
    const pkg = await fs.readFile(path, 'utf-8')
    const parsedPkg = JSON.parse(pkg)
    const {version} = parsedPkg
    const kindUpdate = await makeQuestion({type: 'list', name: 'kind', message: '¿La actualización será Major, Minor o Bug Fix?', choices: updateOptions})
    const splitVersion = version.split('.')
    const versionValue = parseInt(splitVersion[kindUpdate])
    splitVersion[kindUpdate] = versionValue + 1

    const newVersion = splitVersion.join('.')
    const newVersionOk = await makeQuestion({type: 'list', name: 'version', message: `La versión actual es la version ${version}. Se actualizará a la versión ${newVersion}, ¿Es correcto?`, choices: yesOrNo})
    
    const pkgVersion = newVersionOk ? newVersion : await makeQuestion({type: 'input', name: 'version', message: 'Ingrese la nueva versión'})
    parsedPkg.version = pkgVersion
    await fs.writeFile(path, JSON.stringify(parsedPkg, null, 2))

    return true
  } catch (error) {
    throw error
  }
}

export default actualizarPackage