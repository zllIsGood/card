/*
 * @Author: gravitycat 
 * @Date: 2020-09-19 15:15:21 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 15:11:36
 */
class SkillType41 extends SkillTypeBase{
    skilltype = 1041

    initValue(str: string) {
        let arr = str.split(';')
        let ret = []
        for (let i = 0; i < arr.length; i++) {
            ret.push(Number(arr[i]))
        }
        return ret
    }

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        let num = vals[1]
        let ram = vals[0]
        let bool = Math.random()<=ram
        if(bool){
            entity.updateDamage(num,true)
        }
      
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.attackOther, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType41())