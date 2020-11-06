/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 12:27:18 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 12:31:02
 */
class SkillType8 extends SkillTypeBase {
    skilltype = 1008

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let hp = skill.value[1]
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.harmHp(hp, skill.harmType, entity.pos)
                if (enemy.computeData.harmHp > 0) { //使敌方*张卡受到*点伤害后给自己加相同的血量
                    entity.harmHp(-enemy.computeData.harmHp, 4)
                }
            }
        }
        return { atker: entity, atked: atked }
    }

    initValue(str: string) {
        let arr = str.split(';')
        let ret = []
        for (let i = 0; i < arr.length; i++) {
            ret.push(Number(arr[i]))
        }
        return ret
    }
}
SkillTypeBase.setType(new SkillType8())