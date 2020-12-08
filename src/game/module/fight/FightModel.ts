/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-19 11:37:56 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 18:35:49
 */
class FightModel extends BaseClass {

    public static ins(): FightModel {
        return super.ins();
    }

    public constructor() {
        super();
    }
    /**获取己方 段位dan  lv  星级star*/
    public getOwnZoom() {
        if (FightManager.ins().isTest) {
            return { dan: ZoomLevel.Bronze, lv: 1, star: 1 }
        }
        let data = this.fightData.userInfo.userInfo
        return { dan: data.dan, lv: data.lv, star: data.star }
    }
    /**获取敌方 段位dan  lv  星级star*/
    public getEnemyZoom() {
        if (FightManager.ins().isTest) {
            return { dan: ZoomLevel.Bronze, lv: 1, star: 1 }
        }
        let data = this.fightData.matchInfo.userInfo
        return { dan: data.dan, lv: data.lv, star: data.star }
    }
    /**获取对战双方id*/
    public getID() {
        if (FightManager.ins().isTest) {
            if (this.isFirst) {
                return { own: 136, enemy: 317 }
            }
            else {
                return { own: 317, enemy: 136 }
            }
        }
        let own = this.fightData.userInfo.userInfo
        let enemy = this.fightData.matchInfo.userInfo
        return { own: own.userId, enemy: enemy.userId }
    }
    /**是否对战先出手*/
    public isFirst = true
    /**是否是PVP*/
    public isPVP() {
        if (FightManager.ins().isTest) {
            return false
        }
        return !!this.fightData.isPVP
    }

    public fightData: { id: number, matchInfo, userInfo, userMatrixList: any[], matchMatrixList: any[], isPVP?: boolean }
    public setFightData(data) {
        this.fightData = data
    }

    public async startFight() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.START_FIGHT),
                data: {
                    appToken: UserModel.ins().token
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setFightData(res.data.data)
                    }
                    resolve()
                },
                fail: (res) => {
                    console.log("request fail!", res);
                    TipModel.ins().show({ icon: "", title: "匹配失败，请检查网络" })
                    reject()
                }
            }
            wx.request(obj)
        })
    }

    /**
     * 设置战斗结果
     * @param  {} isWin
     */
    public setResult(isWin) {
        let data = { isWin: isWin, battleId: this.fightData.id }
        this.endFight(data)
    }

    public rewardData: { box: { boxState, boxType, id }, honor: any }//战斗结果
    public async endFight(params): Promise<any> {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.END_FIGHT),
                data: {
                    appToken: UserModel.ins().token,
                    battleId: params.battleId, //战斗id
                    isWin: params.isWin, //是否胜利 true| false
                },
                method: 'GET',
                success: (res) => {
                    console.log(Api.END_FIGHT + "request success!", res);
                    if (res.data.data) {
                        this.rewardData = res.data.data
                        this.postBattleResult()
                    }
                    resolve()
                },
                fail: (res) => {
                    console.log(Api.END_FIGHT + "request fail!", res);
                    reject()
                }
            }
            wx.request(obj)
        })
    }

    public postBattleResult() {

    }

    public fightRecord
    private setFightRecord(data) {
        this.fightRecord = data
    }

    /**卡牌战斗记录   isMatched 是否被匹配的 true | false*/
    public async getFightRecord(isMatched = true) {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.FIGHT_RECORD),
                data: {
                    appToken: UserModel.ins().token,
                    isMatched: isMatched
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setFightRecord(res.data.data)
                    }
                    resolve()
                },
                fail: (res) => {
                    console.log("request fail!", res);
                    resolve()
                }
            }
            wx.request(obj)
        })
    }
}
MessageCenter.compile(FightModel);