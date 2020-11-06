
var fs = require('fs');

var cfg = fs.readFileSync('../resource/config/config.json', { encoding: 'utf8' })
let obj = JSON.parse(cfg)
let outobj = obj.monsterConfig
for (let i in outobj) {
    outobj[i].img = 'https://cdnzmg.zmfamily.cn/' + 'card/res/herov3/' + outobj[i].img + '.png'

}
fs.writeFileSync('../resource/config/config.json', JSON.stringify(obj))

console.log('fin!')