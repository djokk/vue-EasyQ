<template>
  <div class="container">
    <header class="header">
      <router-link :to="{ name: 'Search' }" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{ $t("backBtn") }}
      </router-link>
      <Lang />
    </header>
    <h1 class="title-br">Бронирование</h1>
    <section class="booking-title">
      <h2>{{ filial.BranchName }}</h2>
      <p>{{ filial.BranchAddress }}</p>
    </section>
    <div class="card">
      <div class="card__item">
        <p>Персональные данные</p>
        <input
          class="input name"
          type="text"
          placeholder="Имя*"
          v-model="bookingInfo.name"
        />
        <input
          class="input surname "
          type="text"
          placeholder="Фамилия*"
          v-model="bookingInfo.surname"
        />
        <input
          class="input email "
          type="email"
          placeholder="test@mail.ru"
          v-model="bookingInfo.email"
        />
        <input
          class="input phone "
          type="tel"
          placeholder="+998"
          value="+998"
          v-model="bookingInfo.phone"
        />
      </div>
      <div class="card__item">
        <p>Данные бронирования</p>
        <div class="input modal-input" type="text" @click="openService()">
          <h1 class="modal-input__title">Услуги*</h1>
          <div class="modal-input__service">
            <p>{{ bookingInfo.serviseText }}</p>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </div>
        </div>
        <div class="modal-inputSelect" :class="{ active: isActive == true }">
          <div class="modal-inputSelect__title">
            <h2>Услуга*</h2>
            <a href="/" class="close-link" @click.prevent="closeService()">
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          </div>
          <ul>
            <li
              v-for="item in items"
              :key="item.ServiceId"
              class="item"
              :class="{ activeItem: liActive == item.ServiceId }"
              @click="liActive = item.ServiceId"
            >
              <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
              <p>{{ item.ServiceName }}</p>
            </li>
          </ul>
          <div class="modal-btn">
            <a href="" class="modal-btn__link" @click.prevent="showService()"
              >ВЫБРАТЬ</a
            >
          </div>
        </div>
        <div
          class="modal-inputSelectBg"
          :class="{ active: isActive == true }"
        ></div>
        <input class="input date" type="date" v-model="bookingInfo.date" />
        <input class="input time" type="time" v-model="bookingInfo.time" />
      </div>
      <button class="btn" @click="add()">ДАЛЕЕ</button>
    </div>
    <div class="card-modal" :class="{ active: cardModal === true }">
      <a href="" class="close-link" @click.prevent="close()">
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <h1>Начальные данные</h1>
      <p>Имя: {{ bookingInfo.name }}</p>
      <p>Фамилия: {{ bookingInfo.surname }}</p>
      <p>E-mail: {{ bookingInfo.email }}</p>
      <p>Телефон: {{ bookingInfo.phone }}</p>
      <h2>Данные бронирования</h2>
      <p>Услуга: {{ bookingInfo.serviseText }}</p>
      <p>Дата: {{ bookingInfo.date }}</p>
      <p>Время: {{ bookingInfo.time }}</p>
      <button class="btn" @click="send()">ЗАБРОНИРОВАТЬ ДАТУ</button>
    </div>
    <div class="modal_bg" :class="{ active: cardModalBg === true }"></div>
    <div class="card-modal-end" :class="{ active: cardModalEnd === true }">
      <a href="/" class="close-link" @click.prevent="closeEnd()">
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <h1>Успешное бронирование</h1>
      <div class="kod">
        <span class="kod__title">Код бронирования</span>
        <p class="kod__number" id="asd" @click="copy('asd')">
          {{ bookingInfo.number }}
        </p>
        <div class="alert" :class="{ alertActive: alertActive === true }">
          <h1>Скопировано!</h1>
        </div>
      </div>
      <h2>Нажмите, чтобы скопировать код бронирования!</h2>
      <p>Пожалуйста, сохраните ваш код бронирования на потом.</p>
      <h3>
        О ваших деталях бронирования мы свяжемся с вами по электронной почте,
        где вы сможете найти дополнительную информацию.
      </h3>
    </div>
  </div>
</template>

<script>
import Lang from "@/components/Lang.vue";
import axios from "axios";

