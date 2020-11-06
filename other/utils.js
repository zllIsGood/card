
//nodejs
var mod = ''//'D:/Program Files/nodejs/node_modules/node_modules/'
var Excel = require(mod + 'exceljs');
var workbook = new Excel.Workbook();

var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = './';//需要遍历的文件夹
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
            if (filename.indexOf('.xlsx') >= 0) files.push(filedir);//筛选文件类型 
            // console.log(filedir);
        }
        // if (isDir) {
        //     fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        // }

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
    workbook.xlsx.readFile(filePathName)
        .then(function () {
            var worksheets = workbook.worksheets;
            for (var j in worksheets) {
                var worksheet = worksheets[j]
                if (!worksheet) continue;
                if (worksheet._rows[0] && worksheet._rows[0]._cells[0] && worksheet._rows[0]._cells[0].value == 'config'
                    && worksheet._rows[0]._cells[2]) {
                    var cfgname = worksheet._rows[0]._cells[2].value
                    config[cfgname] = {}
                    var cfg = config[cfgname]

                    var rows = worksheet._rows
                    var state = 0
                    var colN = []
                    var colAttr = []
                    for (var i in rows) {
                        var row = rows[i]
                        if (!row) continue;
                        var cells = row._cells
                        if (!cells) continue;
                        if (state == 0) {
                            var isc = false
                            for (var k in cells) {
                                var cell = cells[k]
                                if (!cell) continue;
                                var value = cell.value;

                                if (value == 'c') {
                                    colN.push(cell._column._number)
                                    isc = true
                                }
                            }
                            isc ? state = 1 : null;
                        }
                        else if (state == 1) {
                            for (let num of colN) {
                                var cell = cells[num - 1]
                                colAttr.push(cell.value)
                            }
                            state = 2
                        }
                        else {
                            var obj = {}
                            for (let i = 0; i < colN.length; i++) {
                                var cell = cells[colN[i] - 1]
                                obj[colAttr[i]] = cell ? cell.value : null
                            }
                            var firstStr = obj[colAttr[0]]
                            if (firstStr != null) {
                                cfg[firstStr] = obj
                            }
                        }
                    }
                }
                else {
                    continue
                }
            }
            pos++;
            var len = files.length
            if (pos < len) loadNext();
            else {
                console.log(config)
                fs.writeFileSync('../resource/config/config.json', JSON.stringify(config))
                console.warn('tips: finish') //
            }
        })
}