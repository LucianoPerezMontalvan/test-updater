Name "demoApp"

#Nombre del instalador
OutFile "compilado\demoApp.exe"

#Ruta donde se intalara la aplicacion
InstallDir "C:\NextFuel\demoApp"

#Establece el nivel de ejecucion de la aplicaion 
RequestExecutionLevel user

#orden en el que se visualizara el proceso de instalacion
Page directory #Permite al usuario seleccionar donde instalar la aplicacion
Page instfiles /ENABLECANCEL  #Visualiza el progreso de instalacion

#/ENABLECANCEL permite cancelar el proceso
#Orden en el que se visualiza el proceso de desinstalacion

UninstPage uninstConfirm #Pagina de confirmacion de la desinstalacion
UninstPage instfiles #Proceso de la desinstalacion
LoadLanguageFile "${NSISDIR}\Contrib\Language files\Spanish.nlf"

Section
  SetOutPath $INSTDIR
  File /r "compilado\proyect\*"
  WriteUninstaller "$INSTDIR\uninstaller.exe"
SectionEnd

Section "uninstall"
  Delete "$INSTDIR\*"
  Delete "$INSTDIR\uninstaller.exe"
  RMDir /r $INSTDIR\*
SectionEnd