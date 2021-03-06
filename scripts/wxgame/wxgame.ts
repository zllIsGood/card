import * as fs from 'fs';
import * as path from 'path';
export class WxgamePlugin implements plugins.Command {

    constructor() {
    }
    async onFile(file: plugins.File) {
        /* if (file.basename.indexOf('default.res.json') >= 0) {
             let content = file.contents.toString();
             let obj = JSON.parse(content)
             let keys
             for (let i = 0; i < obj.groups.length; i++) {
                 if (obj.groups[i].name == 'storyGroup') {
                     keys = obj.groups[i].keys
                     obj.groups.splice(i, 1)
                     break;
                 }
             }
             keys = (keys as string).split(',')
             for (let i = obj.resources.length - 1; i >= 0; i--) {
                 if (keys.indexOf(obj.resources[i].name) >= 0) {
                     obj.resources.splice(i, 1)
                 }
             }
             file.contents = new Buffer(JSON.stringify(obj));
             return file;
         }
         if (file.basename.indexOf('another.res.json') >= 0 ||
             file.path.indexOf('resource\\another\\') >= 0 ||
             file.path.indexOf('resource\\mc\\') >= 0 ||
             file.path.indexOf('resource\\story\\') >= 0) {
             return null;
         }*/
        if (file.extname == '.js') {
            const filename = file.origin;
            if (filename == "libs/modules/promise/promise.js" || filename == 'libs/modules/promise/promise.min.js') {
                return null;
            }
            if (filename == 'libs/modules/egret/egret.js' || filename == 'libs/modules/egret/egret.min.js') {
                let content = file.contents.toString();
                content += `;window.egret = egret;`;
                content = content.replace(/definition = __global/, "definition = window");
                file.contents = new Buffer(content);
            }
            else {
                let content = file.contents.toString();
                if (
                    filename == "libs/modules/res/res.js" ||
                    filename == 'libs/modules/res/res.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.js'
                ) {
                    content += ";window.RES = RES;"
                }
                if (filename == "libs/modules/eui/eui.js" || filename == 'libs/modules/eui/eui.min.js') {
                    content += ";window.eui = eui;"
                }
                if (filename == 'libs/modules/dragonBones/dragonBones.js' || filename == 'libs/modules/dragonBones/dragonBones.min.js') {
                    content += ';window.dragonBones = dragonBones';
                }
                if (filename == 'libs/modules/gesture/gesture.js' || filename == 'libs/modules/gesture/gesture.min.js') {
                    content += ';window.GestureManager = GestureManager;window.GestureType = GestureType;window.GestureState = GestureState;';
                }
                content = "var egret = window.egret;" + content;
                if (filename == 'main.js') {
                    content += "\n;window.Main = Main;"
                }
                file.contents = new Buffer(content);
            }
        }
        return file;
    }
    async onFinish(pluginContext: plugins.CommandContext) {
        //同步 index.html 配置到 game.js
        const gameJSPath = path.join(pluginContext.outputDir, "game.js");
        if (!fs.existsSync(gameJSPath)) {
            console.log(`${gameJSPath}不存在，请先使用 Launcher 发布微信小游戏`);
            return;
        }
        let gameJSContent = fs.readFileSync(gameJSPath, { encoding: "utf8" });
        const projectConfig = pluginContext.buildConfig.projectConfig;
        const optionStr =
            `entryClassName: ${projectConfig.entryClassName},\n\t\t` +
            `orientation: ${projectConfig.orientation},\n\t\t` +
            `frameRate: ${projectConfig.frameRate},\n\t\t` +
            `scaleMode: ${projectConfig.scaleMode},\n\t\t` +
            `contentWidth: ${projectConfig.contentWidth},\n\t\t` +
            `contentHeight: ${projectConfig.contentHeight},\n\t\t` +
            `showFPS: ${projectConfig.showFPS},\n\t\t` +
            `fpsStyles: ${projectConfig.fpsStyles},\n\t\t` +
            `showLog: ${projectConfig.showLog},\n\t\t` +
            `maxTouches: ${projectConfig.maxTouches},`;
        const reg = /\/\/----auto option start----[\s\S]*\/\/----auto option end----/;
        const replaceStr = '\/\/----auto option start----\n\t\t' + optionStr + '\n\t\t\/\/----auto option end----';
        gameJSContent = gameJSContent.replace(reg, replaceStr);
        fs.writeFileSync(gameJSPath, gameJSContent);

        //修改横竖屏
        let orientation;
        // if (projectConfig.orientation == '"landscape"') {
        orientation = "portrait";
        // }
        // else {
        //     orientation = "portrait";
        // }
        const gameJSONPath = path.join(pluginContext.outputDir, "game.json");
        let gameJSONContent = JSON.parse(fs.readFileSync(gameJSONPath, { encoding: "utf8" }));
        gameJSONContent.deviceOrientation = orientation;
        fs.writeFileSync(gameJSONPath, JSON.stringify(gameJSONContent, null, "\t"));
    }
}