import { app, BrowserWindow } from "electron";
import * as path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  
  win.loadFile('index.html');
};

(async() => {
  await app.whenReady();
  createWindow();

  // MacOS限定
  // ウィンドウが閉じられてもアプリケーションは終了しなのでこの処理が必要
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

 // MacOS以外の場合
 // ウィンドウが全てクローズしたらアプリケーションを終了する
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});