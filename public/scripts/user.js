(() => {

  const user = new Vue({
    data: {
      username: ''
    },
    methods: {
      joinChat(isAnonymous) {
        // if username save to localstorage
        if (isAnonymous || !this.username) {
          localStorage.removeItem('username');
        } else {
          localStorage.setItem('username', this.username);
        }
        window.location.href = '/chat';
      },
    }
  })

  user.$mount('#user')

})();