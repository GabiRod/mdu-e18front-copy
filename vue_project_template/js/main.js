"use strict";

let app = new Vue({
  el: '#app',
  data: {
    todos: [{
        text: 'apples'
      },
      {
        text: 'pears'
      },
      {
        text: 'bananas'
      },
    ],
    newTodo: {
      text: ''
    },
  },
  methods: {
    addTodo: function () {
      this.todos.push(this.newTodo);
      this.newTodo = {
        text: ''
      };
    }

  }
});