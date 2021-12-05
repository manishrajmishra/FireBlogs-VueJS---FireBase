<template>
    <div class="form-wrap">
        <form class="register">
          <p class="login-register">
            Already have an account ?
            <router-link class="route-link" :to="{ name: 'Login' }">Login</router-link>
          </p>
          <h2>Create Your FireBlog Account</h2>
          <div class="inputs">
            <div class="input">
              <input type="text" placeholder="First Name" v-model="firstName" />
              <user class="icon" />
            </div>
            <div class="input">
              <input type="text" placeholder="Last Name" v-model="lastName" />
              <user class="icon" />
            </div>
            <div class="input">
              <input type="text" placeholder="UserName" v-model="userName" />
              <user class="icon" />
            </div>
            <div class="input">
              <input type="email" placeholder="Email" v-model="email" />
              <email class="icon" />
            </div>
            <div class="input">
              <input type="password" placeholder="Password" v-model="password" />
              <password class="icon" />
            </div>
            <div v-show="error" class="error">{{ this.errorMsg }}</div>
          </div>
          <button @click.prevent="register">Sign Up</button>
          <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseInit'
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      error: null,
      errorMsg: ''
    }
  },
  methods: {
    async register() {
      if(this.email !== '' && this.firstName !== '' && this.lastName !== '' && this.password !== '' && this.userName !== ''){
        this.error = false
        this.errorMsg = ''
        await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
         db.collection("users").doc(response.user.uid).set({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.password
          })
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          console.log(error)
        })
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
    }
  }

</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>