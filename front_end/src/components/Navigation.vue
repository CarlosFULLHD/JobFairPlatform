/* eslint-disable */
<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>
      <div class="branding">
        <img src="@/assets/logo.png" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="link" :to="{ name: 'Home' }"
            ><v-icon class="icono">home</v-icon>Home</router-link
          >
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Empresas' }"
            ><v-icon class="icono">corporate_fare</v-icon>Empresas</router-link
          >
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Chat' }"
            ><v-icon class="icono">forum</v-icon>Chat</router-link
          >
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Calendario' }"
            ><v-icon class="icono">calendar_month</v-icon
            >Calendario</router-link
          >
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Contacto' }"
            ><v-icon class="icono">account_circle</v-icon>Contactos</router-link
          >
        </li>
        <span v-if="loggedInFlag && userFlag">
          <li>
            <router-link class="link" :to="{ name: 'Crud' }"
              ><v-icon class="icono">edit_note</v-icon
              >Administración</router-link
            >
          </li>
        </span>
        <li>
          <!-- CAMPANA -->
          <span v-if="notificationObjectAdmin.length > 0 && userFlag">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <div class="Icono" style="display: flex; margin-right: 20px">
                    <v-badge
                      :content="notificationMessages"
                      :value="notificationMessages"
                      size="400"
                      overlap
                    >
                      <v-avatar color="#ffc506" size="50">
                        <v-icon size="30">mdi-bell </v-icon>
                      </v-avatar>
                    </v-badge>
                  </div>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="notification in notificationObjectAdmin"
                    :key="notification.estudcha_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Nuevo inscrito en:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        notification.nombrecharla
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        icon
                        @click="deleteNotification(notification.estudcha_id)"
                      >
                        <v-icon color="error">mdi-delete</v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>

                  <center>
                    <v-btn
                      class="mx-1"
                      color="error"
                      @click="clearAllNotifications"
                    >
                      Limpiar todas
                    </v-btn>
                  </center>
                </v-list>
              </v-card>
            </v-menu>
          </span>
        </li>
        <!--Icono de perfil y opciones!-->
        <li>
          <v-row justify="center">
            <v-menu bottom min-width="200px" margin="10px" rounded offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on">
                  <v-avatar color="brown" size="50">
                    <span class="white--text text-h5">{{ userAccount }}</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar color="brown">
                      <span class="white--text text-h5">{{ userAccount }}</span>
                    </v-avatar>
                    <h3>{{ userName }}</h3>
                    <p class="text-caption mt-1">
                      {{ usserEmail }}
                    </p>
                    <v-divider class="my-3" v-if="loggedInFlag"></v-divider>

                    <v-btn
                      v-if="loggedInFlag"
                      @click="dialog = true"
                      depressed
                      block
                      text
                    >
                      Charlas inscritas
                    </v-btn>

                    <v-divider
                      class="my-3"
                      v-if="loggedInFlag && userFlag"
                    ></v-divider>
                    <v-btn
                      v-if="loggedInFlag && userFlag"
                      @click="dialog2 = true"
                      depressed
                      block
                      text
                    >
                      Ver inscritos en charlas
                    </v-btn>
                    <v-divider class="my-3" v-if="!loggedInFlag"></v-divider>
                    <router-link class="link" :to="{ name: 'CuentaCrear' }">
                      <v-btn v-if="!loggedInFlag" depressed block text>
                        Crear Cuenta
                      </v-btn>
                    </router-link>
                    <v-divider class="my-3" v-if="!loggedInFlag"></v-divider>
                    <router-link class="link" :to="{ name: 'Login' }">
                      <v-btn v-if="!loggedInFlag" depressed block text>
                        Iniciar Sesion
                      </v-btn>
                    </router-link>
                    <v-divider class="my-3"></v-divider>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      label="Modo oscuro"
                      style="display: flex; margin-left: 20px"
                    >
                      <v-btn depressed rounded text> </v-btn>
                    </v-switch>
                    <v-divider class="my-3"></v-divider>

                    <span v-if="loggedInFlag">
                      <v-dialog
                        v-model="dialogLogout"
                        persistent
                        max-width="290"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="#ffc506"
                            rounded
                            v-bind="attrs"
                            v-on="on"
                          >
                            Cerrar sesión<v-icon>logout</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">
                            ¿Segúro que desea desconectarse?
                          </v-card-title>
                          <v-card-text
                            >Cerrar sesión para {{ userName }}</v-card-text
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialogLogout = false"
                            >
                              No
                            </v-btn>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="doLogout()"
                            >
                              Si
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </span>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-row>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <v-row justify="center">
              <v-menu bottom min-width="200px" margin="10px" rounded offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon x-large v-on="on">
                    <v-avatar color="brown" size="50">
                      <span class="white--text text-h5">{{ userAccount }}</span>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                      <v-avatar color="brown">
                        <span class="white--text text-h5">{{
                          userAccount
                        }}</span>
                      </v-avatar>
                      <h3>{{ userName }}</h3>
                      <p class="text-caption mt-1">
                        {{ usserEmail }}
                      </p>
                      <v-divider class="my-3"></v-divider>

                      <v-btn @click="dialog = true" depressed rounded text>
                        Charlas inscritas
                      </v-btn>

                      <v-divider class="my-3"></v-divider>
                      <v-btn @click="dialog2 = true" depressed rounded text>
                        Ver inscritos en charlas
                      </v-btn>
                      <v-divider class="my-3"></v-divider>
                      <router-link class="link" :to="{ name: 'CuentaCrear' }">
                        <v-btn depressed rounded text> Crear Cuenta </v-btn>
                      </router-link>
                      <v-divider class="my-3"></v-divider>
                      <router-link class="link" :to="{ name: 'Login' }">
                        <v-btn depressed rounded text> Iniciar Sesion </v-btn>
                      </router-link>
                      <v-divider class="my-3"></v-divider>
                      <v-switch
                        v-model="$vuetify.theme.dark"
                        label="Alternar modo oscuro "
                        style="display: flex; margin-left: 20px"
                      >
                        <v-btn depressed rounded text> </v-btn>
                      </v-switch>
                      <v-divider class="my-3"></v-divider>
                      <span v-if="loggedInFlag">
                        <v-dialog
                          v-model="dialogLogout"
                          persistent
                          max-width="290"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="#ffc506"
                              rounded
                              v-bind="attrs"
                              v-on="on"
                            >
                              Cerrar sesión <v-icon>logout</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="text-h5">
                              ¿Segúro que desea desconectarse?
                            </v-card-title>
                            <v-card-text
                              >Cerrar sesión para {{ userName }}</v-card-text
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="dialogLogout = false"
                              >
                                No
                              </v-btn>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="doLogout()"
                              >
                                Si
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </span>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </v-row>
          </li>
          <li></li>
          <li>
            <div class="icons">
              <font-awesome-icon
                :icon="['fad', 'calendar-days']"
                size="lg"
                style="
                  --fa-primary-color: #71a1f4;
                  --fa-secondary-color: #2e3748;
                "
              />
            </div>
            <router-link class="linkD" :to="{ name: 'Home' }"
              ><v-icon class="icono">home</v-icon>Home</router-link
            >
          </li>
          <li>
            <router-link class="linkD" :to="{ name: 'Empresas' }"
              ><v-icon class="icono">corporate_fare</v-icon
              >Empresas</router-link
            >
          </li>
          <li>
            <router-link class="linkD" :to="{ name: 'Chat' }"
              ><v-icon class="icono">forum</v-icon>Chat</router-link
            >
          </li>
          <li>
            <router-link class="linkD" :to="{ name: 'Calendario' }"
              ><v-icon class="icono">calendar_month</v-icon
              >Calendario</router-link
            >
          </li>
          <li>
            <router-link class="linkD" :to="{ name: 'Contacto' }"
              ><v-icon class="icono">account_circle</v-icon
              >Contactos</router-link
            >
          </li>
          <span v-if="loggedInFlag && userFlag">
            <li>
              <router-link class="linkD" :to="{ name: 'Crud' }"
                ><v-icon class="icono">edit_note</v-icon
                >Administración</router-link
              >
            </li>
          </span>
        </ul>
      </transition>
    </nav>

    <!-- LOG OUT -->

    <!--Charlas Inscritas e Inscritos en Charlas!-->
    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" style="display: none">
            Cerrar
          </v-btn>
        </template>

        <v-card>
          <v-card-title>Charlas inscritas de {{ userName }}</v-card-title>
          <v-card-text v-if="charlasObjectUser.length > 0">
            <v-container>
              <v-data-table
                :headers="headersCharlasUser"
                :items="charlasObjectUser"
                :items-per-page="5"
              >
                <template v-slot:[`item.institucionCharlaUser`]="{ item }">
                  {{ item.nombre }}
                </template>
                <template v-slot:[`item.tituloCharlaUser`]="{ item }">
                  {{ item.nombrecharla }}
                </template>
                <template v-slot:[`item.fechaInicioCharlaUser`]="{ item }">
                  {{ item.fechainicio }}
                </template>
                <template v-slot:[`item.fechaFinaCharlaUser`]="{ item }">
                  {{ item.fechafina }}
                </template>
                <template v-slot:[`item.linkCharlaUser`]="{ item }">
                  <a v-bind:href="item.link" target="_blank">{{ item.link }}</a>
                </template>
                <template v-slot:[`item.idCharlaUser`]="{ item }">
                  {{ item.estudcha_id }}
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn icon @click="deleteCharlaUser(item)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <h1>No tiene charlas inscritas todavía</h1>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog2" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" style="display: none">
            Cerrar
          </v-btn>
        </template>

        <v-card>
          <v-card-title>Datos de charlas</v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="4">
              <v-combobox
                v-model="comboName"
                label="Institución"
                :items="nombreArray"
                :item-value="IdArray"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn color="#ffc506" rounded @click="charlasDialogo()">
                <strong>Buscar</strong>
              </v-btn>
            </v-col>
          </v-row>
          <v-card-text v-if="charlasObjectAdmin.length > 0">
            <v-card-title>{{ this.comboName }}</v-card-title>
            <v-container>
              <v-data-table
                :headers="headersCharlasSuperUser"
                :items="charlasObjectAdmin"
                :items-per-page="5"
              >
                <template v-slot:[`item.header`]="{ item }">
                  {{ item.header }}
                </template>
                <template v-slot:[`item.institucionCharlaAdmin`]="{ item }">
                  {{ item.nombre }}
                </template>
                <template v-slot:[`item.tituloCharlaAdmin`]="{ item }">
                  {{ item.nombrecharla }}
                </template>
                <template v-slot:[`item.fechaInicioCharlaAdmin`]="{ item }">
                  {{ item.fechainicio }}
                </template>
                <template v-slot:[`item.fechaFinaCharlaAdmin`]="{ item }">
                  {{ item.fechafina }}
                </template>
                <template v-slot:[`item.linkCharlaAdmin`]="{ item }">
                  <a v-bind:href="item.link" target="_blank">{{ item.link }}</a>
                </template>
                <template v-slot:[`item.cupoMaximoAdmin`]="{ item }">
                  {{ item.cupos_charla }}
                </template>
                <template v-slot:[`item.inscritosAdmin`]="{ item }">
                  {{ item.inscritos }}
                </template>
                <template v-slot:[`item.libresAdmin`]="{ item }">
                  {{ item.libres }}
                </template>
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <h1>No existen charlas de {{ this.comboName }}</h1>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog2 = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </header>
</template>
<script>
import { mapMutations } from "vuex";
import Charlas from "@/services/Charlas";
import Calendario from "@/services/Calendario";
export default {
  name: "navigationView",
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      drawer: false,
      dialog: false,
      dialog2: false,
      dialogLogout: false,

      user: {},

      charlasAdmiObject: {},
      comboName: null,
      comboboxArray: [],

      notifications: [
        {
          id: 1,
          title: "Nuevo Inscrito en :",
          subtitle: "Conferencia BNB",
        },
        {
          id: 1,
          title: "Nuevo Inscrito en :",
          subtitle: "Conferencia BNB",
        },
        {
          id: 1,
          title: "Nuevo Inscrito en :",
          subtitle: "Conferencia BNB",
        },
      ],
      institucionCharlaUser: null,
      tituloCharlaUser: null,
      fechaInicioCharlaUser: null,
      fechaFinaCharlaUser: null,
      linkCharlaUser: null,
      idCharlaUser: null,
      userCharlaObject: {},
      headersCharlasUser: [
        { text: "Institución", align: "start", value: "institucionCharlaUser" },
        { text: "Título", align: "start", value: "tituloCharlaUser" },
        { text: "Fecha inicio", value: "fechaInicioCharlaUser" },
        { text: "Fecha fin", value: "fechaFinaCharlaUser" },
        { text: "Link", value: "linkCharlaUser" },
        { text: "Eliminar", value: "actions", sortable: false },
      ],

      headersCharlasSuperUser: [
        {
          text: "Institución",
          align: "start",
          value: "institucionCharlaAdmin",
        },
        { text: "Título", align: "start", value: "tituloCharlaAdmin" },
        { text: "Fecha inicio", value: "fechaInicioCharlaAdmin" },
        { text: "Fecha fin", value: "fechaFinaCharlaAdmin" },
        { text: "Link", value: "linkCharlaAdmin" },
        { text: "Cupo máximo", value: "cupoMaximoAdmin" },
        { text: "Inscritos", value: "inscritosAdmin" },
        { text: "Espacios libres", value: "libresAdmin" },
      ],
      institucionCharlaAdmin: null,
      tituloCharlaAdmin: null,
      fechaInicioCharlaAdmin: null,
      fechaFinaCharlaAdmin: null,
      linkCharlaAdmin: null,
      cupoMaximoAdmin: null,
      inscritosAdmin: null,
      libresAdmin: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    const self = this;
    this.$store.commit("setNavigation", self);
    this.checkScreen();
    this.loadCharlasSubscritas();
    this.loadComboBox();
    this.getNotifications();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },

  methods: {
    ...mapMutations(["setNavigation"]),
    doSomething() {
      this.loadCharlasSubscritas();
      this.getNotifications();
    },

    doLogout() {
      this.dialogLogout = false;
      this.$store.dispatch("changeUserId", null);
      this.$store.dispatch("changeloggedinFlag", false);
      this.$store.dispatch("changeUserAccount", "");
      this.$store.dispatch("changeUserEmail", "");
      this.$store.dispatch("changeSuperUser", false);
      this.$store.dispatch("changeUserPwd", "");
      this.$store.dispatch("successAlertAsync", "Se cerro la sesión");
      this.$router.push({ name: "Home" });
    },

    clearAllNotifications() {
      let xd = this.notificationObjectAdmin;
      Object.keys(xd).forEach(async (key) => {
        await Charlas.clearNotificationById(xd[key].estudcha_id);
        await this.$store.dispatch("changeNotificacionesList");
      });
    },
    async deleteNotification(id) {
      await Charlas.clearNotificationById(id);
      await this.$store.dispatch("changeNotificacionesList");
    },

    async getNotifications() {
      if (this.loggedInFlag && this.userFlag) {
        await this.$store.dispatch("changeNotificacionesList");
      }
    },
    // LOAD COMBOBOX FOR EXISTING BUSINESS
    async loadComboBox() {
      let xd = await Calendario.getInstituciones();
      this.comboboxArray = xd.data;
    },

    getKeyByValue(value) {
      const item = this.comboboxArray.find((obj) => obj.nombre === value);
      return item ? item.instituciones_id : null;
    },

    charlasDialogo() {
      let id = this.getKeyByValue(this.comboName);
      this.loadCharlasAdmin(id);
    },
    async deleteCharlaUser(item) {
      let dp = Object.assign({}, item);
      const charId = dp.estudcha_id;
      try {
        await Charlas.deleteCharlaCuentaById(charId);

        this.dialog = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // or 'auto' for instant scrolling
        });

        this.$store.dispatch(
          "successAlertAsync",
          `Se elimino subscripción a la charla ${dp.nombre}`
        );
      } catch (error) {
        this.dialog = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // or 'auto' for instant scrolling
        });
        this.$store.dispatch(
          "errorAlertAsync",
          `Problemas al conectar a base de datos`
        );
      }
      this.loadCharlasSubscritas();
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        this.scrollNav = true;
      }
      this.scrollNav = false;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    loadCharlasSubscritas() {
      if (this.loggedInFlag) {
        this.$store.dispatch("changeCharlasInscritasObj", this.userId);
      }
    },
    async loadCharlasAdmin(instId) {
      if (this.loggedInFlag) {
        await this.$store.dispatch("changeCharlasAdminObj", instId);
      }
    },
  },
  computed: {
    notificationMessages() {
      return this.$store.getters.getNotificacionesList.length;
    },

    notificationObjectAdmin() {
      return this.$store.getters.getNotificacionesList.length === 0
        ? {}
        : this.$store.getters.getNotificacionesList;
    },

    charlasObjectAdmin() {
      return this.$store.getters.getCharlasAdminObj.length === 0
        ? {}
        : this.$store.getters.getCharlasAdminObj;
    },

    charlasObjectUser() {
      return this.$store.getters.getCharlasInscritasObj.length === 0
        ? {}
        : this.$store.getters.getCharlasInscritasObj;
    },

    userAccount() {
      return this.$store.getters.getCuenta.charAt(0) == ""
        ? "UCB"
        : this.$store.getters.getCuenta.charAt(0);
    },
    userName() {
      return this.$store.getters.getCuenta == ""
        ? "UCB"
        : this.$store.getters.getCuenta;
    },
    usserEmail() {
      return this.$store.getters.getEmailU == ""
        ? ""
        : this.$store.getters.getEmailU;
    },
    userFlag() {
      return this.$store.getters.getsuperU;
    },
    userId() {
      return this.$store.getters.getCuentaId;
    },
    loggedInFlag() {
      return this.$store.getters.getloggedinFlag;
    },
    nombreArray() {
      return this.comboboxArray.map((item) => item.nombre);
    },
    IdArray() {
      return this.comboboxArray.map((item) => item.instituciones_id);
    },
  },
};
</script>

