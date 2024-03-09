<template>
    <Header />
    <main id="main">

        <!-- ======= Breadcrumbs ======= -->
        <div class="breadcrumbs">
            <div class="page-header d-flex align-items-center">
                <div class="container position-relative">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-6 text-center">
                            <h2>Get a Quote</h2>
                            <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas
                                consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- End Breadcrumbs -->

        <!-- ======= Get a Quote Section ======= -->
        <section id="get-a-quote" class="get-a-quote">
            <div class="container" data-aos="fade-up">

                <div class="row g-0">

                    <div class="col-lg-5 quote-bg">
                        <img src="../assets/landing-bg-ltr.jpg" style="object-fit: contain; height: 60%;" alt="">
                    </div>

                    <div class="col-lg-7">
                        <form class="php-email-form">
                            <h3 class="fs-3 text-center">Get a quote</h3>
                            <p  class="text-center">Vel nobis odio laboriosam et hic voluptatem. Inventore vitae totam. Rerum repellendus
                                enim linead sero park flows.</p>
                            <div class="row gy-4">

                                <div class="col-lg-12">
                                    <h4 class="text-center">REGISTER NOW</h4>
                                </div>
                                <div class="col-md-12">
                                    <form @submit.prevent="registerUser" class="php-email-form d-flex flex-column gap-3">
                                        <input class="form-control" type="text" v-model="userData.first_name" placeholder="First Name">
                                        <input class="form-control" type="text" v-model="userData.last_name" placeholder="Last Name">
                                        <input class="form-control" type="email" v-model="userData.email" placeholder="Email">
                                        <input  class="form-control" type="password" v-model="userData.password" placeholder="Password">
                                        <input class="bg-primary text-white form-control" type="submit" value="Submit">
                                    </form>
                                </div>
                                <div class="fs-4 text-center">
                                    <span>visit India GPT<RouterLink class="get-a-quote" :to="{ path: '/login' }"> Login
                                            Here</RouterLink></span>
                                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn
                                        more.</p>
                                </div>


                            </div>
                        </form>
                    </div><!-- End Quote Form -->

                </div>

            </div>
        </section><!-- End Get a Quote Section -->
        <div v-if="registrationSuccess" class="alert alert-success" role="alert">
            Registration successful! Thank you for registering.
        </div>
    </main><!-- End #main -->
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios';

export default {
    name: 'Register',
    components: {
        Header
    },
  data() {
    return {
      userData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      registrationSuccess: false
    }
  },
 
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(import.meta.env.VITE_APP_ROOT_API_REGISTER, this.userData
        );
        console.log('Registration successful:',response.data);
        this.registrationSuccess = true; // Set registration success status to true
        this.resetForm();
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
            // Reset userData object to its initial state
            this.userData = {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            };
        }
  }
}
</script>

<style scoped>
.page-header {
    background: url(../assets/bg-section-2.png);
    min-height: 70vh;
}
</style>