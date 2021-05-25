<template>
<div>
  <div class="container">
    <header class="header">
      <h1 class="title">{{ $t('organization') }}</h1>
      <Lang />
    </header>
    <section class="menu">
      <div class="menu__block">
        <a href="" @click.prevent="menuOne" to="" class="item">{{$t('homeBtnOne')}}</a>
        <a href="" @click.prevent="menuTwo" to="" class="item">{{$t('homeBtnTwo')}}</a>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import Lang from '@/components/Lang.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    Lang
  },
  computed: {
  },
  mounted() {
    if(localStorage.eticket === null || localStorage.eticket === undefined) {
      localStorage.setItem('eticket', JSON.stringify([]));
    }
    if(localStorage.booking === null || localStorage.booking === undefined) {
      localStorage.setItem('booking', JSON.stringify([]));
    }
  },
  methods: {
    updateLang() {
      localStorage.local = 0;
      // console.log('1');
      if(localStorage.local === '0'){
        localStorage.local = 'ru'
        this.$i18n.locale = 'ru'
        // console.log('2');
      }
      else {
        this.$i18n.locale = localStorage.local
      }
    },
    menuOne() {
      this.$router.push({ name: 'Menu'});
      localStorage.name = 1;
    },
    menuTwo() {
      this.$router.push({ name: 'Menu'});
      localStorage.name = 2;
    }
  },
  created() {
    if(localStorage.local === 'uz' || localStorage.local === 'ru' || localStorage.local === 'en'){
      this.$i18n.locale = localStorage.local
    }
    else {
      this.updateLang()
    }
  }
}
</script>
