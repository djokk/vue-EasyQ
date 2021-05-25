<template>
  <div class="container">
    <header class="header">
      <router-link :to="{ name: 'Menu'}" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{$t('backBtn')}}
      </router-link>
      <Lang />
    </header>
    <section class="section-search">
      <div class="search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input class="search__input" type="text" :placeholder="$t('search')" v-model="search"/>
      </div>
      <div class="lists">
        <div v-for="item in filteredList" :key="item.BranchId" class="lists__item" @click="open(item.BranchId)">
          <h1 class="lists__title">{{ item.BranchName + item.BranchAddress }}</h1>
        </div>
        <!-- <div class="lists__item">
          <h1 class="lists__title">Филиал ОПЕРУ ул. Абдулла Кодирий 2</h1>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import Lang from '@/components/Lang.vue'
// import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      search: "",
      infos: [],
    }
  },
  components: {
    Lang
  },
  mounted(){
    axios
      .get('http://91.188.129.90:8702/onlinetbookingservicerest/ListBranches')
      // .get('http://192.168.16.80:8702/onlinetbookingservicerest/ListBranches')
      .then(response => (this.infos = response.data))
      .catch((error) => console.log(error));
    this.$i18n.locale = localStorage.local
  },
  computed: {
    // ...mapGetters({
    //   currentSelectId: 'currentSelectId'
    // }),
    filteredList() {
      return this.infos.filter(post => {
        return post.BranchName.toLowerCase().includes(this.search.toLowerCase()) ||
              post.BranchAddress.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created() {
  },
  methods: {
    open(id) {
      if(localStorage.name == 1) {
        this.$router.push({ name: 'Booking', params: { id: id }});
      }
      else {
        this.$router.push({ name: 'ETicket', params: { id: id }})
      }
    },
  },
}
</script>
