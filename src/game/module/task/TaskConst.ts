/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-20 16:21:36 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-20 16:26:48
 */
/**奖励类型*/
const enum RewardType {
    POINTS = 0, //积分
    VIP_DAY = 1,  //vip天数
    GOLD = 2,  //趣币
    CLOCK_IN_CARD = 3,  //补签卡
    MEDAL = 4,  //徽章
    HEAD_FRAME = 5,  //头像框
    EXP = 6,  //经验值  已作废
    TEAM_LIMIT = 7,  //小组上限
    BULLET_SCREEN = 8,  //弹幕
    BUBBLE = 9,  //气泡
    CARD = 10,  //卡牌
    BOX = 11,  //宝箱
    HONOR = 12,  //荣誉值
    REAL = 13,  //实物奖励
    DRAW_COUNT = 14, //抽奖次数
    COIN = 15, //游戏币
}

class TaskConst {
    static rewardIcon = [
        { type: RewardType.HEAD_FRAME, icon: 'task_head_icon_png', lab: '头像框', },
        { type: RewardType.TEAM_LIMIT, icon: 'task_limit_icon_png', lab: '小组上限', },
        { type: RewardType.BULLET_SCREEN, icon: 'task_pop_icon_png', lab: '个性弹幕', },
        { type: RewardType.VIP_DAY, icon: 'task_vip_icon_png', lab: 'VIP会员', },
        { type: RewardType.BUBBLE, icon: 'task_bubble_icon_png', lab: '聊天气泡', },
    ]
}

type AwardList = {
    type: number,
    award: number,
    awardDesc: string,
}