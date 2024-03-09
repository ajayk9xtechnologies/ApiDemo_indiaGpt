<template>

  <Header />
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="hero d-flex align-items-center">
    <div class="container">
      <div class="row gy-4 d-flex justify-content-between">
        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h2 data-aos="fade-up">Your Lightning Fast Delivery Partner</h2>
          <p data-aos="fade-up" data-aos-delay="100">Facere distinctio molestiae nisi fugit tenetur repellat non
            praesentium nesciunt optio quis sit odio nemo quisquam. eius quos reiciendis eum vel eum voluptatem eum
            maiores eaque id optio ullam occaecati odio est possimus vel reprehenderit</p>
          <div>
            <form @submit.prevent="searchQuestion" class="form-search d-flex align-items-stretch mb-3"
              data-aos="fade-up" data-aos-delay="200">
              <input type="text" class="form-control" v-model="question" placeholder="Ask anything">
              <RouterLink class="get-a-quote" :to="{ path: '/searchpage' }"><input type="submit" class="btn btn-primary" value="search"></RouterLink>
            </form>
            <ul>
              <li class="list-none" v-for="(suggestion, index) in suggestionList" :key="index">
                {{ suggestion }}
              </li>
            </ul>
            <div v-if="loader">
              <p class="placeholder-glow">
                <span class="placeholder col-12"></span>
                <span class="placeholder col-12"></span>
              </p>
              <p class="placeholder-glow">
                <span class="placeholder col-12"></span>
                <span class="placeholder col-12"></span>
              </p>
            </div>
            <div v-else-if="answer !== ''" class="answer">
              <div class="card card-body text-secondary my-3">
                <div class=" mb-0">{{ answer }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
          <img src="../assets/hero-img.svg" class="img-fluid mb-3 mb-lg-0" alt="">
        </div>

      </div>
    </div>
    <div>
      <div>Count: {{ $store.state.count }}</div>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>

  </section>
  <!-- End Hero Section -->
  <!-- <div>
    <h1>Forgot password</h1>
    <form @submit.prevent="forgotPassword">
      <input type="email" v-model="userData.email" placeholder="Email">
      <input type="submit" value="forgot password">
    </form>
  </div> -->


</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';

export default {
  name: 'Home',
  data() {
    return {
      userData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      question: '',
      timer: null,
      loader: false,
      suggestionList: [],
      answer: '',
      token: ''
    }
  },
  components: {
    Header
  },
  watch: {
    question(newValue, oldValue) {
      console.log(newValue);
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.suggestion();
      }, 100);
    }

  },
  activated() {
    this.suggestionList = []
  },
  methods: {
    increment() {
      this.$store.commit('increment'); // Call the increment mutation
    },
    decrement() {
      this.$store.commit('decrement'); // Call the decrement mutation
    },
    //   updateToken(newToken) {
    //   this.token = newToken;
    // },
    async searchQuestion() {
      this.answer = ''

      try {
        this.loader = true;
        const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search/" + this.question + "/" + 0,
          {
            headers: {
              'Content-Type': 'application/json',
              //  'token': this.token Include token in request headers
              'token': this.$store.state.selectedToken
            }
          }
        );
        console.log("response", response.data);
        this.answer = response.data.response;
        this.loader = false;
        this.suggestionList = ''
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error("Validation Error:", error.response.data);
        } else {
          console.error("Error sending password reset email:", error);
        }
      }
    },
    async suggestion() {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search/suggestions/" + this.question)
        this.suggestionList = response.data.suggestions
        console.log("sugg", this.suggestionList);
      } catch (error) {
        console.log(error);
      }
    },
    async conversationId() {
      try {
        this.loader = true;
        const response = await axios.get(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search/" + this.question + "/" + 65,
          {
            headers: {
              'Content-Type': 'application/json',
              //  'token': this.token Include token in request headers
              'token': this.$store.state.selectedToken
            }
          }
        );
        console.log("response", response.data);
        this.answer = response.data.response;
        this.loader = false;
        this.suggestionList = ''
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error("Validation Error:", error.response.data);
        } else {
          console.error("Error sending password reset email:", error);
        }
      }
    },

  }
}
</script>

<style scoped>
.list-none {
  list-style: none;
  font-size: 16px;
}
</style>