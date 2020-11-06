/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-10 15:55:12 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 15:40:10
 */
class SkillManager extends BaseClass {
    public static ins(): SkillManager {
        return super.ins();
    }

    public constructor() {
        super();
    }

    initDgFactory() {
        var dgList = GlobalConfig.dgcf.dg;
        for (let i of dgList) {
            var dbName: string = i.armature.split('_')[1]
            var skeletonData: any
            var texturePng: egret.Texture
            var textureData: any
            skeletonData = RES.getRes(dbName + "_ske_json")
            texturePng = RES.getRes(dbName + "_tex_png")
            textureData = RES.getRes(dbName + "_tex_json")
            if (skeletonData && texturePng && textureData) {
                this.initArmature(skeletonData, texturePng, textureData, dbName, i.action)
            }
        }
    }

    initArmature(skeletonData, texturePng, textureData, name: string, action) {
        if (undefined != skeletonData && undefined != texturePng && undefined != textureData) {
            DragonBonesFactory.ins().initArmatureFile(skeletonData, texturePng, textureData);
            // let dbe = new DragonBonesManage();
            // this.effectArmature[name] = dbe
            // dbe.register(DragonBonesFactory.ins().makeArmature("armature_" + name, name, 1), action)
        }
    }

    /*play0(pos_s = 0, pos_e = 7) {
        let mapView = FightManager.ins().mapView

        let mc = ObjectPool.pop('MovieClip') as MovieClip
        mapView._effTopLayer.addChild(mc)

        let selfThis = this
        mc.addEventListener(egret.Event.CHANGE, function () {
            mc.removeEventListener(egret.Event.CHANGE, arguments.callee, selfThis)
            let t = 300 //mc.playTime / 1.3
            let tw = egret.Tween.get(mc)
            tw.to({ x: end.x, y: end.y }, t)
        }, this)

        let star = FightData.points[pos_s]
        let end = FightData.points[pos_e]
        mc.x = star.x
        mc.y = star.y
        mc.playFile('fashi05', 1, () => {
            mc.destroy()
        }, false)
    }*/

    playSkillEff(pos: number, skillStr: string, rate = 1, isbuff = false) {
        let charMonster = FightManager.ins().charMonsters[pos]
        let hasBuff = true
        if (isbuff) {
            hasBuff = charMonster.hasBuff(skillStr)
            if (hasBuff) {
                return
            }
        }
        //播放技能音效
        // console.log(SkillTypeBase.SkillSound[skillStr], skillStr)
        if (SkillTypeBase.SkillSound[skillStr] != undefined) {
            SoundManager.ins().playEffect(SkillTypeBase.SkillSound[skillStr] + "_mp3")
        }
        let mapView = FightManager.ins().mapView
        let mc
        //根据技能名称是否为数字判断龙骨动画
        if (!StringUtils.isNumber(skillStr)) {
            //this.playtestDragonbones(pos, skillStr)
            //var action = skillStr.indexOf('_') > 0 ? skillStr.split('_')[1] : skillStr;
            let actions: string[] = [skillStr]
            if (skillStr.indexOf('_') > 0) {
                actions[0] = skillStr.split('_')[1]
                skillStr = skillStr.split('_')[0]
            }
            mc = new DragonBonesManage() // ObjectPool.pop("DragonBonesManage") as DragonBonesManage
            mc.register(DragonBonesFactory.ins().makeArmature("armature_" + skillStr, skillStr, rate), actions)
            if (mc.play(actions[0], isbuff ? 0 : 1)) {
                mc.armature.getClock().timeScale = rate
            }
        }
        else {
            mc = ObjectPool.pop('MovieClip') as MovieClip
            mc.rate = rate
            if (!isbuff) {
                mc.playFile(skillStr, 1, () => {
                    mc.destroy()
                }, false)
            }
            else {
                mc.playFile(skillStr, -1)
            }
        }

        mapView._effTopLayer.addChild(mc)
        let star = pos == -1 ? { x: 375, y: 610 } : FightData.points[pos]
        let dx = 0, dy = 0, dscalex = 1, dscaley = 1
        if (this.xydata[skillStr]) {
            dx = this.xydata[skillStr].dx
            dy = this.xydata[skillStr].dy
            if (ObjectUtil.isNotNull(this.xydata[skillStr].scale)) dscaley = dscalex = this.xydata[skillStr].scale
        }
        mc.x = star.x + dx
        mc.y = star.y + dy
        mc.scaleX = dscalex
        mc.scaleY = dscaley

        if (!hasBuff) {
            charMonster.addBuff(skillStr, mc)
        }
    }

    /**技能坐标比例*/
    private xydata = {
        "bloodatk": { dx: 0, dy: 0 },//血滴攻击
        "atk": { dx: 0, dy: 80 },//攻击力上升下降 atk_up atk_down
        '1001': { dx: 0, dy: 10 },//恢复血量
        '1004': { dx: 0, dy: 0 },//陷阱特效 
        '1005': { dx: -68, dy: -100 },//落雷
        '10051': { dx: -68, dy: -100 },//落雷 无法进行法术攻击buff
        '1006': { dx: -90, dy: -140, scale: 0.95 },//冰冻
        '10061': { dx: -68, dy: -100 },//冰冻失去下一回合行动buff
        '1007': { dx: 0, dy: 0 },//火球
        '1008': { dx: 0, dy: 0 },//血炼攻击
        '1009': { dx: 0, dy: 0, scale: 1 },//毒液攻击 
        '10091': { dx: 0, dy: 0, scale: 1 },//毒液攻击->中毒buff
        '1010': { dx: 0, dy: 0, scale: 1 },//物理盾牌
        '1011': { dx: 0, dy: 0, scale: 1 },//法术盾牌
        '1014': { dx: 0, dy: 0, scale: 1 },//狙击
        '1015': { dx: -70, dy: -100 },//普通物理攻击  横扫
        '1019': { dx: 0, dy: 0, scale: 1 },//转生
        '1024': { dx: 10, dy: 0 },//被消灭时对敌方产生爆炸效果
        '1028': { dx: 0, dy: 0, scale: 1 },//降低血量
        '1029': { dx: 0, dy: 0, scale: 1 },//坟墓召唤 复活
        '1030': { dx: 0, dy: 0, scale: 1 },//摧毁
        '1031': { dx: 0, dy: 0 },//燃烧
        '1032': { dx: -68, dy: -100 },//燃烧debuff
        '1033': { dx: 0, dy: 0 },//冰甲-> 每次最多承受**点物理伤害。
        "10341": { dx: 0, dy: 0, scale: 1 },//裂伤->无法回血buff 
        "1037": { dx: 0, dy: 0, scale: 1 },//免疫->不受到任何法术造成的伤害及影响。
        "1039": { dx: -70, dy: -100, scale: 1 },//闪避
        "1042": { dx: 0, dy: 0, scale: 1 },// 普通物理攻击
        "10432": { dx: 0, dy: 0, scale: 1 },//  普通攻击-> 雷电攻击
        "10434": { dx: 0, dy: 0, scale: 1 },// 普通攻击-> 冰球攻击
    }
}