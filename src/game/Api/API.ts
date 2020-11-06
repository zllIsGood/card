/* 接口
 * @Author: zhoualnglang 
 * @Date: 2020-03-31 19:25:45 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 14:11:01
 */
class Api {
    /*广告配置*/
    public static AD_CONFIG = "/user/ad/getAdConfig";
    // public static AD_OPEN = "/user/version/getVersion";
    //反馈
    public static SAVE_BACK = "/user/feedback/save";

    // 用户
    public static USER_LOGIN = "/word/user/login";
    public static USER_WATCH_AD = "/word/user/watchAd";
    public static USER_SHARE_VIDEO = "/word/user/shareVideo";
    public static USER_SHARE_PROGRAM = "/word/user/shareProgram";
    public static USER_LOGIN_AWARD = "/word/user/loginAward";
    //h5积分换体力
    public static EXCHANGE_ENERGY = "/word/user/exchangeEnergy";


    //卡牌
    public static USER_LIST = "/card/card/listUserCard"; //获取卡牌列表
    public static LIST_MAT = "/card/card/listMatrix";  //获取卡阵配置
    public static SAVE_MAT = "/card/card/saveMatrix";  //保存卡阵配置
    public static START_FIGHT = "/card/card/battleStart"; //卡牌战斗开始
    public static END_FIGHT = "/card/card/battleResult";  //卡牌战斗结果
    public static FIGHT_RECORD = "/card/card/listBattle"; //卡牌战斗记录

    public static TASK_MAIN = "/card/upgrade/main"; //成长线首页
    public static TASK_LIST = "/card/upgrade/list"; //获取成长线
    public static TASK_AWARD = "/card/upgrade/draw"; //领取成长线奖励

    //宝箱
    public static MYTREASUREBOX = "/card/box/listUserBox"//我的宝箱
    public static DRAWAWARD = "/card/box/drawAward"//领取宝箱奖励
    public static UNLOCKBOX = "/card/box/unlockBox"//解锁宝箱
}
window["API"] = Api;
window["Api"] = Api;