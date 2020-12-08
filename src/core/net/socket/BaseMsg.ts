/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-23 17:00:40 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-12-02 12:16:11
 */
class BaseMsg {

    private _msgBuffer: string;

    /**
     * 接收消息处理
     * @param msg
     */
    public receive(socket: egret.WebSocket): void {
        this._msgBuffer = socket.readUTF();
        console.log(this._msgBuffer)
        MessageCenter.ins().dispatch(SocketConst.SOCKET_DATA, this._msgBuffer)
    }

    /**
     * 发送消息处理
     * @param msg
     */
    public send(socket: egret.WebSocket, action: BaseMsgAction, msg: string): void {
        let newmsg = new Message()
        newmsg.nick = "cbs"
        newmsg.msg = msg
        newmsg.action = action
        let utf = JSON.stringify(newmsg)
        // console.log('socket send:', utf)
        socket.writeUTF(utf)
    }

}

class Message {
    public action: BaseMsgAction

    public msg: string

    public nick: string
}

enum BaseMsgAction {
    LOGIN = 'LOGIN', //登录  msg->  { own: 317, enemy: 136 }
    LOGINED = 'LOGINED', //登录ok  s2c
    RELOGIN = 'RELOGIN', //重登录  msg->  { own: 317, enemy: 136 }
    RECONECT = 'RECONECT', //重连了 s2c
    SEND_OTHER = 'SEND_OTHER', //发送给另一个    {mode: 0结束 1播放 2获取下一个回合战斗数据 3能量值, round:回合战斗数据, energy:能量值, roundNum}
    TIMEOUT = 'TIMEOUT'//超时
}