const io = require("socket.io-client");
const { exec } = require("child_process");

const sendTerminal = (message) => {
    exec(message, {
        shell: "/bin/zsh"
    }, (error, stdout, stderr) => {
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
    console.log("toggled mute")
    isMuted = !isMuted;
    if (isMuted) {
        sendTerminal("mumble rpc starttalking");
    } else {
        sendTerminal("mumble rpc stoptalking");
    }
    socket.emit("muteStatusToggled", { data: "done", id: data.id });
});