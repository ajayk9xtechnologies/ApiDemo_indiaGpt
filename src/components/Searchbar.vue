<template>
    <div>
        <div>
            <h1>search</h1>
            <form @submit.prevent="searchQuestion">
                <input type="text" v-model="question" placeholder="quetsion">
                <input type="submit" value="searchQ uestion">
                <ul>
                    <li v-for="(suggestion, index) in suggestionList" :key="index">
                        {{ suggestion }}
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Searchbar',
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
      suggestionList: [],
    }
  },
  methods: {
    async searchQuestion() {
      try {
        const response = await axios.post(import.meta.env.VITE_APP_ROOT_API_BASEURL + "user/search", {
          conversation_id: 0,
          question: this.question
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJlbWFpbCI6ImFqYXkxQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOm51bGwsInVzZXJuYW1lIjoiZGdwdGJjeHRtenVxemsiLCJjcmVhdGVkX29uIjoiMjAyNC0wMy0wNSAwOToxMzoyNC40NTgwOTMiLCJleHBpcmluZ19vbiI6IjIwMjQtMDQtMDQgMDk6MTM6MjQuNDU4MTAzIn0.TfWQGCTYIzFTSr185VRzLc2rBTSFdZl8k3j9plqkeE0'
            }
          }
        );
        console.log("questin:", response.data);
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
  },
  watch: {
    question(newValue, oldValue) {
      console.log(newValue);
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.suggestion(); // Call the suggestion method
      }, 100);
    }
  },
}
</script>


<style scoped></style>./Searchbar.vue