/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:39:54
 */
class SkillType23 extends SkillTypeBase {
    skilltype = 1023

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let damage = skill.value[1]
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.updateDamage(damage)
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
SkillTypeBase.setType(new SkillType23())