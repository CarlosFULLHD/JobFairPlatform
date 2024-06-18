<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col v-for="(value , key) in tarjetasObject" :key="key"
            cols="auto"
            sm="6"
            md="4"
            lg="20"
          >
            <v-hover v-slot="{ hover }">
              <div class="card">
                <v-card 
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                  shaped
                  max-width="350"
                  class="my-3"
                >
                <!-- IMAGENES EMPRESA -->
                  <v-carousel hide-delimiters  height="275" width="275">
                    <span  v-for="(xd , key) in imagenesObject" :key="key">
                    <v-carousel-item
                      v-if ="xd['instituciones_id'] === value['instituciones_id']"
                      :src="xd['url']"
                      cover
                    >
                  </v-carousel-item>
                  </span>
                  </v-carousel>

                  <!-- TITULO -->
                  <v-card-title class="primary--text headline mb-0 custom-card-title">
                    {{ value['nombre'] }}
                  </v-card-title>
                  <v-divider></v-divider>
                  
                  <v-card-text>
                    <!-- RUBRO -->
                    <strong>Categoría: </strong>{{ value['institucion'] }}
                    
                    <!-- RESEÑA -->
                    <div><strong>Información: </strong> {{ value['resena'] }}</div>
                    <!-- UBICACIÓN -->
                    <div><strong>Ubicación: </strong> {{ value['ubicacion'] }}</div>
                  </v-card-text>
                  <v-divider></v-divider>


                  <v-card-actions style=" justify-content: space-between;">
                    <v-btn color="#ffc506"
                    rounded
            
                    @click="charlasDialogo(value['instituciones_id'], value['nombre'])"
                    class="botonesparapc mr-4"
                    >
                     <strong>Charlas</strong>
                    </v-btn>
                    <v-btn color="#ffc506"
                  
                    rounded
                    @click="infoDialog(value['instituciones_id'])" 
                    class="botonesparapc mr-4"
                    >
                    <strong>Información</strong>
                    </v-btn>
                  </v-card-actions>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <span  v-for="(xd , key) in linksObject" :key="key">
                      <v-btn :href="xd.url" v-if ="xd['instituciones_id'] === value['instituciones_id']">
                        <v-icon color="primary"
                        > {{ logos[xd['llave']] }}
                        </v-icon>
                      </v-btn>
                    
                    </span>
                  </v-card-actions>
                </v-card>
              </div>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
     


      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="1500"
      >
        
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            > {{ nombreCharlaDialog }}</v-toolbar>
            <v-card-text>
            </v-card-text>


            
            <v-card-title v-if="charlasObject !== null">Charlas disponibles</v-card-title>
              <v-card-text>
                <v-container>
                  <span v-if="charlasObject !== null">
              <v-data-table
                :headers="headers"
                :items="charlasObject"
                :items-per-page="5"
                :class="['elevation-1', 'overflow-x-auto']"
              >
                <template v-slot:[`item.header`]="{ item }">
                  {{ item.header }}
                </template>
                <template v-slot:[`item.tituloCharla`]="{ item }">
                  {{ item.nombrecharla }}
                </template>
                <template v-slot:[`item.fechaInicioCharla`]="{ item }">
                  {{ item.fechaInicio }}
                </template>
                <template v-slot:[`item.fechaFinalCharla`]="{ item }">
                  {{ item.fechaFina }}
                </template>
                <template v-slot:[`item.cuposCharla`]="{ item }">
                  {{ item.Cupos_charla }}
                </template>
                <template v-slot:[`item.linkCharla`]="{ item }">
                  {{ item.link }}
                </template>
               

                <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  block
                  elevation="2"
                  rounded
                  color="#ffc506"
                  @click="addCharlaCuenta(item)"
                >Inscribirse</v-btn>
              </template>



              </v-data-table>
            </span>
            <span v-else>
              <h2>No existen charlas de {{ nombreCharlaDialog }} aún, estate atento</h2>
            </span>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#ffc506" block @click="dialog.value = false">Cerrar</v-btn>
          </v-card-actions>
        

          </v-card>
        </template>
      </v-dialog>

















    </v-main>
  </v-app>
