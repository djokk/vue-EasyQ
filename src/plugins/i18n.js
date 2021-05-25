import Vue from 'vue'
import Vuei18n from 'vue-i18n'

Vue.use(Vuei18n)


export const i18n = new Vuei18n({
  // locale: 'uz',
  locale: ['uz', 'en', 'ru'],
  // fallbackLocale: 'ru',
  fallbackLocale: ['uz', 'en', 'ru'],
  messages: {
    uz: {
      organization: "Bank Ipak yo'li",
      homeBtnOne: 'Buyurtma qilish',
      homeBtnTwo: 'Elektron chiptani olish',
      one: "Bank Ipak yo'li filiallari",
      two: 'Xarita',
      three: 'Profil',
      backBtn : 'QAYTIB',
      prOne: 'Mening buyurtmalarim',
      prTwo: 'Mening elektron chiptalarim',
      empty: "Bo'sh",
      search: 'Qidirmoq...'
    },
    en: {
      organization: "Bank Ipak yo'li",
      homeBtnOne: 'Book here',
      homeBtnTwo: 'Get an e-Ticket',
      one: 'Branches of bank Ipak Yuli',
      two: 'Map',
      three: 'Profile',
      backBtn : 'BACK',
      prOne: 'My bookings',
      prTwo: 'My e-Tickets',
      empty: 'Empty',
      search: 'Search...'
    },
    ru: {
      organization: "Ипак Йули банк",
      homeBtnOne: 'Предварительная запись',
      homeBtnTwo: 'Получить электронный билет',
      one: 'Филиалы банка Ипак Йули',
      two: 'Карта',
      three: 'Профиль',
      backBtn : 'НАЗАД',
      prOne: 'Мои бронирования',
      prTwo: 'Мои электронные билеты',
      empty: 'Пусто',
      search: 'Поиск...'
    },
  }
})