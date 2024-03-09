import { createApp } from 'vue'; // Import the createApp function from Vue
import router from './router/'; // Import your Vue Router configuration
import App from './App.vue'; // Import your main App component
import store from './Store/store';
import './style.css'; // Import your global CSS styles

// Get the stored data from local storage
const storedData = localStorage.getItem('indiagptstoreunit');
// console.log(storedData);
if (storedData) {
  store.replaceState(JSON.parse(storedData));

}
const app = createApp(App);
// Use Vue Router plugin to integrate router configuration
app.use(router);
app.use(store);
app.mount('#app');



