<template>
  <v-app>
    <div class="Contacto" >
      
      <div class="Informacion" :class="{ 'dark-mode': darkMode }">
        <v-card
          :elevation="14"
          max-width="700"
          :class="{ 'my-class': true, 'my-class--dark': $vuetify.theme.dark }"
          >
        <div class="Titulo">
          <h1>Contacto USEI</h1>
        </div>
        <hr class="hrc">
        <div class="descripcionPrincipal">
          <p>Unidad de Servicios Estudiantiles Integrales Bloque D, Piso 5, Aula D29.</p>
        </div>
        <div class="contacto">
          <div class="subtitulo">
            <h2>
              <v-avatar
                        color="#004070!important"
                        size="50"
                      >
                      <v-icon
                        size="30"
                        color="#ffc506"
                        >stay_current_portrait
                      </v-icon>
                    </v-avatar> Telefono:</h2>
          </div>
          <div class="descripcion">
            <p>2782222 Interno 2723</p>
          </div>
        </div>
        <div class="contacto">
          <div class="subtitulo">
            <h2>
              <v-avatar
                        color="#004070!important"
                        size="50"
                      >
                      <v-icon
                        size="30"
                        color="#ffc506"
                        >phone
                      </v-icon>
                    </v-avatar> Directo:</h2>
          </div>
          <div class="descripcion">
            <p>2692723</p>
          </div>
        </div>
        <div class="contacto">
          <div class="subtitulo">
            <h2>
              <v-avatar
                        color="#004070!important"
                        size="50"
                      >
                      <v-icon
                        size="30"
                        color="#ffc506"
                        >email
                      </v-icon>
                    </v-avatar> Correo:</h2>
          </div>
          <div class="descripcion">
            <p>pzapana@ucb.edu.bo</p>
          </div>
        </div>
        <div class="contacto">
          <div class="subtitulo">
            <h2>
              <v-avatar
                        color="#004070!important"
                        size="50"
                      >
                      <v-icon
                        size="30"
                        color="#ffc506"
                        >stay_current_portrait
                      </v-icon>
                    </v-avatar> Celular:</h2>
          </div>
          <div class="descripcion">
            <p>77767647</p>
          </div>
        </div>
        <hr class="hrc">
        <div class="Redes">
          <h2>
            <v-avatar
              color="#004070!important"
              size="50"
              >
              <v-icon
                size="30"
                color="#ffc506"
                >share
              </v-icon>
            </v-avatar> Redes Sociales:
            <v-dialog v-model="dialog" width="400" transition="dialog-top-transition" class="dialog-mobile">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">Ver</v-btn>
              </template>
              <v-card>
                <v-toolbar color="primary" title="Opening from the top"><h2 class="oredes">Redes Sociales:</h2></v-toolbar>
                <v-card-text>
                  <br>
                  <v-row>
                    <v-col cols="6">
                  <a href="https://www.facebook.com/UCB.BOLIVIA/" target="_blank" rel="noopener noreferrer" class="social-media-row">
                    <h3>
                    <v-avatar
                          color="#004070!important"
                          size="50"
                        >
                        <v-icon
                          size="30"
                          color="#ffc506"
                          >mdi-facebook
                        </v-icon>
                      </v-avatar> Facebook</h3>
                  </a>
                    </v-col>
                  <v-col cols="6">
                    <a href="https://twitter.com/UCBLaPaz" target="_blank" rel="noopener noreferrer" class="social-media-row">
                      <h3>
                      <v-avatar
                            color="#004070!important"
                            size="50"
                          >
                          <v-icon
                            size="30"
                            color="#ffc506"
                            >mdi-twitter
                          </v-icon>
                        </v-avatar> Twitter</h3>
                    </a>
                    </v-col>
                  </v-row>
                  <v-row>
                  <v-col cols="6">
                    <a href="https://www.instagram.com/ucb.lapaz/" target="_blank" rel="noopener noreferrer" class="social-media-row">
                      <h3>
                      <v-avatar
                            color="#004070!important"
                            size="50"
                          >
                          <v-icon
                            size="30"
                            color="#ffc506"
                            >mdi-instagram
                          </v-icon>
                        </v-avatar> Instagram</h3>  
                    </a>
                  </v-col>
                  <v-col cols="6">
                  <a href="https://api.whatsapp.com/send/?phone=59177767647" target="_blank" rel="noopener noreferrer" class="social-media-row">
                    <h3>
                    <v-avatar
                          color="#004070!important"
                          size="50"
                        >
                        <v-icon
                          size="30"
                          color="#ffc506"
                          >mdi-whatsapp
                        </v-icon>
                      </v-avatar> WhatsApp</h3>
                    </a>
                  </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </h2>
          
        </div>
      </v-card>
      </div>
      
      <div class="Mapa">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d899.1768595846215!2d-68.11197498449624!3d-16.522822071748863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1683150352209!5m2!1ses-419!2sbo" width="600" height="450" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: false,
      darkMode:false,
      dialog: false,
    };
  },
  methods: {
    openOverlay() {
      this.showOverlay = true;
    },
    closeOverlay() {
      this.showOverlay = false;
    },
  },
};
</script>

<style>
*{
  
}
.Informacion{
  display: flex;
  margin-top: 20px;
  padding: 10px;
}


.social-media-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none;
  color: inherit;
}

.social-media-row img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.Contacto {
  display: flex;
  flex-wrap: wrap;
  font-size: 1em;
  justify-content: space-evenly;
  width: 100%;
  
}
.dark-mode {
  background-color: #424242;
  color: #fff;
}
v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  gap: 1rem;
  width: 100%; 
  margin-top:100px;
  max-width: 600px; 
}
.v-card{
  padding: 10px;
}

.Mapa {
  display: flex;
  justify-content: center; 
  padding: 1rem;
  max-width: 100%;
  position: relative;
  width: 100%;
  margin-top: 1rem; 
}

.Mapa iframe {
  border: 1px solid aliceblue;
  border-radius: 20px;
  max-width: 100%; 
  height: auto; 
}
.Titulo{
  color:#0369b7!important;
}
.descripcion{
  display: flex;
  width: 50%;
  justify-content: start;
  margin-left:10%;
}
@media (min-width: 768px) {
  v-card {
    width: 50%;
    max-width: 400px; 
  }

  .Mapa {
    margin-top: 0;
    width: 50%;
    max-width: 400px;
  }
}
.dialog-mobile .v-dialog__content {
  max-width: 90% !important;
}

.my-class {
    color: red;
  }
  .my-class--dark {
    color: blue;
  }
  .hrc{
    position: relative; 
            top: 20px; 
            border: none; 
            height: 3px; 
            background: #ffc506;
            margin-bottom: 50px; 
  }
  .oredes{
    color: #fff;
  }
</style>