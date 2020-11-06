/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-24 11:13:39 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 14:56:14
 */
class UserModel extends BaseClass {

    public static ins(): UserModel {
        return super.ins();
    }

    public constructor() {
        super();
    }
    /**用户*/
    public token = 'token:624458313546997760'  //'token:624568812825616384'
    /**是否vip*/
    public isVip = false
    /**段位*/
    public zoomLevel = ZoomLevel.Bronze
    public zoomNum = 1 //一段
    /**判断段位是否满足*/
    private isZoomOK(lv: number, num: number, zoomLevel: number, zoomNum: number) {
        let zoomLv = zoomLevel == null ? this.zoomLevel : zoomLevel
        let zoomN = zoomNum == null ? this.zoomNum : zoomNum
        if (lv < zoomLv) {
            return true
        }
        if (lv == zoomLv && num <= zoomN) {
            return true
        }
        return false
    }
    /**技能2 段位是否满足*/
    public isZoomOK2(zoomLevel: number = null, zoomNum: number = null) {
        return this.isZoomOK(UserConst.skill2ZoomLv, UserConst.skill2ZoomNum, zoomLevel, zoomNum)
    }
    public isZoomOK3(zoomLevel: number = null, zoomNum: number = null) {
        return this.isZoomOK(UserConst.skill3ZoomLv, UserConst.skill3ZoomNum, zoomLevel, zoomNum)
    }
    /**金币*/
    private _gold = 99999
    public get gold() {
        return this._gold
    }
    public set gold(v: number) {
        this._gold = v
    }

    /**已拥有卡牌列表*/
    public userList = [
        { baseCardCount: 0, cardId: 11, id: 29, lv: 10 },
        { baseCardCount: 0, cardId: 23, id: 24, lv: 5 },
        { baseCardCount: 0, cardId: 34, id: 26, lv: 10 },
        { baseCardCount: 0, cardId: 44, id: 23, lv: 1 },
    ]
    public setUserList(data) {
        this.userList = data == null ? [] : data
        this.postUserList()
    }
    public postUserList() {

    }
    /**通过卡牌id找到*/
    public getSingleBy(cardId: number) {
        for (let item of this.userList) {
            if (item.cardId == cardId) {
                return item
            }
        }
        return null
    }
    /**卡阵*/
    public listMat = [
        { cardId: 11, position: 1 },
        { cardId: 23, position: 2 }]
    public setListMat(data) {
        this.listMat = data == null ? [] : data
        this.postListMat()
    }
    public postListMat() {

    }
    /**获取上阵的卡牌id*/
    public getListMatIds(): number[] {
        let ret = []
        if (this.listMat) {
            for (let item of this.listMat) {
                ret.push(item.cardId)
            }
        }
        return ret
    }
    /**交换卡阵位置*/
    public matSwap(pos1: number, pos2: number) {
        if (!this.listMat) {
            return
        }
        let item1 = null, item2 = null
        for (let item of this.listMat) {
            if (item.position == pos1) {
                item1 = item
            }
            else if (item.position == pos2) {
                item2 = item
            }
        }
        if (item1) {
            item1.position = pos2
        }
        if (item2) {
            item2.position = pos1
        }
    }
    public matUse(cardId: number) {
        if (!this.listMat) {
            this.listMat = []
        }
        let posObj = []
        for (let item of this.listMat) {
            if (item.cardId == cardId) {
                return
            }
            posObj[item.position] = true
        }
        for (let i = 1; i <= 6; i++) {
            if (!posObj[i]) {
                let data = this.getSingleBy(cardId)
                this.listMat.push({ cardId: data.cardId, position: i })
                this.saveMat() //!!!
                // this.postListMat() //!!!
                return
            }
        }
        wx.showToast({ icon: 'none', title: '你的卡组已满，先去移除卡牌' })
    }
    public matRemove(pos: number) { //1-6
        if (!this.listMat) {
            return
        }
        for (let i = 0; i < this.listMat.length; i++) {
            if (this.listMat[i].position == pos) {
                this.listMat.splice(i, 1)
                this.saveMat() //!!!
                // this.postListMat() //!!!
                return
            }
        }
    }

    public async getUser() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.USER_LIST),
                data: {
                    appToken: this.token
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setUserList(res.data.data)
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

    public async getListMat() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.LIST_MAT),
                data: {
                    appToken: this.token
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setListMat(res.data.data)
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
    //位置，1-6
    public async saveMat(isTest = false, matrixList = [{ cardId: 1, position: 1 }]) {
        let list
        if (!isTest) {
            list = []
            for (let item of this.listMat) {
                list.push({ cardId: item.cardId, position: item.position })
            }
        }
        else {
            list = matrixList
        }
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.SAVE_MAT),
                data: {
                    appToken: this.token,
                    matrixList: list
                },
                method: 'POST',
                success: (res) => {
                    console.log("request success!", res);
                    // if (res.data.data) {
                    UserModel.ins().getListMat()
                    // }
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
MessageCenter.compile(UserModel);