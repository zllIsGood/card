/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-16 15:54:46 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-16 17:14:45
 */
class HomeTsetWin extends BaseEuiView {

    fightBtn: BaseBtn
    stratBtn: BaseBtn
    inBtn: BaseBtn
    lvBtn: BaseBtn
    pvpBtn1: BaseBtn
    pvpBtn2: BaseBtn
    editTxt: eui.EditableText
    editTxt2: eui.EditableText
    constructor() {
        super();
        this.skinName = `HomeTsetSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.fightBtn, this.onClick);
        this.addTouchEvent(this.stratBtn, this.onClick);
        this.addTouchEvent(this.inBtn, this.onClick);
        this.addTouchEvent(this.lvBtn, this.onClick);
        this.addTouchEvent(this.pvpBtn1, this.onClick);
        this.addTouchEvent(this.pvpBtn2, this.onClick);

        this.upView()
    }

    private upView() {
        this.editTxt.visible = true //false
        this.editTxt2.visible = true // false
    }



    public close(...param: any[]): void {

    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.fightBtn:
                ViewManager.ins().close(this)
                FightManager.ins().play(true)
                break;
            case this.inBtn:
                this.editTxt.visible = true
                break;
            case this.lvBtn:
                this.editTxt2.visible = true
                break;
            case this.stratBtn:
                // this.editTxt.visible = false
                let lab = this.editTxt.text
                let lab2 = this.editTxt2.text
                if (lab && lab2) {
                    let arr = lab.split('_')
                    let lvs = lab2.split('_')
                    if (arr.length == 12 && lvs.length == 12) {
                        let lists = GlobalConfig.testCfg
                        let enemy = []
                        let our = []
                        let cfgs = GlobalConfig.config.monsterConfig
                        for (let i = 0; i < 6; i++) {
                            let id = Number(arr[i])
                            if (cfgs[id]) {
                                let lv = Number(lvs[i])
                                lv = (lv >= 1 && lv <= 10) ? lv : 10
                                cfgs[id].lv = lv // 10
                                our.push(cfgs[id])
                            }
                            else {
                                our.push(null)
                            }
                        }
                        for (let i = 6; i < 12; i++) {
                            let id = Number(arr[i])
                            if (cfgs[id]) {
                                let lv = Number(lvs[i])
                                lv = (lv >= 1 && lv <= 10) ? lv : 10
                                cfgs[id].lv = lv // 10
                                enemy.push(cfgs[id])
                            }
                            else {
                                enemy.push(null)
                            }
                        }
                        GlobalConfig.testCfg = { enemy: enemy, our: our }
                        // ViewManager.ins().close(this) 
                        this.setVisible(true) //
                        FightManager.ins().play(true)
                        return
                    }
                }
                wx.showToast({ icon: 'none', title: `输入错误` })
                break;
            case this.pvpBtn1:
                FightModel.ins().isFirst = true
                this.playPVP()
                break;
            case this.pvpBtn2:
                FightModel.ins().isFirst = false
                this.playPVP()
                break;
        }
    }

    private playPVP() {
        FightModel.ins().setFightData({
            "id": 1240,
            "insertTime": "2020-12-01 17:37:41",
            "isFin": false,
            "isVip": false,
            "level": 3,
            "matchId": 317,
            "matchInfo": {
                "cbTotal": 12,
                "cbWin": 11,
                "id": 103,
                "insertTime": "2020-10-28 15:45:07",
                "isAdmin": false,
                "isBan": false,
                "isMaster": false,
                "isQuit": false,
                "joinTime": 1603871107151,
                "noDisturb": false,
                "pdTotal": 1,
                "pdWin": 1,
                "quitTime": 0,
                "tribeId": 0,
                "updateTime": "2020-12-01 16:14:17",
                "userId": 317,
                "userInfo": {
                    "area": "全国",
                    "avatar": "http://zm-data-dub.oss-cn-shenzhen.aliyuncs.com/material/2019-11-30/izvIRaTq-517963098531958784.png",
                    "bubbleType": 0,
                    "coin": 0,
                    "commentCount": 0,
                    "coopWorksCount": 0,
                    "dailyExp": 0,
                    "dan": 1,
                    "danExp": 0,
                    "danImgUrl": "http://cdndev.zmfamily.cn/material/2020-06-28/sepiCo1C-594460197691461632.png",
                    "dubLevel": 0,
                    "fansCount": 0,
                    "gender": 0,
                    "gold": 0,
                    "honor": 10,
                    "isCertTeacher": false,
                    "isConfluence": false,
                    "isFans": false,
                    "isShowCrown": false,
                    "isSub": false,
                    "isSysLimit": false,
                    "level": 0,
                    "likeCount": 0,
                    "lv": 2,
                    "medals": [],
                    "myLikeCount": 0,
                    "nickname": "在回忆里流浪",
                    "points": 0,
                    "relation": 0,
                    "role": 0,
                    "specialRoles": [],
                    "star": 1,
                    "subCount": 0,
                    "subscribeCount": 0,
                    "teamCount": 0,
                    "totalExp": 0,
                    "userId": 317,
                    "username": "634333597867839488",
                    "worksCount": 0
                }
            },
            "matchMatrixList": [
                {
                    "cardId": 22,
                    "id": 205,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 1,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                },
                {
                    "cardId": 49,
                    "id": 206,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 2,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                },
                {
                    "cardId": 50,
                    "id": 207,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 3,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                },
                {
                    "cardId": 58,
                    "id": 208,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 4,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                },
                {
                    "cardId": 85,
                    "id": 209,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 5,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                },
                {
                    "cardId": 88,
                    "id": 210,
                    "insertTime": "2020-11-05 15:23:07",
                    "lv": 2,
                    "position": 6,
                    "updateTime": "2020-11-05 15:23:07",
                    "userId": 317
                }
            ],
            "updateTime": "2020-12-01 17:37:41",
            "userId": 136,
            "userInfo": {
                "cbTotal": 295,
                "cbWin": 79,
                "id": 130,
                "insertTime": "2020-11-05 10:29:33",
                "isAdmin": false,
                "isBan": false,
                "isMaster": false,
                "isQuit": false,
                "joinTime": 1604543373460,
                "noDisturb": false,
                "pdTotal": 0,
                "pdWin": 0,
                "quitTime": 0,
                "tribeId": 5,
                "updateTime": "2020-12-01 17:17:58",
                "userId": 136,
                "userInfo": {
                    "area": "全国",
                    "avatar": "http://cdndev.zmfamily.cn/upload/2020-12-01/IMG_CMP_20201201_17211404.jpeg",
                    "bubbleType": 0,
                    "coin": 0,
                    "commentCount": 0,
                    "coopWorksCount": 0,
                    "dailyExp": 0,
                    "dan": 2,
                    "danExp": 0,
                    "danImgUrl": "http://cdndev.zmfamily.cn/material/2020-06-28/YyBORTJK-594461733951770624.png",
                    "dubLevel": 0,
                    "fansCount": 0,
                    "gender": 0,
                    "gold": 0,
                    "honor": 9210,
                    "isCertTeacher": false,
                    "isConfluence": false,
                    "isFans": false,
                    "isShowCrown": false,
                    "isSub": false,
                    "isSysLimit": false,
                    "level": 0,
                    "likeCount": 0,
                    "lv": 1,
                    "medals": [],
                    "myLikeCount": 0,
                    "nickname": "小天天",
                    "points": 0,
                    "relation": 0,
                    "role": 0,
                    "specialRoles": [],
                    "star": 1,
                    "subCount": 0,
                    "subscribeCount": 0,
                    "teamCount": 0,
                    "totalExp": 0,
                    "userId": 136,
                    "username": "18779863474",
                    "worksCount": 0
                }
            },
            "userMatrixList": [
                {
                    "cardId": 1,
                    "id": 1040,
                    "insertTime": "2020-12-01 14:20:08",
                    "lv": 1,
                    "position": 1,
                    "updateTime": "2020-12-01 14:20:08",
                    "userId": 136
                },
                {
                    "cardId": 2,
                    "id": 1041,
                    "insertTime": "2020-12-01 14:20:08",
                    "lv": 2,
                    "position": 2,
                    "updateTime": "2020-12-01 14:20:08",
                    "userId": 136
                },
                {
                    "cardId": 15,
                    "id": 1042,
                    "insertTime": "2020-12-01 14:20:08",
                    "lv": 1,
                    "position": 3,
                    "updateTime": "2020-12-01 14:20:08",
                    "userId": 136
                },
                {
                    "cardId": 14,
                    "id": 1043,
                    "insertTime": "2020-12-01 14:20:08",
                    "lv": 1,
                    "position": 4,
                    "updateTime": "2020-12-01 14:20:08",
                    "userId": 136
                },
                {
                    "cardId": 3,
                    "id": 1044,
                    "insertTime": "2020-12-01 14:20:08",
                    "lv": 1,
                    "position": 5,
                    "updateTime": "2020-12-01 14:20:08",
                    "userId": 136
                }
            ]
        })
        if (!FightModel.ins().isFirst) {
            let data = FightModel.ins().fightData
            let temp = data.matchInfo
            data.matchInfo = data.userInfo
            data.userInfo = temp
            temp = data.matchMatrixList
            data.matchMatrixList = data.userMatrixList
            data.userMatrixList = temp
        }
        FightModel.ins().fightData.isPVP = true
        FightManager.ins().play()
    }
}
ViewManager.ins().reg(HomeTsetWin, LayerManager.UI_Main2);