import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueStorage from 'vue-ls';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';


const lsOptions = {
  namespace: 'vuejs__',
  name: 'ls',
  storage: 'local',
};

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueStorage, lsOptions);

new Vue({
  render: h => h(App),
}).$mount('#app');
