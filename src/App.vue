<template>
  <div id="app" class="mt-md-3">
    <div class="container">
      <div class="row">
        <Character :cid="params.cid" :vertical="params.vertical"/>
      </div>
    </div>
  </div>
</template>

<script>
import Character from './components/Character.vue';

export default {
  name: 'app',

  components: {
    Character,
  },

  data() {
    return {
      params: {
        cid: -1,
        vertical: true,
      },
    };
  },

  created() {
    const u = new URLSearchParams(window.location.search);

    if (u.has('cid')) {
      const cid = parseInt(u.get('cid'), 10);

      if (!Number.isNaN(cid)) {
        this.params.cid = cid;
      }
    }

    if (u.has('vertical')) {
      this.params.vertical = (u.get('vertical').toLowerCase() === 'true');
    }
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
}
</style>
