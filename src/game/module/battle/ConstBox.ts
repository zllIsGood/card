const boxType: { [key: number]: string } = {
    1: "box_qingtong_png",//青铜
    2: "box_baijin_png",//白银
    3: "box_huangjin_png"//黄金
}

const boxState: { [key: number]: string } = {
    1: "isntunlock_png",//未解锁
    2: "unlocking_png",//解锁中
    3: "isunlock_png",//已解锁
    4: "hasdraw"//已领取
}

//打开的宝箱
const boxTypeOpen: { [key: number]: string } = {
    1: "box_qingtong_opened_png",//青铜
    2: "box_baijin_opened_png",//白银
    3: "box_huangjin_opened_png"//黄金
} 