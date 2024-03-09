<template>
  <!-- ======= Header ======= -->
  <DashboardHeader />
  <div class="container-fluid" id="main">
    <div class="row row-offcanvas row-offcanvas-left">
      <div class="sidebarmenu col-md-3 col-lg-2 sidebar-offcanvas bg-light pl-0" id="sidebar" role="navigation">
        <ul class="nav flex-column sticky-top pl-0 pt-5 mt-5">

          <li>
            <RouterLink class="d-flex flex-column align-items-start" :to="{ path: '/profile' }"><i
                class="bi bi-person-fill icon"></i><span class="d-block">Profile</span></RouterLink>
          </li>
          <li class="mb-0">
            <i class="bi bi-box-arrow-left icon"></i><span class="d-block"></span>
          </li>
          <button @click="logout()">Logout</button>

        </ul>

      </div>
      <!--/col-->
      <div class="col main pt-5 mt-3">
        <div class="card-body bg-transparent">
          <div class="card p-3 mb-4">
            <div class="card-header bg-transparent border-0">
              <h1 class="h5 mb-0">My Profile</h1><small>Update your account information</small>
            </div>
            <div class="card-body border-1">
              <div class="card card-body">
                <div class="row justify-content-between align-items-center">
                  <div class="col-md">
                    <div class="d-flex align-items-center avatar_section">
                      <div class="flex-shrink-0">
                        <div><img src=""></div>
                      </div>
                      <div v-if="this.$store.state.authentiation" class="flex-grow-1 mx-3">
                        <h5 class="mb-0">{{ this.$store.getters.getUserData.first_name }} {{ this.$store.getters.getUserData.last_name }}</h5>
                        <p class="mb-0">{{ this.$store.getters.getUserData.email }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="d-flex gap-3 flex-row-reverse mt-3 mt-md-0" role="group" aria-label="Basic example">
                      <form @submit.prevent="uploadProfilePic()" class="row g-3">
                       <input class="form-control" type="file" ref="fileInput" accept="image/jpeg" @change="handleFileChange" />
                       <input type="submit" class="theme_button" value="save">
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.prevent="updateProfile()" class="row g-3">
                    <div class="col-md-6">
                      <label for="input1" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="input1" v-model="updateUser.firstname">
                    </div>
                    <div class="col-md-6"><label for="input2" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="input2" v-model="updateUser.lastname">
                    </div>
                    <div class="col-md-6"><label for="input3" class="form-label">Email Address</label>
                      <input type="email" class="form-control" id="input3" v-model="updateUser.email">
                    </div>
                    <div class="col-md-6"><label for="input4" class="form-label">Phone Number</label><input type="tel"
                        class="form-control" id="input4" v-model="updateUser.mobile"></div>
                    <div class="card-footer bg-transparent border-0">
                      <div class="d-flex gap-3 flex-row-reverse" role="group" aria-label="Basic example"><input
                          type="submit" class="theme_button" value="save"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
          <div class="card p-3">
            <div class="card-header bg-transparent border-0">
              <h1 class="h5 mb-0">Change Password</h1><small>Your new password must be different from previous
                password</small>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.prevent="changePassword()" class="row g-3">
                    <div class="col-md-6"><label for="inputEmail4" class="form-label">Current password</label><input
                        type="password" class="form-control" id="inputEmail4" v-model="oldPassword"><!----></div>
                    <div class="col-md-6"><label for="inputPassword4" class="form-label">New password</label><input
                        type="password" class="form-control" id="inputPassword4" v-model="newPassword"><!----></div>
                    <div class="card-footer bg-transparent border-0">
                      <div class="d-flex gap-3 flex-row-reverse" role="group" aria-label="Basic example"><input
                          type="submit" class="theme_button" value="save">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import DashboardHeader from '../components/DashboardHeader.vue'
import axios from 'axios';

export default {
  name: 'Profile',
  components: {
    DashboardHeader,
  },
  data() {
    return {
     updateUser:{
      firstname: this.$store.getters.getUserData.first_name,
      lastname: this.$store.getters.getUserData.last_name,
      email:  this.$store.getters.getUserData.email,
      mobile: this.$store.getters.getUserData.mobile,
     },
      oldPassword: '',
      newPassword: '',
      uploadProfilePicture: null
    }
  },
  mounted() {
        !this.$store.state.authentiation && this.$router.push('/')
    },
    activated() {
        !this.$store.state.authentiation && this.$router.push('/')

    },
  methods: {
    async updateProfile() {
    console.log(this.mobile);

      try {
        const response = await axios.put("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/update-profile", {
          first_name: this.updateUser.firstname,
          last_name: this.updateUser.lastname,
          email: this.updateUser.email,
          mobile: this.updateUser.mobile,
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'token': this.$store.state.selectedToken,
            },
          }
        );
        console.log(response);
        this.$store.dispatch('fetchData');
      } catch (error) {
        console.error('Login error:', error);
        this.loginError = true;
        this.loginSuccess = false;
      }

    },
    
    async changePassword() {
      try {
        const response = await axios.put("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/change-password", {
          current_password: this.oldPassword,
          new_password: this.newPassword,

        },
          {
            headers: {
              'Content-Type': 'application/json',
              'token': this.$store.state.selectedToken,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async uploadProfilePic() {
      console.log(this.uploadProfilePicture);
      try {
        if (this.uploadProfilePicture== null) {
                return;
            }
            // this.profile_picture.loading = true;
            const formData = new FormData();
            formData.append('file', this.uploadProfilePicture);
        const response = await axios.post("https://indiagpt-fastapi.azurewebsites.net/api/v1/user/upload-profile-picture",formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': this.$store.state.selectedToken,
          }
        });
        console.log("Profile image uploaded successfully:", response.data.file_url);
        this.$store.commit('UPDATE_USERAVATAR',response.data.file_url)
        // Handle success response here
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error("Validation Error:", error.response.data);
          // Handle validation error
        } else {
          console.error("Error uploading profile image:", error);
          // Handle other errors
        }
      }
    },
  
    handleFileChange(event) {
            this.uploadProfilePicture = event.target.files[0];
            console.log(this.uploadProfilePicture)
        },
    logout() {
      this.$router.push('/');
      this.$store.dispatch('logout')
    },
  }
}
</script>

<style>
@media screen and (max-width: 992px) {

  .row-offcanvas {
    position: relative;
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
  }

  .row-offcanvas-left .sidebar-offcanvas {
    left: -33%;
  }

  .row-offcanvas-left.active {
    left: 33%;
    margin-left: -6px;
  }

  .sidebar-offcanvas {
    position: absolute;
    top: 0;
    width: 33%;
    height: 100%;
  }
}

/*
 * Off Canvas wider at sm breakpoint
 * --------------------------------------------------
 */
@media screen and (max-width: 34em) {
  .row-offcanvas-left .sidebar-offcanvas {
    left: -45%;
  }

  .row-offcanvas-left.active {
    left: 45%;
    margin-left: -6px;
  }

  .sidebar-offcanvas {
    width: 45%;
  }
}

.card {
  overflow: hidden;
}

.card-body .rotate {
  z-index: 8;
  float: right;
  height: 100%;
}

.card-body .rotate i {
  color: rgba(20, 20, 20, 0.15);
  position: absolute;
  left: 0;
  left: auto;
  right: -10px;
  bottom: 0;
  display: block;
  -webkit-transform: rotate(-44deg);
  -moz-transform: rotate(-44deg);
  -o-transform: rotate(-44deg);
  -ms-transform: rotate(-44deg);
  transform: rotate(-44deg);
}
</style>