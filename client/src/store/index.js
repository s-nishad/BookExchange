import { createStore } from 'vuex';
import authModule from './modules/auth';

export default createStore({
  state: {
    loading : false,
    toast: {
      show: false,
      message: '',
      type: ''
    },
  },
  getters: {
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setToast(state, toast) {
      state.toast = toast;

      setTimeout(() => {
        state.toast.show = false;
        state.toast.message = '';
        state.toast.type = '';
      }, 4000);
    },
  },
  actions: {
  },
  modules: {
    auth: authModule,
  }
})