export default {
  data() {
    return {
      liActive: "",
      isActive: false,
      cardModal: false,
      cardModalEnd: false,
      cardModalBg: false,
      alertActive: false,
      bookingInfo: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        serviseText: "Услуги",
        time: "",
        date: null,
        number: "",
      },
      filial: [],
      items: [],
      ticket: [],
      // api: 'http://192.168.16.80:8702/onlinetbookingservicerest'
      api: "http://91.188.129.90:8702/onlinetbookingservicerest",
    };
  },
  components: {
    Lang,
  },
  mounted() {
    this.$i18n.locale = localStorage.local;
    this.loadFilial();
    this.loadService();
  },
  methods: {
    openService() {
      this.isActive = true;
    },
    closeService() {
      this.isActive = false;
    },
    showService() {
      const text = document.querySelector("li.activeItem > p").textContent;
      this.bookingInfo.serviseText = text;
      // console.log(text);
      this.isActive = false;
    },
    add() {
      this.cardModal = true;
      this.cardModalBg = true;
    },
    close() {
      this.cardModal = false;
      this.cardModalBg = false;
      this.cardModalEnd = false;
      // this.$router.push({ name: 'Home'});
    },
    closeEnd() {
      // this.cardModal = false;
      this.cardModalBg = false;
      this.cardModalEnd = false;
      this.$router.push({ name: 'Profil'});
    },
    send() {
      this.cardModal = false;
      this.cardModalEnd = true;
      this.bookingInfo.number = Math.floor(Math.random() * (4321 * 123456)) + 1;

      const booking = {
        number: this.bookingInfo.number,
        branch: this.filial.BranchName,
        address: this.filial.BranchAddress,
        serviseText: this.bookingInfo.serviseText,
        phone: this.bookingInfo.phone,
      };
      if (
        localStorage.booking == [] ||
        localStorage.booking == null ||
        localStorage.booking == undefined
      ) {
        localStorage.setItem("booking", JSON.stringify(this.bookingInfo));
      } else {
        this.ticket = [];
        const allBooking = JSON.parse(localStorage.booking);
        ///push в ticket
        for (let i = 0; i < allBooking.length; i++) {
          this.ticket.push(allBooking[i]);
        }
        this.ticket.push(booking);
        ///clear localStorage
        localStorage.booking = [];
        /// запись в localStorage
        localStorage.booking = JSON.stringify(this.ticket);
      }

      this.clearInputs();
    },
    clearInputs() {
      this.bookingInfo.name = "";
      this.bookingInfo.surname = "";
      this.bookingInfo.email = "";
      this.bookingInfo.phone = "";
      this.bookingInfo.service = "";
      this.bookingInfo.time = "";
      this.bookingInfo.date = "";
    },
    // created(text) {
    //   // const fullText = [];
    //   // fullText.push(this.$cookies.get('Booking'));
    //   // fullText.push(text);
    //   // this.$cookies.set('Booking', JSON.stringify(fullText));
    //   // this.$cookies.set('Booking', text);
    //   // console.log(fullText);
    //   // const asd = JSON.parse(this.$cookies.get('Booking'));
    //   // console.log(asd.name);
    // },
    async loadService() {
      await axios
        .get(
          this.api +
            "/ListServices?BranchId=" +
            this.$route.params.id +
            "&LanguageShortId=" +
            localStorage.local
        )
        .then((response) => (this.items = response.data))
        .catch((error) => console.log(error));
    },
    async loadFilial() {
      await axios
        .get(this.api + "/ListBranches")
        .then((response) => {
          const fil = response.data;
          fil.find((el) => {
            if (el.BranchId === +this.$route.params.id) {
              this.filial = el;
            }
          });
        })
        .catch((error) => console.log(error));
    },
    copy(text) {
      var id = document.getElementById(text).innerText;
      var elem = document.createElement("textarea");
      document.body.appendChild(elem);
      elem.value = id;
      elem.select();
      document.execCommand("copy");
      document.body.removeChild(elem);
      this.alertActive = true;
      setTimeout(() => (this.alertActive = false), 2000);
    },
  },
  // created() {
  //   this.loadFilial();
  // },
};
</script>
