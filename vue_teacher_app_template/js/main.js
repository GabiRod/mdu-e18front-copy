"use strict";

let app = new Vue({
  el: '#app',
  data: {
    teachers: [{
      name: "Birgitte Kirk Iversen",
      mail: "bki@baaa.dk",
      position: "Senior Lecturer",
      phone: "5645321",
      initials: "bki",
      img: "https://www.baaa.dk/CropUp/headshot/media/1524902/birgitte-kirk-iversen.jpg"
    }, {
      name: "Gertie Margrethe Kolding Jensen",
      mail: "gkj@baaa.dk",
      position: "Senior Lecturer",
      phone: "5645321",
      initials: "bki",
      img: "https://www.eaaa.dk/CropUp/headshot/media/2046228/Gertie-Kolding.jpg"
    }, {
      name: "Kim Elkjær Marcher-Jepsen",
      mail: "kije@baaa.dk",
      position: "Lecturer",
      phone: "5645321",
      initials: "bki",
      img: "https://www.baaa.dk/CropUp/headshot/media/3124373/Kim-Elkjaer-Marcher-Jepsen.jpg"
    }],
    newTeacher: {
      name: "",
      mail: "",
      position: "",
      phone: "",
      initials: "",
      img: ""
    },
  },
  methods: {
    addNewTeacher: function () {
      this.teachers.push(this.newTeacher);
      this.newTeacher = {
        name: "",
        mail: "",
        position: "",
        phone: "",
        initials: "",
        img: ""
      }
    }
  }
});