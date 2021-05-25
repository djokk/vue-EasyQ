<template>
  <div class="container">
    <header class="header">
      <router-link :to="{ name: 'Home'}" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{$t('backBtn')}}
      </router-link>
      <Lang />
    </header>
    <section class="section">
      <div class="block">
        <router-link :to="{ name: 'Search'}" class="block__item">
          <div class="block__icon">
            <i class="fa fa-university" aria-hidden="true"></i>
          </div>
          <h1 class="block__title">{{ $t('one') }}</h1>
        </router-link>
        <router-link :to="{ name: 'Maps'}" class="block__item">
          <div class="block__icon">
            <i class="fa fa-map" aria-hidden="true"></i>
          </div>
          <h1 class="block__title">{{ $t('two') }}</h1>
        </router-link>
        <router-link :to="{ name: 'Profil'}" class="block__item">
          <div class="block__icon">
            <i class="fa fa-address-card" aria-hidden="true"></i>
          </div>
          <h1 class="block__title">{{ $t('three') }}</h1>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Lang from '@/components/Lang.vue'

export default {
  components: {
    Lang
  },
  mounted() {
    this.uploadLang();
  },
  methods: {
    uploadLang() {
      this.$i18n.locale = localStorage.local
    }
  },
  created() {
    this.uploadLang();
  }
}
</script>
