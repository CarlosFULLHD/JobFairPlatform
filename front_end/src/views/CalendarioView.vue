<template>
<div id="app">
  <v-app id="inspire">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <span v-if="userFlag">
            <v-btn color="#ffc506"
            rounded 
            style="font-weight: bold;
            font-size: 16px;" @click="dialog = true">
              Nuevo evento
            </v-btn>
            </span>
            <v-btn color="#ffc506"
            rounded 
            style="font-weight: bold;
            font-size: 16px;" @click="setToday">
              Hoy
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn
                color="#ffc506" 
                  rounded 
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 días</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>


        <!-- ADD EVENT DIALOG -->

        <v-dialog v-model="dialog" max-width="550">
        <v-card>
          <v-container>
            <h1 class="cool-title">Crearción de evento </h1>
            <v-form @submit.prevent="addEvent">
              
              <v-combobox 
                v-model="name"
                label="Institución"
                :items="nombreArray"
                :item-value="IdArray"
                variant="outlined"
              ></v-combobox>
              <v-text-field v-model="titleTalk" type="text" label="Título charla"></v-text-field>
              <v-text-field v-model="start" type="datetime-local" label="Fecha Inicio (Requerido)"></v-text-field>
              <v-text-field v-model="end" type="datetime-local" label="Fin (Requerido)"></v-text-field>
              <v-text-field v-model="cupo" type="number" label="Cupo máximo (Requerido)"></v-text-field>
              <v-text-field v-model="link" type="text" label="Link (Requerido)"></v-text-field>
              <v-text-field v-model="color" type="color" label="Color (click para abrir menú colores)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                Crear charla
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>


        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="eventsShowCalendar"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
              <span v-if="userFlag">
                <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </span>
                <!-- eslint-disable-next-line -->
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form v-if="currentlyEditing !== selectedEvent.id">
                  Link: <a v-bind:href=selectedEvent.details target="_blank">{{ selectedEvent.details }}</a>
                </form>
                <form v-else>
                  <textarea-autosize
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="add note">
                </textarea-autosize>
              </form>
            </v-card-text>

            <v-card-actions>
              <v-btn color="#ffc506" rounded @click="selectedOpen = false">
                Cancelar
              </v-btn>
              <!-- <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
               
              </v-btn>
              <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                Guardar
              </v-btn> -->
            </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</div>
</template>

<script>

import Calendario from '@/services/Calendario'
import Instituciones from '@/services/Instituciones'

import { db } from '@/main'
export default {
  data: () => ({
    comboboxArray: [],


    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      '4day': '4 días',
    },
    name: null,// BUSINESS NAME (COMBOBOX)
    details: null,
    titleTalk: null, // TALK TITLE
    start: null, // INITIAL DATE
    end: null,  // END DATE
    cupo: null, // MAX CAP
    link: null, // LINK OF THE TALK
    color: '#1976D2', // EVENTO COLOR
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,


    events: [], // ARRAY OF ALL THE TALKS
    
    
    
    
    dialog: false,
    dialogDate: false
  }),
  mounted () {
    this.$store.dispatch('changeCalendarioEventsObject',[])
    //this.getEvents()
  },
  created() {
    this.loadComboBox()
  },
  computed: {
    // CARGADO COMBOBOX NOMBRES E ID
    nombreArray(){
      return this.comboboxArray.map((item)=> item.nombre)
    },
    IdArray() {
      return this.comboboxArray.map((item) => item.instituciones_id);
    },
    eventsShowCalendar() {
      return this.$store.getters.getCalendarioEventsObject
    },
    
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
    userFlag(){
      return this.$store.getters.getsuperU
    },

  },
  methods: {
    // METHOD TO RETRIEVE EVENTS FROM DATA BASE

    async getEvents () {
      let xd = await Calendario.getAllCharlas()
      let snapshot = xd.data
      Object.keys(snapshot).forEach(async key => {
          let xd = await  Instituciones.getInstById(snapshot[key].instituciones_instituciones_id)
          this.events.push({
            id: snapshot[key].charlas_id,
            name: `${xd.data.nombre} - ${snapshot[key].nombrecharla}`,
            start: new Date(snapshot[key].fechaInicio),
            end: new Date(snapshot[key].fechaFina),
            details: snapshot[key].link,
            color: snapshot[key].Color,
            timed: true,
          }) 
          // this.events.push({
          //   id: snapshot[key].charlas_id,
          //   name: `${xd.data.nombre} - ${snapshot[key].nombrecharla}`,
          //   start: new Date(snapshot[key].fechaInicio),
          //   end: new Date(snapshot[key].fechaFina),
          //   details: snapshot[key].link,
          //   color: snapshot[key].Color,
          //   timed: true,
          // })

          //  let addData = snapshot
          //  addData.id = snapshot[key].charlas_id
          //  addData.color = snapshot[key].Color
          //  addData.name = snapshot[key].nombrecharla
          //  addData.details = "HOLA HOLA MARIO SISISISIS"
          //  addData.start = snapshot[key].fechaInicio
          //  addData.end = snapshot[key].fechaFina
          //  console.log(addData)
           
           //this.events.push(addData) 
          
      });



      //const events = []
      
      // let snapshot = await db.collection('calEvent').get()
      // const events = []
      // snapshot.forEach(doc => {
      //   let appData = doc.data()
      //   appData.id = doc.id
      //   events.push(appData)
      // })
      // this.events = events
    },




    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },

    // GUARDAR CHARLA
    async addEvent () {
     if (this.titleTalk && this.start && this.end && this.link && this.cupo ){
      let id = this.getKeyByValue(this.name)
      try {
        const dataUp = {
        nombrecharla: this.titleTalk,
        link: this.link,
        fechaInicio: this.start,
        fechaFina: this.end,
        Cupos_charla: this.cupo,
        Color: this.color,
        instituciones_instituciones_id: id
      }
      await Calendario.addCharla(dataUp)
      this.$store.dispatch('successAlertAsync',`El evento ${this.titleTalk} de la institución ${this.name} fue creado exitosamente`)
      
      this.$store.dispatch('changeCalendarioEventsObject',[])
      } catch(error) {
        this.$store.dispatch('errorAlertAsync',`Fallo de conexión con base de datos`)
      }
      }
      else {
        this.$store.dispatch('errorAlertAsync',`Llene todos los campos requeridos`)
      }
      
    },

    // EDITAR CHARLA
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },

    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    // BORRAR CHARLA
    async deleteEvent (ev) {
    
      await Calendario.deleteCharlaById(ev)
      this.$store.dispatch('successAlertAsync',`El evento fue eliminado exitosamente`)
      // await db.collection("calEvent").doc(ev).delete()
      // this.selectedOpen = false,
      // this.getEvents()
      this.selectedOpen = false
      this.$store.dispatch('changeCalendarioEventsObject',[])


    },
    // MOSTRAR EVENTO
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    // LOAD COMBOBOX FOR EXISTING BUSINESS
    async loadComboBox(){
      let xd = await Calendario.getInstituciones()
      this.comboboxArray = xd.data
    },

    getKeyByValue (value) {
      const item = this.comboboxArray.find(obj => obj.nombre === value);
      return item ? item.instituciones_id : null;
    }

    
   

  },


    
   





}
</script>


<style scoped>

.my-list .v-list-item {
  background-color: #ffc506;
}
</style>