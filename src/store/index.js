import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import RStore from '../helper/RStore';
import initialModules from './initialModules';
import UserService from '../middleware/services/UserService';

Vue.use(Vuex);

const initialState = () => ({
  rules: {
    required: v => Array.isArray(v)
      ? !!v.length || "Обязательно к заполнению"
      : !!v || "Обязательно к заполнению",
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Некорректная электронная почта'
    },
    min: type => {
      switch(type) {
        case 'name':
          return v => v.length > 3 || 'Имя должно содержать больше символов';

        case 'password':
          return v => v.length > 3 || 'Пароль должен быть больше 8 символов';
      }
    }
  },

  perPages: {
    table: [10, 25, 50, 100],
    card: [6, 12, 24, 36, 60]
  }
});

const vuex = new Vuex.Store({
  state: initialState(),
  mutations: {
    UNSET_DATA: state => state = initialState(),
  },
  actions: {
    logout({ commit, dispatch }) {
      Object.keys(modules).forEach(m => {
        commit(`${m}/UNSET_DATA`)
      });
      commit('UNSET_DATA');
      dispatch('saveToLocaleStorage');
      UserService.logout();
    },
    saveToLocaleStorage(_, data) {
      RStore.initState(data);
    },
  },
  getters: {
    getRules: state => state.rules,
    getPerPage: state => state.perPages,
  },
  modules: initialModules(modules),
});

export default vuex;

