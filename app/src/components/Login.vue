<template>
  <div class="hello">
    <h1>{{msg}} </h1>
    <h2>Enter your username/Password</h2>
  <div class="container">
    <label><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>

    <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button  v-on:click="navigatetoCalendarComponent" type="submit">Login</button>
    <input type="checkbox" checked="checked"> Remember me
  </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return{
    username:'enter username here',
    password:' enter password here',
    msg: 'Login Form'
      }
    },
methods:{
    greet: function(event)
    {
        alert("hello world");
         if (event) {
        alert(event.target.tagName);
       
      }
    },
    navigatetoCalendarComponent:function(event)
    {
         this.$router.push('/calendar');
    }
}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
