<template>
  <div class="container">
    <header class="header">
      <router-link to="/menu" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{$t('backBtn')}}
      </router-link>
      <Lang />
    </header>
    <section class="history">
      <h1 class="history__title">{{ $t('prOne') }}</h1>
      <div class="history__list">
        <p v-if=" eTicket.length === 0 ">{{ $t('empty') }}</p>
        <div v-else class="list" v-for="item in eTicket" :key="item.index">
          <div class="list__text" @click="open(item.number)">
            <h2 class="title">{{ item.number }}</h2>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
          <div class="list__content" v-if="show === item.number">
            <h1 class="title">Ваш билет</h1>
            <ul>
              <li>
                <h1>Номер</h1>
                <h2>{{ item.number }}</h2>
              </li>
              <li>
                <h1>Услуга</h1>
                <h2>{{ item.serviseText }}</h2>
              </li>
              <li>
                <h1>Действителен до</h1>
                <h2>май 22, 2021, 12:00:00 AM</h2>
              </li>
            </ul>
            <a @click.prevent="deleteTicket(item.number)" href="" class="list__link">УДАЛИТЬ ЭЛЕКТРОННЫЙ БИЛЕТ</a>
            <transition name="fade">
              <div v-if="isActiveToolTip" class="list__tooltip">
                <p>УДАЛЕНО</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <h2 class="history__title">{{ $t('prTwo') }}</h2>
      <div class="history__list">
        <p v-if=" booking.length === 0 ">{{ $t('empty') }}</p>
        <div v-else class="list" v-for="item in booking" :key="item.index">
          <div class="list__text" @click="open(item.number)">
            <h2 class="title">{{ item.number }}</h2>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
          <div class="list__content" v-if="show === item.number">
            <h1 class="title">Ваш билет</h1>
            <ul>
              <li>
                <h1>Номер</h1>
                <h2>{{ item.number }}</h2>
              </li>
              <li>
                <h1>Услуга</h1>
                <h2>{{ item.serviseText }}</h2>
              </li>
              <li>
                <h1>Действителен до</h1>
                <h2>май 22, 2021, 12:00:00 AM</h2>
              </li>
            </ul>
            <a @click.prevent="deleteBooking(item.number)" href="" class="list__link">УДАЛИТЬ ЭЛЕКТРОННЫЙ БИЛЕТ</a>
            <transition name="fade">
              <div v-if="isActiveToolTip" class="list__tooltip">
                <p>УДАЛЕНО</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Lang from '@/components/Lang.vue'

export default {
  data() {
    return {
      show: 0,
      isActiveToolTip: false,
      eTicket: '',
      booking: '',
    }
  },
  components: {
    Lang
  },
  mounted() {
    this.$i18n.locale = localStorage.local;
    this.loadeTicket();
    this.loadBooking();
  },
  methods: {
    open(id) {
      // this.show = true;
      // console.log('asd');
      if (this.show != id) {
        this.show = id;
      }
      else {
        this.show = 0;
      }
      //  :class="{active: isActive == true}"
    },
    loadeTicket() {
      this.eTicket = JSON.parse(localStorage.eticket);
      // console.log(this.eTicket);
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
      // this.eTicket = JSON.stringify(info);
      setTimeout(()=> {
        this.loadeTicket();
        this.isActiveToolTip = false;
      }, 2000)
    },
    loadBooking() {
      this.booking = JSON.parse(localStorage.booking);
      // console.log(this.eTicket);
    },
    deleteBooking(number) {
      const infolocalStorge = JSON.parse(localStorage.booking);
      const info = [];
      for(let i = 0; i < infolocalStorge.length; i++) {
        if (infolocalStorge[i].number != number) {
          info.push(infolocalStorge[i]);
        }
      }
      this.isActiveToolTip = true;
      localStorage.booking = JSON.stringify(info);
      // this.eTicket = JSON.stringify(info);
      setTimeout(()=> {
        this.loadBooking();
        this.isActiveToolTip = false;
      }, 2000)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.itemActive-h2 {
  padding: 5px;
}
.itemActive {
  /* display: none; */
}
.active {
  display: inline-block;
}
</style>