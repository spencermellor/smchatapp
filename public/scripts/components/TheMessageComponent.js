export default {
    props: ['msg', 'socketid'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h4 class="username">{{ msg.message.name }}:</h4>
        <p>{{ msg.message.content }}</p>
    </article>
    `,

    data: function () {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }

}