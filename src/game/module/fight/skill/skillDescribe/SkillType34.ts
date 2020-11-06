/*
 * @Author: gravitycat 
 * @Date: 2020-09-19 17:20:38 
 * @Last Modified by:   gravitycat 
 * @Last Modified time: 2020-09-19 17:20:38 
 */
class SkillType34 extends SkillTypeBase{
    skilltype = 1034

    handle(entity: NewMonsterEntity, skillId, parms:NewMonsterEntity[]) {  
        for(let atked of parms){
            atked.setNotRestore();
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAd, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType34())