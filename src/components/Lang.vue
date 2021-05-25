<template>
  <div class="lang">
    <a
      class="lang__item"
      :class="{ active: language === 'uz' }"
      @click.prevent="selected('uz')"
    >
      <img class="img" src="/img/041-uzbekistan.png" alt="" />
    </a>
    <a
      class="lang__item"
      :class="{ active: language === 'ru' }"
      @click.prevent="selected('ru' )"
    >
      <img class="img" src="/img/044-russia.png" alt="" />
    </a>
    <a
      class="lang__item"
      :class="{ active: language === 'en' }"
      @click.prevent="selected('en')"
    >
      <img class="img" src="/img/110-united kingdom.png" alt="" />
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      infos: [],
      language: localStorage.local
    }
  },
  computed: {
    ...mapGetters({
      currentSelectId: 'currentSelectId'
    }),
  },
  methods: {
    selected(id) {
      localStorage.local = id;
      this.$i18n.locale = localStorage.local
      this.$store.dispatch('selected', id)
      this.language = localStorage.local
    },
  },
  created() {
    // this.selected()
  }
}
</script>