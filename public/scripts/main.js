import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fried');

    // load socket library in and make the connection
    const socket = io();

    // messenger service event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incoming connected event with the data 
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue ({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive!!');
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous" });

                this.message = "";
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount("#app");

    socket.addEventListener("connected", setUserId);

    socket.addEventListener('message', appendMessage);
})();