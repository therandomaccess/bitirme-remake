<template>
  <div class="wrapper">
    <div class="card-switch">
      <label class="switch">
        <input type="checkbox" class="toggle" />
        <span class="slider"></span>
        <span class="card-side"></span>
        <div class="flip-card--inner">
          <div class="flip-card--front">
            <div class="title">Log in</div>
            <form class="flip-card--form" @submit.prevent="login">
              <input
                class="flip-card--input"
                name="email"
                v-model="loginForm.email"
                placeholder="Email"
                type="email"
              />
              <input
                class="flip-card--input"
                name="password"
                v-model="loginForm.password"
                placeholder="Password"
                type="password"
              />
              <button class="flip-card--btn">Let's go!</button>
            </form>
          </div>
          <div class="flip-card--back">
            <div class="title">Sign up</div>
            <form class="flip-card--form" @submit.prevent="signup">
              <input
                class="flip-card--input"
                placeholder="Name"
                v-model="signupForm.name"
                type="text"
              />
              <input
                class="flip-card--input"
                name="email"
                v-model="signupForm.email"
                placeholder="Email"
                type="email"
              />
              <input
                class="flip-card--input"
                name="password"
                v-model="signupForm.password"
                placeholder="Password"
                type="password"
              />
              <button class="flip-card--btn">Confirm!</button>
            </form>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ElNotification } from 'element-plus'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', this.loginForm)
        if (response.data.success) {
          this.$router.push('/home') // Ana sayfaya yönlendirme
          ElNotification({
            title: 'Success',
            message: 'Login successful!',
            type: 'success'
          })
        } else {
          ElNotification.error({
            title: 'Error',
            message: 'Login failed: ' + response.data.message
          })
        }
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: 'An error occurred: ' + (error.response.data.message || error.message)
        })
      }
    },
    async signup() {
      try {
        const response = await axios.post('http://localhost:3000/api/register', this.signupForm)
        if (response.data.success) {
          ElNotification({
            title: 'Success',
            message: 'Signup successful!',
            type: 'success'
          })
        } else {
          ElNotification.error({
            title: 'Error',
            message: 'Signup failed: ' + response.data.message
          })
        }
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: 'An error occurred: ' + (error.response.data.message || error.message)
        })
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card--inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card--inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card--front {
  box-shadow: none;
}

.flip-card--front,
.flip-card--back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card--back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card--form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card--input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card--input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card--input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card--btn:active,
.button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card--btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}
</style>
