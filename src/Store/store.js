// store.js
import { createStore } from 'vuex';
import { localStoragePlugin } from '@/Store/localstorage';
import axios from 'axios';

export default createStore({
  state: {
    count: 0,
    selectedToken: null,
    authentiation: false,
    userData: null,
    currentConversation: [],
    currentConvoId: null,
    allConvo: []
  },
  mutations: {
    SET_SELECTEDTOKEN(state, data) {
      state.selectedToken = data;
    },
    SET_SELECTEDAUTH(state, data) {
      state.authentiation = data;
    },
    SET_CURRENTCONVO(state, data) {
      state.currentConversation = data;
    },
    UPDATE_CONVO(state, data) {
      state.currentConversation = [...state.currentConversation, data];
    },
    SET_FETCHUSERDATA(state, data) {
      state.userData = data;
    },
    SET_CURRENTCONVOID(state, data) {
      state.currentConvoId = data;
    },
    SET_allConvo(state, data) {
      state.allConvo = data;
    }, UPDATE_allConvo(state, data) {
      state.allConvo = [data, ...state.allConvo];
    },
    UPDATE_USERAVATAR(state, data) {
      state.userData = { ...state.userData, avatar: data };
    }
  },
  actions: {
    logout({ commit }) {
      commit('SET_SELECTEDAUTH', false);
      commit('SET_SELECTEDTOKEN', null);
      commit('SET_FETCHUSERDATA', null);
      commit('SET_CURRENTCONVO', []);
      commit('SET_CURRENTCONVOID', null);
    },
    async fetchData({ commit, state }) {
      try {
        const response = await axios.get("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/fetch-user-data", {
          headers: {
            'Content-Type': 'application/json',
            'token': state.selectedToken,
          },
        });
        console.log('Login successful:', response.data);
        commit('SET_FETCHUSERDATA', response.data);
        commit('SET_SELECTEDAUTH', true);
        return "fetchData successfull"
      } catch (error) {
        console.error('Login error:', error);
        return "fetchdata Error" + error;
      }
    }
  },
  getters: {
    getUser: (state) => state.user,
    getUserData: (state) => state.userData,
  },
  plugins: [localStoragePlugin], // Use the localStoragePlugin to persist state
});