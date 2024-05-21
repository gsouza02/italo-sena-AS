const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

// Configure o electron-reload para monitorar mudanças nos arquivos
require('electron-reload')(path.join(__dirname, '.'), {
  // Exclua a monitoração do diretório node_modules
  ignored: /node_modules|[\/\\]\./,
});

function createWindow () {
  // Obtém a resolução da tela principal
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Adicione esta linha
      contextIsolation: false // Adicione esta linha
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
