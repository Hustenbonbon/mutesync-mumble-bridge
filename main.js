const io = require("socket.io-client");
const net = require("net");

const sendSocket = (message) => {
    mumbleClient.write(`<self><${message}>${message}</${message}></self>`);
}

const socket = io('http://localhost:8249');
const mumbleClient = net.connect(`${process.env.HOME}/.MumbleSocket`);

let isMuted = true;

socket.on("getMuteStatus", function (data) {
    socket.emit("muteStatus", { data: isMuted ? "chromeMute:muted" : "chromeMute:unmuted", id: data.id });
});
  
socket.on("toggleMuteStatus", function (data) {
    if (isMuted) {
        sendSocket("starttalking");
    } else {
        sendSocket("stoptalking");
    }
    isMuted = !isMuted;
    socket.emit("muteStatusToggled", { data: "done", id: data.id });
});