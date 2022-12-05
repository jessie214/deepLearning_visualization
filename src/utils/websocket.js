const socket = {
  // websocketUrl: 'wss://www.xpms.cn:8080/websocket/', // socket监听地址
  websocketUrl: 'wss://http://10.33.0.110:8888/', // socket监听地址
  websocket: null, // websocket监听对象
  isWebSocket: false, // 是否连接
 
  // 建立连接
  created: option => {
    socket.initWebSocket(option);
  },
 
  // 断开连接
  destroyed: () => {
    if (socket && socket.websocket) {
      socket.websocket.close(); //离开路由之后断开websocket连接
    }
  },
 
  // 初始化socket信息
  initWebSocket: option => {
    const { onMessage, onError, onClose, id } = option || {};
    //初始化weosocket
    // 取用户信息，作为socketid
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    // socket信息
    socket.websocket = new WebSocket(socket.websocketUrl + (id || currentUser.id));
    socket.websocket.onmessage = onMessage || socket.websocketonmessage;
    socket.websocket.onopen = socket.websocketonopen;
    socket.websocket.onclose = onClose || socket.websocketonclose;
    socket.websocket.onerror = onError || socket.websocketonerror;
  },
 
  // 监听socket连接成功信息
  websocketonopen: () => {
    //连接建立之后执行send方法发送数据
    socket.isWebSocket = true;
    console.log('链接成功！');
  },
 
  // 监听socket连接关闭信息
  websocketonclose: () => {
    console.log('链接关闭！');
  },
 
  // socket连接失败重新建立连接
  websocketonerror: () => {
    //连接建立失败重连
    socket.initWebSocket();
  },
 
  // 监听接收消息
  websocketonmessage: e => {
    //数据接收
    console.log('redata', e.data);
  },
 
  // 发送消息
  websocketsend: data => {
    //数据发送
    // 如果未建立连接，则建立连接
    if (socket.isWebSocket) {
      socket.websocket.send(data);
    } else {
      console.log('请建立连接!');
    }
  },
 
  // 关闭连接
  websocketclose: e => {
    //关闭
    if (socket && socket.websocket) {
      socket.websocket.close();
    }
    socket.isWebSocket = false;
  },
};
export default socket;