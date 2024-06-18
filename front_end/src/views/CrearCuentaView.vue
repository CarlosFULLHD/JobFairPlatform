<template>
  <v-app class="card-background">
    <v-container fluid>
      <v-row justify="center" align="stretch" class="mt-10">
        <v-col cols="12" md="8" lg="6">
          <v-card>
            <v-card-title class="text-center">Crear cuenta</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="enviarCuenta">
                  <v-text-field
                    v-model="cuenta"
                    hint="Nombre de cuenta"
                    prepend-icon="mdi mdi-account-circle-outline"
                    :rules="[rules.required]"
                    label="Cuenta"
                    autofocus="true"
                    outlined
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    
                    :rules="[rules.required]"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi mdi-lock-outline"
                    hint="Al menos 8 caracteres "
                    label="Contraseña"
                    outlined
                    clearable
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi mdi-email-outline"
                    :rules="[rules.required, rules.email]"
                    label="E-mail"
                    outlined
                    clearable
                  ></v-text-field>

                  <v-checkbox
                    v-model="checkbox"
                    
                    required
                    color="green"
                  >
                    <template v-slot:label>
                      <div @click.stop="">¿Super usuario?</div>
                    </template>
                  </v-checkbox>
                </v-form>
                <div class="mt-6">
              <v-btn color="primary" @click="submitForm">Crear cuenta</v-btn>
            </div>
            <h4>Ya tienes una cuenta? Haz click  <router-link to="/cuenta/login">aqui</router-link></h4>
            </v-card-text>
            
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
  color: red;
}

.v-application--wrap {
  height: 100%;
  background-color: #f5f5f5;
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
            cuenta:'',
            password: '',
            email:'',
            checkbox: 0,
            error: null,
            show1: false,
            show2: false,
            valid: true,
            terms: false,
          })
          
            return {
              showPassword: false,
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
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },

        // CREATE ACCOUNT METHOD
        async submitForm(){
          try{
            var superU = (this.checkbox == true)? 1:0
          console.log(superU)
          console.log(this.email)
            const dataUp = {
              cuenta: this.cuenta,
              pwd: this.password,
              superusuario: superU,
              email: this.email
            }
            await Cuentas.crearCuenta(dataUp)
            this.$store.dispatch('successAlertAsync',`Cuenta creada exitosamente`)
            this.$router.push({ name: 'Home' })
          } catch (error) {
            this.$store.dispatch('errorAlertAsync',`Problemas al crear cuenta, intente de nuevo`)
          }
        }
      },
    }
    
    
    
    
    </script>
    
      