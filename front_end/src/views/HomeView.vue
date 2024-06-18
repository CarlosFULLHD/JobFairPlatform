<template>
  <v-app :class="{ 'dark-mode': darkMode }">
    <div class="pagina">
    <div class="section1">
      <v-carousel
      class="carousel"
      color="primary"
      contain
        >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          :style="{ border: '0' }"
          contain
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div class="section2">
      <v-card
          elevation="15"
          class="mx-auto card"
          max-width="344"       
          
        >
          <v-img
            src="@/assets/feria.jpg"
            height="200px"
          ></v-img>
          <v-card-title >
            <h3 class="h">Feria del Empleo</h3>
            <v-spacer></v-spacer>            
            <v-btn
              icon
              @click="show = !show"
            >
            <v-avatar
                color="#004070!important"
                size="50"
              >
              <v-icon
                size="30"
                color="#ffc506"
                >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
              </v-avatar>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="show">
              <hr class="hrc">
              <v-card-text color="primary">
                <p class="texto">La Feria del Empleo UCB es un evento que concentra la oferta y demanda de puestos laborales, facilita el contacto entre instituciones empleadoras y personas interesadas en obtener un trabajo.</p>
              </v-card-text>
            </div>
          </v-expand-transition>
      </v-card>
      <v-card
          elevation="15"
          class="mx-auto card"
          max-width="344"
        >
          <v-img
            src="@/assets/bolsa.jpg"
            height="200px"
          ></v-img>
          <v-card-title >
            <h3 class="h">Bolsa de trabajo</h3>
            <v-spacer></v-spacer>            
            <v-btn
              icon
              @click="show = !show"
            >
            <v-avatar
                color="#004070!important"
                size="50"
              >
              <v-icon
                size="30"
                color="#ffc506"
                >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
              </v-avatar>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="show">
              <hr class="hrc">
              <v-card-text color="primary">
                <p class="texto">Los convenios con instituciones públicas y privadas te permiten realizar pasantías que te permitirán adquirir experiencia laboral para iniciar tu vida personal.</p>
              </v-card-text>
            </div>
          </v-expand-transition>
      </v-card>
      <v-card
          elevation="15"
          class="mx-auto card"
          max-width="344"
        >
          <v-img
            src="@/assets/taller.jpg"
            height="200px"
          ></v-img>
          <v-card-title >
            <h3 class="h">Talleres de <br>Empleabilidad</h3>
            <v-spacer></v-spacer>            
            <v-btn
              icon
              @click="show = !show"
            >
            <v-avatar
                color="#004070!important"
                size="50"
              >
              <v-icon
                size="30"
                color="#ffc506"
                >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
              </v-avatar>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="show">
              <hr class="hrc">
              <v-card-text color="primary">
                <p class="texto">Complementando tu formación académica, la USEI te apoya con el desarrollo de competencias laborales  para que tengas una favorable transición al mercado laboral.</p>
              </v-card-text>
            </div>
          </v-expand-transition>
      </v-card>
    </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return{
      show: false,
      darkMode:false,
      items: [
          {
            src: require('@/assets/slide1.jpeg'),
          },
          {
            src: require('@/assets/slide2.jpeg'),
          },
          {
            src: require('@/assets/slide3.jpeg'),
          },
          {
            src: require('@/assets/slide4.jpeg'),
          },
        ],
    };
  }
};
</script>

<style>
.pagina{
  width: 100%;
  height: 100%;
  background-image: url('../assets/cato-foto.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.section1{
  width: 100%;
}
.section2{
  display:flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  padding: 20px;
  background-color: #004070!important;
  margin-top:100px;
  margin-bottom:100px;
}
.texto{
  text-align:justify;
  font-weight: 600;
  font-family: helvetica;
  font-size: 16px;
}
.h{
  color: #004070!important;;
  text-align:justify;
  font-weight: 600;
  font-family: helvetica;
}
.card{
  margin-top: 15px;
}

</style>