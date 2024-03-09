<template>
    <div>
        <div>
            <h1>Forgot password</h1>
            <form @submit.prevent="forgotPassword">
                <input type="email" v-model="userData.email" placeholder="Email">
                <input type="submit" value="forgot password">
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ForgotPassword',
    data() {
        return {
            userData: {
                email: '',
            },
        }
    },
    methods: {
        async forgotPassword() {
            try {
                const response = await axios.post("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/forgot-password", {
                    email: this.userData.email,
                });
                console.log("Password reset email sent successfully:", response.data);
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

<style scoped></style>