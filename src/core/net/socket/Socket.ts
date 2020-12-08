/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-23 15:40:06 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-12-02 12:32:30
 */

class Socket extends BaseClass {
    private _needReconnect: boolean = false;
    private _maxReconnectCount = 10;

    private _reconnectCount: number = 0;
    private _connectFlag: boolean;
    private _host: string;
    private _port: number;
    private _socket: egret.WebSocket;
    private _msg: BaseMsg = new BaseMsg()
    private _isConnecting: boolean;

    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    public static ins(): Socket {
        return super.ins();
    }

    /**
     * 添加事件监听
     */
    private addEvents() {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 移除事件监听
     */
    private removeEvents(): void {
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }

    /**
     * 服务器连接成功
     */
    private onSocketOpen(): void {
        this._reconnectCount = 0;
        console.log('connection succeed')
        if (this._connectFlag) {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_RECONNECT);
        } else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_CONNECT);
        }

        this._connectFlag = true;
        this._isConnecting = true;
    }

    /**
     * 服务器断开连接
     */
    private onSocketClose(): void {
        if (this._needReconnect) {
            this.reconnect();
            MessageCenter.ins().dispatch(SocketConst.SOCKET_START_RECONNECT);
        } else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_CLOSE);
        }
        this._isConnecting = false;
    }

    /**
     * 服务器连接错误
     */
    private onSocketError(): void {
        if (this._needReconnect) {
            this.reconnect();
        } else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_NOCONNECT);
        }
        this._isConnecting = false;
    }

    /**
     * 收到服务器消息
     * @param e
     */
    private onReceiveMessage(e: egret.Event): void {
        this._msg.receive(this._socket);
    }

    /**
     * 初始化服务区地址
     * @param host IP
     * @param port 端口
     * @param msg 消息发送接受处理类
     */
    public initServer(host: string, port: number): void {
        this._host = host;
        this._port = port;
    }

    /**
     * 开始Socket连接
     */
    public connect(): void {
        this._socket = new egret.WebSocket();
        Log.trace("WebSocket: " + this._host + ":" + this._port);
        //this._socket.connect(this._host, this._port);
        this._socket.connectByUrl(`ws://${this._host}:${this._port}/ws`)
        this.addEvents();
        this._needReconnect = true
    }

    /**
     *
     * 重新连接
     */
    private reconnect(): void {
        this.close(false);
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        } else {
            this._reconnectCount = 0;
            if (this._connectFlag) {
                MessageCenter.ins().dispatch(SocketConst.SOCKET_CLOSE);
            } else {
                MessageCenter.ins().dispatch(SocketConst.SOCKET_NOCONNECT);
            }
        }
    }

    /**
     * 发送消息到服务器
     * @param msg
     */
    public send(action: BaseMsgAction, msg: string): void {
        if (!this._socket) {
            return console.log('socket has close!')
        }
        this._msg.send(this._socket, action, msg);
    }

    /**
     * 关闭Socket连接
     */
    public close(flag = true): void {
        if (this._socket) {
            this.removeEvents();
            this._socket.close();
        }
        this._socket = null;
        this._isConnecting = false;
        if (flag) {
            this._connectFlag = false;
        }
        this._needReconnect = false
    }

    /**
     * Socket是否在连接中
     * @returns {boolean}
     */
    public isConnecting(): boolean {
        return this._isConnecting;
    }

}