</template>


  <script>
  import { mapState } from 'vuex';
  import Tarjetas from '@/services/Tarjetas'
  import Charlas from '@/services/Charlas'
    export default {
      data: () => ({
        headers: [
        {text: 'Título',align: 'start', value: 'tituloCharla'},
        { text: 'Fecha inicio', value: 'fechaInicioCharla' },
        { text: 'Fecha fin', value: 'fechaFinalCharla' },
        { text: 'Cupos disponibles', value: 'cuposCharla' },
        { text: 'Link', value: 'linkCharla' },
        { text: 'Inscribirse', value: 'actions', sortable: false },
        ],


        idDialog : null,
        nameDialog: null,
        dialog: false,
        charlasObject: null,

        tituloCharla: null,
        fechaInicioCharla: null,
        fechaFinalCharla: null,
        cuposCharla: null,
        linkCharla: null,
        idCharla: null,

  
        tarjetasObject: {},
        imagenesObject: {},
        linksObject: {},
        videoObject: {},
        logos: {
              Facebook:"mdi mdi-facebook" ,
              Instagram:"mdi mdi-instagram" ,
              Whatsapp:"mdi mdi-whatsapp" ,
              Linkedin:"mdi mdi-linkedin", 
          },
        alignments: [
          'start',
          'center',
          'end',
        ],
      }),
      created(){
        this.initialize();
        this.imgs();
        this.links();
        this.cleanInitObjects();
      },
      computed: {

        ...mapState(['navigation']),

        // TARJETAS LENGTH
        tarjetasLength() {
          return Object.keys(this.tarjetasObject).length
        },

        idCharlaDialog() {
          return this.idDialog
        },
        nombreCharlaDialog(){
          return this.nameDialog
        },
        charlasList(){
          return this.charlasObject
        },
      },
      methods: {
        async charlasDialogo(id, name) {
          this.dialog = true
          this.idDialog = id
          this.nameDialog = name

          try {
            let xd = await Charlas.getAllCharlasById(this.idDialog)
            this.charlasObject = xd.data
     
          } catch(error){
            this.charlasObject = null
        
          }
        },

        async addCharlaCuenta(item){
          let dp = Object.assign({}, item)
          const charId = dp.charlas_id
          const nameCharla = dp.nombrecharla
          const fechaCharla = dp.fechaInicio
          const linkCharla = dp.link

          const dataUp = {
            cuenta_cuenta_id: this.$store.getters.getCuentaId,
            charlas_charlas_id: charId
          }
          try {
            await Charlas.postCharlaCuenta(dataUp)
            const mail = this.$store.getters.getEmailU

           // sendMail(mail) 
           
            this.dialog = false
            window.scrollTo({
              top: 0,
              behavior: 'smooth' // or 'auto' for instant scrolling
            });

            let mailData = {
              titulo: `Inscripción charla ${ nameCharla } USEI`,
              cuerpo: `<h2>Inscripción confirmada</h2>
                        <p>Felicidades ${this.$store.getters.getCuenta}, te inscribiste a la charla ${nameCharla}</p>
                        <p>Te esperamos a las: ${fechaCharla} </p>
                        <p>Link: ${linkCharla} <a href="${linkCharla}>  </a></p>"`,
              correo: `${mail}`,
            }


            Charlas.sendMail(mailData)
            this.$store.dispatch('successAlertAsync',`Inscrito exitosamente, se envio un correo a ${mail}`)
          } catch (error) {
            this.dialog = false
            window.scrollTo({
              top: 0,
              behavior: 'smooth' // or 'auto' for instant scrolling
            });
            this.$store.dispatch('errorAlertAsync',`Problemas al inscribir, intente de nuevo`)
          }
          const navigationComponent = this.$store.state.navigationComponent;
          if (navigationComponent){
            navigationComponent.loadCharlasSubscritas()
          }
          if (this.navigation) {
        this.navigation.doSomething();
      }
          //this.$store.dispatch('changeCharlasInscritasObj',this.userId)
        },

        



        infoDialog(id){
        
          this.$router.push({name:'EmpresasInfo', params: {inst_id: id}})

        },
        async initialize() {
          Tarjetas.crearTarjeta().then((result) => {
            this.tarjetasObject = result.data
          }).catch((error) => {
            console.log(error)
          });
        },

        async imgs(){
          let xp = await Tarjetas.getImgs()
          this.imagenesObject = xp.data
        },

        async links() {
          let xp = await Tarjetas.getLinks()
          this.linksObject = xp.data
        },

       
        test () {
          let xd = this.tarjetasObject
          alert(`${xd['links_llaves']}`)
          Object.keys(xd).forEach(key => {
            console.log(key, xd[key]);
          });
        },
        cleanInitObjects() {
        this.tarjetasObject = {}
        this.imagenesObject = {}
        this.linksObject = {}
        this.videoObject = {}
      },
        cleanInfo() {
        this.infoLinksObject = {}
        this.infoImgObject = {}
        this.videoImgObject = {}
        this.dialog = false
        }
      },
      mounted() {
        //const testHola = this.$refs.testHola
        //this.testicul(testHola)
      },
      
      
    }
  </script>

<style scoped>
@media (min-width: 768px) {
  .botonesparapc{
    margin:0px 40px;
}
}
.card {
  width: 100%;
}

.on-hover {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  transform: scale(1.02);
}

.card-subtitle {
  font-size: 18px;
  margin-top: 16px;
}

.card-text {
  font-size: 16px;
  margin-bottom: 16px;
}

.miBoton {
  color: white;
  background-color: #ffc506;
}


.v-window-item {
  height: 100%;
}

.video-row {
  overflow-x: auto;
  white-space: nowrap;
}
</style>


