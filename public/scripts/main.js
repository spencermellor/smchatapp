(() => {
    console.log('fried');

    // load socket library in and make the connection
    const socket = io();

    const vm = new Vue ({
        date: {
            messages: [],
            nickname: "",
            username: ""
        },

        created: function() {
            console.log('its alive!!');
        },

        methods: {

        }

    }).$mount("#app");
})();