<style lang="scss" scoped>
//*{ border: 1px solid red;}
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap");
header {
  position: fixed;
  background-color: #004070 !important;
  z-index: 99;
  width: 100%;
  height: 15vh;
  top: 0;
  transition: 0.5s ease all;
  color: #fff;
  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }
  }
  ul,
  .link {
    font-weight: 500;
    color: #fff;
    list-style: none;
    text-decoration: none;
  }
  li {
    text-transform: uppercase;
    margin-left: 20px;
  }
  .link {
    font-size: 1.8vh;
    background: transparent;
    border: none;
    padding: 1em 1.5em;
    color: #ffedd3;
    text-transform: uppercase;
    position: relative;
    transition: 0.5s ease;
    font-style: "Raleway", normal;
    /*font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    &:hover{
      color:#ffd717;
      border-color: #ffd717;
    }*/
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 0;
      background-color: #ffc506;
      transition: 0.5s ease;
    }
    &:hover {
      color: #1e1e2b;
      transition-delay: 0.5s;
    }
    &:hover::before {
      width: 100%;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 0;
      width: 100%;
      background-color: #ffc506;
      transition: 0.4s ease;
      z-index: -1;
    }
    &:hover::after {
      height: 100%;
      transition-delay: 0.4s;
      color: aliceblue;
    }
  }
  .branding {
    display: flex;
    align-items: center;
    img {
      width: 10vh;
      transition: 0.5s ease all;
    }
  }
  .navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
  .icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 24px;
    height: 100%;
    i {
      cursor: pointer;
      font-size: 24px;
      transition: 0.8s ease all;
    }
  }
  .icon-active {
    transform: rotate(180deg);
  }
  .icons {
    --fa-primary-color: #71a1f4;
    --fa-secondary-color: #2e3748;
  }
  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 200px;
    height: 100%;
    background-color: #ffd717;
    opacity: 0.9;
    top: 0;
    left: 0;
    padding-top: 80px;
    li {
      margin-left: 0;
      margin-top: 20px;
      .linkD {
        font-size: 15px;
        font-weight: 400;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        color: #000;
        font-style: "Raleway", normal;
        text-decoration: none;

        &:hover {
          color: #0d63a5;
        }
        &::before {
          background-color: #0d63a5;
          content: "";
          display: inline-block;
          height: 1px;
          margin-right: 5px;
          transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: 0;
        }
        &:hover::before {
          background-color: #0d63a5;
          width: 3rem;
        }
      }
    }
  }
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: 1s ease all;
  }
  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}
.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  nav {
    padding: 8px 0;
    branding {
      img {
        width: 40px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    }
  }
}
.Icono:hover {
  color: #ffffff;
}
.link:hover .icono {
  display: inline-block;
}
.icono {
  display: none;
  margin-left: -20px;
  transition: 1s ease-in-out 1s;
}
</style>
