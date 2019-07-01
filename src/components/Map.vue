<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: calc(100vh - 56px)"
      ref="map"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :lat-lng.sync="marker.position"
        :icon="marker.icon"
        @click="alert(marker)"
      >
        <l-popup :content="marker.tooltip" />
        <l-tooltip :content="marker.tooltip" />
      </l-marker>
      <!-- <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>-->
      <!-- <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>-->
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import firebase from "../firebaseConfig.js";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom: 18,
      center: latLng(47.262219099999996, 11.389905299999999),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: [47.41422, -1.250482],
      //withTooltip: latLng(47.41422, -1.250482),
      // currentZoom: 11.5,
      // currentCenter: latLng(47.262219099999996, 11.389905299999999),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      markers: []
    };
  },
  mounted() {
    firebase.db
      .collection("drinks")
      .orderBy("created_at", "desc")
      .onSnapshot(snapShot => {
        this.markers = [];
        let authorIds = [];
        snapShot.forEach(drink => {
          if (drink.data().lng && drink.data().lat) {
            if (!authorIds.includes(drink.data().authorId)) {
              authorIds.push(drink.data().authorId);
              const newMarker = {
                id: drink.id,
                position: { lat: drink.data().lat, lng: drink.data().lng },
                tooltip: drink.data().comment,
                draggable: false,
                visible: true
              };
              this.markers.push(newMarker);
            }
          }
        });
      });
    this.$nextTick(() => {
      let map = this.$refs.map.mapObject;
      //map.locate({ setView : true, watch: true })
      map.locate({ setView : true})
    //       .on('locationfound', onLocationFound);

    //   function onLocationFound(e) {
    //     console.log("3");
    //     let lat = (e.latlng.lat);
    //     let lng = (e.latlng.lng);
    //     console.log(lat + ' ' + lng);
    //     //let newLatLng = new map.LatLng(lat, lng);
    //     this.withPopup = [lat, lng];
    //   }

    })
  },
  methods: {
    // zoomUpdate(zoom) {
    //   this.currentZoom = zoom;
    // },
    // centerUpdate(center) {
    //   this.currentCenter = center;
    // },
    // showLongText() {
    //   this.showParagraph = !this.showParagraph;
    // },
    // innerClick() {
    //   alert("Click!");
    // }
  }
};
</script>
