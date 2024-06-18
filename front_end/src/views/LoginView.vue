<template>
  <v-app class="card-background">
    <v-container fluid>
      <v-row justify="center" align="stretch" class="mt-10">
        <v-col cols="12" md="8" lg="6">
          <v-card>
            <v-card-title class="text-center">Iniciar sesión</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="cuenta"
                  :rules="[rules.required]"
                  label="Nombre de cuenta"
                  prepend-icon="mdi mdi-account-circle-outline"
                  outlined
                  autofocus="true"
                  clearable
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  label="Contraseña"
                  prepend-icon="mdi mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  clearable
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="primary" @click="loginForm">Iniciar sesión</v-btn>
              
            </v-card-actions>
            <h4>No tienes una cuenta? Haz click  <router-link to="/cuenta/crear">aqui</router-link></h4>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.card-background {
  background-image: url("../assets/fondologin.jpg");
  background-size: cover;
  background-position: center;
}
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.error {
  color:red;
}
h4 {
  padding: 10px;
}
</style>


  
  <script>
  import Cuentas from '@/services/Cuenta'
  export default {
    name:"LoginView",
      data () {
        const defaultForm = Object.freeze({
          account:'',
          password: '',
          confpassword: '',
          email:'',
          error: null,
          show1: false,
          show2: false,
          valid: true,
          terms: false,
        })
        
          return {
            showPassword: false,//Para declararlo en el data para hacer uso del script
              form: Object.assign({}, defaultForm),
              rules: {
                  required: v => !!v || 'Requerido.',
                  min: v => v.length >= 8 || 'Mínimo 8 caracteres',
                  confirmPassword: [
                    (val) => val === this.password || 'Passwords do not match',
                    (val) => (val || '').length > 0 || 'Confirm password is required',],
                  email: value => {
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  return pattern.test(value) || 'e - mail inválido'},
                  
            },
          }
      },
    
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async loginForm(){
        try { 
          let usuario = await Cuentas.loginCuenta(this.cuenta,this.password)
          let xd = usuario.data
          if (xd.length !== 0){
            console.log("CUENTITA")
            
            // this.$store.state.cuentaU = xd.cuenta
            // this.$store.state.passwordU = xd.pwd
            // this.$store.state.superU = xd.email
            // this.$store.state.emailU = xd.superusuario
            this.$store.dispatch('changeUserAccount',xd.cuenta)
            this.$store.dispatch('changeUserPwd',xd.pwd)
            this.$store.dispatch('changeUserEmail',xd.email)
            this.$store.dispatch('changeSuperUser',xd.superusuario)
            this.$store.dispatch('changeUserId',xd.cuenta_id)
            this.$store.dispatch('changeloggedinFlag',true)
            this.$store.dispatch('successAlertAsync',`Bienvenido ${xd.cuenta}`)
            this.$router.push({ name: 'Home' })

          }
        } catch (error) {
          this.$store.dispatch('errorAlertAsync',`Cuenta inexistente, intente de nuevo`)
        }     
      },
    },
  }
  </script>