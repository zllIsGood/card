class TreasureModel extends BaseClass {
    public static ins(): TreasureModel {
        return super.ins()
    }

    public constructor() {
        super();
    }

    //我的宝箱data
    treasureboxData: any

    /**
     * 获取我的宝箱列表
     */
    public async getMyTreasureBox() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.MYTREASUREBOX),
                data: {
                    appToken: UserModel.ins().token
                },
                method: 'GET',
                success: (res) => {
                    console.log(Api.MYTREASUREBOX, "request success!", res);
                    if (res.data.data) {
                        this.treasureboxData = res.data.data
                        this.postTreasureBox()
                    }
                    resolve()
                },
                fail: (res) => {
                    console.log(Api.MYTREASUREBOX, "request fail!", res);
                    reject()
                }
            }
            wx.request(obj)
        })
    }

    /**
     * 解锁宝箱
     */
    public async openTreasureBox(boxid: number) {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.UNLOCKBOX),
                data: {
                    appToken: UserModel.ins().token,
                    boxId: boxid
                },
                method: 'GET',
                success: (res) => {
                    console.log(Api.UNLOCKBOX, "request success!", res);
                    if (res.data.data) {
                        this.getMyTreasureBox()
                        resolve()
                    }
                    else {
                        reject()
                    }

                },
                fail: (res) => {
                    console.log(Api.UNLOCKBOX, "request fail!", res);

                }
            }
            wx.request(obj)
        })
    }

    drawTreasureData: { awardDataList: Array<{ count: number, type: number, card?: any }> }
    /**
     * 领取/打开宝箱
     */
    public async drawTreasureBox(boxid: number) {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.DRAWAWARD),
                data: {
                    appToken: UserModel.ins().token,
                    boxId: boxid
                },
                method: 'GET',
                success: (res) => {
                    console.log(Api.DRAWAWARD, "request success!", res);
                    if (res.data.data) {
                        this.drawTreasureData = res.data.data
                        this.getMyTreasureBox()
                    }
                    resolve()
                },
                fail: (res) => {
                    console.log(Api.DRAWAWARD, "request fail!", res);
                    reject()
                }
            }
            wx.request(obj)
        })
    }
    public postTreasureBox() {

    }
}

MessageCenter.compile(TreasureModel);