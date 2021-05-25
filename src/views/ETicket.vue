<template>
  <div class="container">
    <header class="header">
      <router-link :to="{ name: 'Search'}" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{$t('backBtn')}}
      </router-link>
      <Lang />
    </header>
    <h1 class="title-br">e-Ticket</h1>
    <section class="booking-title">
      <h2>{{ filial.BranchName }}</h2>
      <p>{{ filial.BranchAddress }}</p>
    </section>
    <div class="card">
      <div class="card__item">
        <div class="input modal-input" type="text" @click="open">
          <h1 class="modal-input__title">Услуги*</h1>
          <div class="modal-input__service">
            <p>{{ eticketInfo.serviseText }}</p>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
          </div>
        </div>
        <div class="modal-inputSelect" :class="{active: isActive == true}">
          <div class="modal-inputSelect__title">
            <h2>Услуга*</h2>
            <a href="/" class="close-link" @click.prevent="close()">
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          </div>
          <ul>
            <li v-for="item in items" :key="item.ServiceId" class="item" :class="{activeItem: liActive == item.ServiceId}" @click="liActive = item.ServiceId">
              <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
              <p>{{ item.ServiceName }}</p>
            </li>
          </ul>
          <div class="modal-btn">
            <a href="" class="modal-btn__link" @click.prevent="showService()">ВЫБРАТЬ</a>
          </div>
        </div>
        <div class="modal-inputSelectBg" :class="{active: isActive == true}"></div>
        <input class="input phone" type="tel" placeholder="+998" v-model="eticketInfo.phone">
      </div>
      <button @click="openTicket" class="btn">Получить</button>
    </div>

    <div class="ticket" :class="{activeTicket: isActiveTicket == true}">
      <h1 class="ticket__title">Ваш билет</h1>
      <ul>
        <li>
          <h1>Номер</h1>
          <h2>{{ eticketInfo.number }}</h2>
        </li>
        <li>
          <h1>Филиал</h1>
          <h2>{{ filial.BranchName }}</h2>
        </li>
        <li>
          <h1>Адрес</h1>
          <h2>{{ filial.BranchAddress }}</h2>
        </li>
        <li>
          <h1>Услуга</h1>
          <h2>{{ eticketInfo.serviseText }}</h2>
        </li>
        <li>
          <h1>Действителен до</h1>
          <h2>май 22, 2021, 12:00:00 AM</h2>
        </li>
      </ul>
      <a href="" @click.prevent="deleteTicket(eticketInfo.number)" class="ticket__link">УДАЛИТЬ ЭЛЕКТРОННЫЙ БИЛЕТ</a>
      <transition name="fade">
        <div v-if="isActiveToolTip" class="ticket__tooltip">
          <p>УДАЛЕНО</p>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Lang from '@/components/Lang.vue'

export default {
  data() {
    return {
      liActive: '',
      eticketInfo: {
        serviseText: 'Услуги',
        phone: '+998',
        number: '',
      },
      isActive: false,
      isActiveTicket: false,
      isActiveToolTip: false,
      filial: [],
      items: [],
      ticket: [],
      // api: 'http://192.168.16.80:8702/onlinetbookingservicerest'
      api: 'http://91.188.129.90:8702/onlinetbookingservicerest'
    }
  },
  components: {
    Lang
  },
  mounted() {
    this.$i18n.locale = localStorage.local
    this.loadFilial();
    this.loadService();
    if(localStorage.eticket === null || localStorage.eticket === undefined) {
      localStorage.setItem('eticket', JSON.stringify([]));
    }
  },
  methods: {
    open() {
      this.isActive = true;
    },
    close(){
      this.isActive = false;
    },
    showService() {
      const text = document.querySelector("li.activeItem > p").textContent;
      this.eticketInfo.serviseText = text;
      // console.log(text);
      this.isActive = false;
    },
    async loadService() {
      await axios
        .get(this.api + '/ListServices?BranchId=' + this.$route.params.id + '&LanguageShortId=' + localStorage.local)
        .then(response => (this.items = response.data))
        .catch((error) => console.log(error));
    },
    async loadFilial() {
      await axios
        .get(this.api + '/ListBranches')
        .then(response => {
          const fil = response.data;
          fil.find(el => {
            if(el.BranchId === +this.$route.params.id) {
              this.filial = el;
            }
          })
        })
        .catch((error) => console.log(error));
    },
    openTicket() {
      this.eticketInfo.number = Math.floor(Math.random() * (4321 * 123456)) + 1;
      const eticket = {
        number: this.eticketInfo.number,
        branch: this.filial.BranchName,
        address: this.filial.BranchAddress,
        serviseText: this.eticketInfo.serviseText,
        phone: this.eticketInfo.phone
      }
      if(localStorage.eticket == [] || localStorage.eticket == null || localStorage.eticket == undefined) {
        localStorage.setItem('eticket', JSON.stringify(this.eticketInfo));
      }
      else {
        this.ticket = [];
        const allEticket = JSON.parse(localStorage.eticket);
        ///push в ticket
        for(let i = 0; i < allEticket.length; i++) {
          this.ticket.push(allEticket[i]);
        }
        this.ticket.push(eticket);
        ///clear localStorage
        localStorage.eticket = [];
        /// запись в localStorage
        localStorage.eticket = JSON.stringify(this.ticket);
      }
      this.isActiveTicket = true;
    },
    deleteTicket(number) {
      const infolocalStorge = JSON.parse(localStorage.eticket);
      const info = [];
      for(let i = 0; i < infolocalStorge.length; i++) {
        if (infolocalStorge[i].number != number) {
          info.push(infolocalStorge[i]);
        }
      }
      this.isActiveToolTip = true;
      localStorage.eticket = JSON.stringify(info);
      setTimeout(()=> {
        this.isActiveToolTip = false;
        this.isActiveTicket = false;
        this.$router.push({ name: 'Home'});
      }, 2500)
    }
    // clearInputs(){
    //   this.eticketInfo.serviseText = 'Услуги',
    //   this.eticketInfo.phone = '+998';
    // },
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>