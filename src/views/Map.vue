<template>
  <div class="container">
    <header class="header">
      <router-link to="/menu" class="title">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        {{ $t("backBtn") }}
      </router-link>
    </header>
    <section class="map">
      <div id="map" class="map">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker 
              :lat-lng="getCoord(item.BranchCoordinates.Latitude, item.BranchCoordinates.Longitude)"
              v-for="item in coordArray" :key="item.id"
            >
              <l-popup>
                <div class="mapPopup">
                  <h1>{{ item.BranchName }}</h1>
                  <p>- {{ item.BranchAddress }}</p>
                  <h2>Режим работы</h2>

                  <table>
                    <tr>
                      <th>Понедельник</th>
                      <th>Вторник</th>
                      <th>Среда</th>
                      <th>Четверг</th>
                      <th>Пятница</th>
                      <th>Суббота</th>
                      <th>Воскресенье</th>
                    </tr> <!--ряд с ячейками заголовков-->
                    <tr>
                      <td v-for="i in item.BranchOpenHours" :key="i.index">{{ i.Time }}</td>
                      <!-- <td>данные</td>
                      <td>данные</td>
                      <td>данные</td>
                      <td>данные</td>
                      <td>данные</td>
                      <td>данные</td> -->
                    </tr> <!--ряд с ячейками тела таблицы-->
                  </table>

                  <router-link :to="{ name: 'Booking', params: { id: item.BranchId }}" class="mapPopup__link">Предварительная запись</router-link>
                  <router-link :to="{ name: 'ETicket', params: { id: item.BranchId }}" class="mapPopup__link">Получить электронный билет</router-link>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
// import Lang from '@/components/Lang.vue'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  data() {
    return {
      zoom: 7,
      center: latLng(41.312452, 69.253328),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      coordArray: []
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  mounted() {
    this.$i18n.locale = localStorage.local;
    this.mapСoordinates();
  },
  methods:{
    async mapСoordinates(){
      await axios
        .get('http://91.188.129.90:8702/onlinetbookingservicerest/ListBranches')
        // .get('http://192.168.16.80:8702/onlinetbookingservicerest/ListBranches')
        .then(response => (this.coordArray = response.data))
        .catch((error) => console.log(error));
    },
    getCoord(a,b){
        return latLng(a,b)
    },
  }
};
</script>
