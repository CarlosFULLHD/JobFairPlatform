import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CuentaCrearView from '@/views/CrearCuentaView.vue'
import CalendarioView from "../views/CalendarioView.vue";
import EmpresasView from "../views/EmpresasView.vue";
import ChatsView from "../views/ChatsView.vue";
import CrudView from "../views/CrudView.vue";
import ContactoView from "../views/ContactoView.vue";
import EmpresasInfoView from "@/views/EmpresasInfoView.vue"
//import CharlasPorEmpresaView from "@/views/CharlasPorEmpresaView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Inicio' }
  },
  {
    path: "/cuenta/login",
    name: "Login",
    component: LoginView,
    meta: { title: 'Iniciar Sesion' }
  },
  {
    path: "/cuenta/crear",
    name: "CuentaCrear",
    component: CuentaCrearView,
    meta: { title: 'Crear Cuenta' }
  },
  {
    path: "/calendario",
    name: "Calendario",
    component: CalendarioView,
    meta: { title: 'Calendario' }
  },
  {
    path: "/empresas",
    name: "Empresas",
    component: EmpresasView,
    meta: { title: 'Empresas' }
  },
  {
    path: "/chats",
    name: "Chat",
    component: ChatsView,
    meta: { title: 'Chat' }
  },
  {
    path: "/crud",
    name: "Crud",
    component: CrudView,
    meta: { title: 'Admin' }
  },
  {
    path: "/contacto",
    name: "Contacto",
    component: ContactoView,
    meta: { title: 'Contacto' }
  },
  {
    path:"/empresas/:parameter",
    name: 'EmpresasInfo',
    component:EmpresasInfoView,
    meta: { title: 'Info' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router