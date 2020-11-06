
/* 属性
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 14:56:51 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 16:08:14
 */

/**状态消息*/
enum MessageType {
    harmOtherAd = 1, //对敌物理伤害
    harmOtherAp, //对敌法术伤害
    harmeAd, //受到物理伤害
    harmeAp, //受到法术伤害
    harmeAdAndOther, //受到物理攻击时，使对方燃烧*****
    attackOther,//攻击时
    dieing, //死亡时 可能转生
    die, //死亡时
}
/**伤害结算用*/
type ComputeData = {
    harm?: number, //初步伤害
    lock?: boolean,
    harmHp?: number, //伤害结算值
    isDef?: boolean, //防御 闪避伤害 
    isDefAp?: boolean,//法术免疫
    isHarmAd?: boolean, //是否物理伤害
    atkBack?: number,  //反击伤害
    dieContract?: number,//死契id
    dieBoom?: { harm: number, pos: number },//自爆 pos-1为全部   -2无自爆对象
    adSubHarm?: number, //物理伤害减少
    apSubHarm?: number, //法术伤害减少
    maxApHarm?: number,//最大承受法术伤害
    maxAdHarm?: number,//最大承受物理伤害
    isRevive?: boolean, //复活
    reHp?: number, //转生后恢复的血量
    triggerBurn?: number,//摧毁   1摧毁    2摧毁但是不受摧毁技能影响
    damage?: number,//攻击力增加或减少
    damageUp?: number,// 提升{50%}的攻击力。

    notActive?: boolean, //无法进行下一回合的行动
    notAp?: boolean, //无法进行下一回合的法术攻击
    atkEndHarm?: number, //毒液* 攻击回合结束后受到*点伤害
    notRestore?: boolean,//无法回血debuff
    fireEndHarm?: number,//燃烧伤害,攻击回合结束后受到*点伤害
}
/**buff结算用*/
type ComputeBuff = {
    notActive?: boolean, //无法进行下一回合的行动
    notAp?: boolean, //无法进行下一回合的法术攻击
    atkEndHarm?: number, //毒液* 攻击回合结束后受到*点伤害
    notRestore?: boolean,//无法回血debuff
    fireEndHarm?: number,//燃烧伤害,攻击回合结束后受到*点伤害

    notBurn?: boolean,//不动  无法受到摧毁技能效果
    isDefAp?: boolean,//法术免疫  不受到任何法术造成的伤害及影响。
    adSubHarm?: number, //物理伤害减少
    apSubHarm?: number, //法术伤害减少
    maxApHarm?: number,//最大承受法术伤害
    maxAdHarm?: number,//最大承受物理伤害

    canRevive?: boolean,//带复活技能
    dieContract?: boolean,//带死契
    dieBoom?: boolean,//带自爆
}

const cardFrame: { [key: number]: string } = {
    1: "frame_black_png",
    2: "frame_ice_png",
    3: "frame_fire_png",
    4: "frame_thunder_png",
    5: "frame_sheng_png",
    6: "frame_hp_png",
    7: "frame_ad_png"
}
const cardFrameMini: { [key: number]: string } = {
    1: "frame_black_mini_png",
    2: "frame_ice_mini_png",
    3: "frame_fire_mini_png",
    4: "frame_thunder_mini_png",
    5: "frame_sheng_mini_png",
    6: "frame_hp_mini_png",
    7: "frame_ad_mini_png"
}
const cardFrameNew: { [key: number]: string } = {
    1: "boder_lvse1_png",
    2: "boder_huangse2_png",
    3: "boder_lanse3_png",
    4: "boder_zise4_png",
}

const SKILLICON = ['skill_icon1_png', 'skill_icon2_png', 'skill_icon3_png', 'skill_icon4_png', 'skill_icon5_png']

