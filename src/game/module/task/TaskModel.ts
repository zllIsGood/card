/* 成长线
 * @Author: zhoulanglang 
 * @Date: 2020-10-19 14:07:13 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 17:41:04
 */
class TaskModel extends BaseClass {

    public static ins(): TaskModel {
        return super.ins();
    }

    public constructor() {
        super();
    }

    public main: { awardList: AwardList[], dan: number, lv: number, star: number, honor: number }
    private setMain(data) {
        this.main = data
    }

    /**成长线首页*/
    public async getMain() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.TASK_MAIN),
                data: {
                    appToken: UserModel.ins().token,
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setMain(res.data.data)
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

    public list
    private setList(data) {
        this.list = data
    }

    /**获取成长线*/
    public async getList() {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.TASK_LIST),
                data: {
                    appToken: UserModel.ins().token,
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {
                        this.setList(res.data.data)
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

    /**领取成长线奖励*/
    public async getAward(upgradeId = 1) {
        return new Promise((resolve, reject) => {
            let obj = {
                url: encodeURI(Main.host + Api.TASK_AWARD),
                data: {
                    appToken: UserModel.ins().token,
                    upgradeId: upgradeId
                },
                method: 'GET',
                success: (res) => {
                    console.log("request success!", res);
                    if (res.data.data) {

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
MessageCenter.compile(TaskModel);