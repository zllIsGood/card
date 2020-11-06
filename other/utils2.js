
var fs = require('fs');

var cfg = fs.readFileSync('../resource/config/config.json', { encoding: 'utf8' })
let obj = JSON.parse(cfg)
let outobj = obj.monsterConfig
let outarr = []
for (let i in outobj) {
    outobj[i].img = 'https://cdnzmg.zmfamily.cn/' + 'card/res/herov3/' + outobj[i].img + '.png'
    let lvLife = ''
    let lvAtk = ''
    let curLife = 0
    let curAtk = 0
    for (let n = 1; n <= 10; n++) {
        if (n == 1) {
            curLife += outobj[i].life
        }
        else {
            curLife += outobj[i].lifePro
            lvLife += '_'
        }
        lvLife += curLife
    }
    for (let n = 1; n <= 10; n++) {
        if (n == 1) {
            curAtk += outobj[i].attack
        }
        else {
            curAtk += outobj[i].atkPro
            lvAtk += '_'
        }
        lvAtk += curAtk
    }
    outobj[i].lvLife = lvLife
    outobj[i].lvAtk = lvAtk
    outarr.push(outobj[i])
}
fs.writeFileSync('./serverConfig.json', JSON.stringify(outarr))

let outobj2 = obj.skillConfig
let outarr2 = []
for (let i in outobj2) {
    outarr2.push(outobj2[i])
}
fs.writeFileSync('./serverSkillConfig.json', JSON.stringify(outarr2))
console.log('fin!')