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
                                consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi
                                ratione sint. Sit quaerat ipsum dolorem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Breadcrumbs -->

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
                            <p class="text-center">Vel nobis odio laboriosam et hic voluptatem. Inventore vitae totam.
                                Rerum repellendus enim linead sero park flows.</p>
                            <div class="row gy-4">
                                <div class="col-lg-12">
                                    <h4 class="text-center">LOGIN HERE</h4>
                                </div>
                                <div class="col-md-12">
                                    <form @submit.prevent="loginUser" class="php-email-form d-flex flex-column gap-3">
                                        <input type="email" class="form-control" v-model="userData.email"
                                            placeholder="Email">
                                        <input type="password" class="form-control" v-model="userData.password"
                                            placeholder="Password">
                                        <input type="submit" class="bg-primary text-white form-control" value="Login"
                                            :disabled="submitButtonDisabled">
                                        <RouterLink class="get-a-quote" :to="{ path: '/forgot-password' }">
                                            Forgot Password?</RouterLink>
                                        <p v-if="loginSuccess" class="text-success">Login successful!</p>
                                        <p v-if="loginError" class="text-danger">{{ error }}</p>
                                    </form>
                                </div>
                                <div class="fs-4 text-center">
                                    <span>New to INDIA GPT?<RouterLink class="get-a-quote" :to="{ path: '/register' }">
                                            Register Now</RouterLink></span>
                                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn
                                        more.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- End Quote Form -->
                </div>

            </div>
        </section>
        <!-- End Get a Quote Section -->
    </main>
    <!-- End #main -->
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios';

export default {
    name: 'Login',
    components: {
        Header
    },
    data() {
        return {
            userData: {
                email: 'ajaykrishnankizhakeettil@gmail.com',
                password: 'ajay123',
            },
            loginSuccess: false, // Variable to track login success status
            loginError: false, // Variable to track login error status
            submitButtonDisabled: false,
            error:''
        }
    },
    components: {
        Header
    },
    mounted() {
        this.$store.state.authentiation && this.$router.push('/')
    },
    activated() {
        this.$store.state.authentiation && this.$router.push('/')

    },
    methods: {
        async loginUser() {

            this.submitButtonDisabled = true;
            try {
                const response = await axios.post("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/login", {
                    email: this.userData.email,
                    password: this.userData.password
                });
                console.log('Login successful:', response.data);
                this.loginSuccess = true;
                this.loginError = false;
                this.resetForm();
                this.$store.commit('SET_SELECTEDTOKEN', response.data.access_token);
                // this.$store.commit('SET_SELECTEDAUTH', true);
                 this.$store.dispatch('fetchData').then((result) => {
                    this.$router.push('/');
                    console.log(result);
                 }).catch((err) => {
                    console.log(err);
                 });
               
            } catch (error) {
                console.error('Login error:', error);
                this.loginError = true;
                this.loginSuccess = false;
                this.error=error.response.data.detail
            }
            finally {
                this.submitButtonDisabled = false;
            }
        },
        // async fetchUserData() {
        //     try {
        //         const response = await axios.get("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/fetch-user-data", {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'token': this.$store.state.selectedToken,
        //             },
        //         });
        //         console.log('Login successful:', response.data);
        //         this.$store.commit('SET_FETCHUSERDATA', response.data);
        //     } catch (error) {
        //         console.error('Login error:', error);
        //         this.loginError = true;
        //         this.loginSuccess = false;
        //     }
        // },
        resetForm() {
            this.userData = {
                email: 'ajaykrishnankizhakeettil@gmail.com',
                password: 'ajay123',
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