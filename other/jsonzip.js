
//nodejs
var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = '../resource/res/skill/';//需要遍历的文件夹
// var filePath = path.resolve('F:/xmsy2/wdws2_branch_3_2_15/value');//需要遍历的文件夹
var files = []
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    var ff = fs.readdirSync(filePath)
    //遍历读取到的文件列表
    ff.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        var stats = fs.statSync(filedir)
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if (isFile) {
            // if (filename.indexOf('W-物品配置表.xlsx') >= 0) return files.push(filedir);
            if (filename.indexOf('~$') >= 0) return;
            if (filename.indexOf('.json') >= 0) files.push(filedir);//筛选文件类型 
            // console.log(filedir);
        }
        if (isDir) {
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }

    });
}
var len = files.length
// console.log(files);
var pos = 0
var config = {}
loadNext();
function loadNext() {
    var filePathName = files[pos]
    var len = files.length
    console.log(pos + 1, len, filePathName);
    let str = fs.readFileSync(filePathName, { encoding: 'utf8' })
    let obj = JSON.parse(str)
    fs.writeFileSync(filePathName, JSON.stringify(obj))

    pos++;
    if (pos < len) loadNext();
    else {
        console.warn('tips: finish') //
    }
}