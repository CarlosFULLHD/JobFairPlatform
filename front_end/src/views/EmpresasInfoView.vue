<template>
  <v-app>
    <v-main>
      <template>
        <head>
          <link
            href="https://fonts.googleapis.com/css?family=Cabin:400&display=swap"
            rel="stylesheet"
          />
        </head>
        <v-container class="px-4 py-8" fluid>
          <!-- añadí un padding y margin a la container para mejorar la ergonomía -->
          <v-row justify="center">
            <v-col cols="12">
              <h1 class="display-2 text-center mb-2" style="color: #0051a9">
                {{ infoNombre }}
              </h1>
              <!-- cambié el color del texto del título y añadí un margin bottom -->
              <h3 class="text-center" style="color: #5c5c5c">
                {{ infoRubro }}
              </h3>
              <!-- cambié el color del texto del subtítulo -->
              <v-divider class="my-5" color="#0051a9"></v-divider>
              <!-- añadí un color a la línea divisoria -->
            </v-col>
            <v-col cols="12" md="6">
              <v-carousel
                :cycle="true"
                :interval="2500"
                show-arrows
                show-indicators
              >
                <v-carousel-item
                  v-for="(img, index) in infoImgObject"
                  :key="index"
                  :src="img.url"
                  cover
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" md="6">
              <h2 class="headline text-center mb-2" style="color: #0051a9">
                Conócenos
              </h2>
              <!-- cambié el color y añadí un margin bottom -->
              <v-divider class="my-3" color="#0051a9"></v-divider>
              <p style="color: #5c5c5c">{{ infoResena }}</p>
              <!-- cambié el color del texto de la reseña -->
              <v-divider class="my-3" color="#0051a9"></v-divider>
              <h2 class="headline text-center mb-2" style="color: #0051a9">
                Contactos
              </h2>

              <!-- cambié el color y añadí un margin bottom -->
              <v-card-actions class="d-flex justify-center flex-wrap">
                <v-btn
                  v-for="(link, index) in infoLinksObject"
                  :key="index"
                  :href="link.url"
                  class="mx-2"
                  fab
                >
                  <v-icon>{{ logos[link.llave] }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="12" xl="12">
              <v-divider class="my-5" color="#0051a9"></v-divider>
              <h2 class="headline text-center mb-2" style="color: #0051a9">
                Nuestros videos
              </h2>
              <v-row class="video-row" no-gutters>
                <v-col
                  v-for="(video, index) in videoImgObject"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <LazyYoutube
                    ref="youtubeLazyVideo"
                    :src="video.url"
                    max-width="100%"
                    aspect-ratio="4:3"
                    thumbnail-quality="standard"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-main>
  </v-app>
</template>

<style scoped>
body {
  font-family: "Cabin", sans-serif;
  font-weight: 400;
  font-size: 60px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Cabin", sans-serif;
  font-weight: 400;
  font-size: 50px;
}

p {
  font-family: "Cabin", sans-serif;
  font-weight: 400;
  font-size: 30px;
}
</style>

<script>
import Tarjetas from "@/services/Tarjetas";
import Instituciones from "@/services/Instituciones";
export default {
  name: "EmpresasInfoVue",

  data() {
    return {
      id: this.$route.params.inst_id,
      dialog: false,
      infoLinksObject: null,
      infoImgObject: null,
      videoImgObject: null,
      infoNombre: "",
      infoEmail: "",
      infoTelefono: "",
      infoResena: "",
      infoUbicacion: "",
      infoRubro: "",
      logos: {
        Facebook: "mdi mdi-facebook",
        Instagram: "mdi mdi-instagram",
        Whatsapp: "mdi mdi-whatsapp",
        Linkedin: "mdi mdi-linkedin",
      },
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let xd = await Instituciones.getInstById(this.id);
      this.infoId = xd.data.instituciones_id;
      this.infoNombre = xd.data.nombre;
      this.infoEmail = xd.data.email;
      this.infoTelefono = xd.data.telefono;
      this.infoResena = xd.data.resena;
      this.infoUbicacion = xd.data.ubicacion;
      this.infoRubro = xd.data.institucion;
      this.dialog = true;
      try {
        xd = await Tarjetas.getImgByIdTwo(this.id);
        this.infoImgObject = xd.data;
        xd = await Tarjetas.getVidById(this.id);
        this.videoImgObject = xd.data;
        xd = await Tarjetas.getLinksById(this.id);
        console.log(xd.data);
        this.infoLinksObject = xd.data;
      } catch (error) {
        this.infoImgObject = {};
      }
    },
  },
};
</script>
