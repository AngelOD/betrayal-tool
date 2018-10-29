<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <Character :cid="params.cid" :vertical="params.vertical"/>
      </div>
    </div>
  </div>
</template>

<script>
import vueUrlParameters from 'vue-url-parameters';
import Character from './components/Character.vue';

export default {
  name: 'app',

  components: {
    Character,
  },

  mixins: [vueUrlParameters],

  data() {
    return {
      params: {
        cid: 2,
        vertical: true,
      },
    };
  },

  created() {
    this.params = this.getFiltersFromUrl(this.params, true);
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
