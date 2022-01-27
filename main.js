const io = require("socket.io-client");
const { execFile } = require("child_process");

const sendTerminal = (message) => {
    execFile('mumble', ['rpc',message], (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

const socket = io('http://localhost:8249');

let isMuted = true;

socket.on("getMuteStatus", function (data) {
    socket.emit("muteStatus", { data: isMuted ? "chromeMute:muted" : "chromeMute:unmuted", id: data.id });
  
});
  
socket.on("toggleMuteStatus", function (data) {
    isMuted = !isMuted;
    if (isMuted) {
        sendTerminal("starttalking");
    } else {
        sendTerminal("stoptalking");
    }
    socket.emit("muteStatusToggled", { data: "done", id: data.id });
});