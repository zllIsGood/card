import * as fs from 'fs';
import * as path from 'path';
export class H5Plugin implements plugins.Command {

    constructor() {
    }
    async onFile(file: plugins.File) {
        if (file.path.indexOf('resource\\assets\\') >= 0) {
            if (file.path.indexOf('resource\\assets\\fnt\\') >= 0 ||
                file.path.indexOf('resource\\assets\\cardFrame\\') >= 0 ||
                file.path.indexOf('resource\\assets\\heroui\\') >= 0 ||
                file.path.indexOf('resource\\assets\\music\\') >= 0 ||
                file.path.indexOf('resource\\assets\\fight\\') >= 0 ||
                file.path.indexOf('resource\\assets\\answerui\\') >= 0 ||
                file.path.indexOf('resource\\assets\\skillname\\') >= 0) {
                return file;
            }
            return null;
        }
        return file;
    }
    async onFinish(pluginContext: plugins.CommandContext) {

    }
}