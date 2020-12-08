
var fs = require('fs');

var cfg = fs.readFileSync('../resource/config/config.json', { encoding: 'utf8' })
let obj = JSON.parse(cfg)
let outobj = obj.questionConfig
for (let i in outobj) {
    outobj[i].question = deleteChangeLine(outobj[i].question)
}
fs.writeFileSync('../resource/config/config.json', JSON.stringify(obj))

function deleteChangeLine(str) {
    // let s = str.replace('\r\n', '')
    // s = s.replace('\r', '')
    let s = str.replace(/\n/g, '')
    return s
}
console.log('fin!')