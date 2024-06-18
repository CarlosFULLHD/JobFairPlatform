import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import Charlas from '@/services/Charlas'
import Calendario from '@/services/Calendario'
import Instituciones from './services/Instituciones';
export default new Vuex.Store({
  // STATE OBJECT THAT HOLDS INITIAL STATE WHEN OUR APPLICATIONS STARTS
  state: {

        // SESSION HANDLER
        cuentaId: null,
        cuentaU : '',
        passwordU: '',
        superU: false,
        emailU: '',
        loggedinFlag: false,

        navigation: null,
        calendarioEventsObject: [],
        charlasInscritasObj: {},
        charlasAdminObj: {},
        notificacionesList: {},
        // cuentaId:null,
        // cuentaU : '',
        // passwordU: '',
        // superU: false,
        // emailU: '',
        // loggedinFlag: false,

        // MESSAGES
        successAlert: false,
        successMessage: '',
        errorAlert: false,
        errorMessage:'',
        warningAlert: false,
        warningMessage: '',
        adviceAlert:false,
        adviceMessage: '',

  },
  // EVENTS OVER STATES 
  mutations: {
    setNotificacionesList(state, data) {
      state.notificacionesList = data
    },

    setNavigation(state, navigation ) {
      state.navigation  = navigation 
    },

    setCalendarioEventsObject(state, data){
      state.calendarioEventsObject = data
    },

    setCharlasInscritasObj (state, data){
     state.charlasInscritasObj = data
    },
    setCharlasAdminObj (state, data){
      state.charlasAdminObj = data
    },

    setloggedinFlag(state,nCu) {
      state.loggedinFlag = nCu
    },
    setcuentaId(state,nCu){
      state.cuentaId = nCu
    },
    setCuentaU(state,nCu){
      state.cuentaU = nCu
    },
    setPasswordU(state,nPwd){
      state.passwordU = nPwd
    },
    setSuperU(state,nSpu){
      state.superU = nSpu
    },
    setEmailU(state,nEmaU){
      state.emailU = nEmaU
    },

    setWarningAlert(state){
      state.warningAlert = !state.warningAlert
    },
    setWarningMessage(state,message){
      state.warningMessage = message
    },
    setSuccessAlert(state){
      state.successAlert = !state.successAlert
    },
    setSuccessMessage(state,message){
      state.successMessage = message
    },
    setErrorAlert(state){
      state.errorAlert = !state.errorAlert
    },
    setErrorMessage(state,message){
      state.errorMessage = message
    },
    setAdviceAlert(state){
      state.adviceAlert = !state.adviceAlert
    },
    setAdviceMessage(state,message){
      state.adviceMessage = message
    }
  },
  // FUNCTIONS THAT DISPATCH MUTATIONS
  actions: {
 
    warningAlertAsync(context, message){
      setTimeout(() => {
        context.commit('setWarningAlert')
      }, 3500);
      context.commit('setWarningMessage',message)
      context.commit('setWarningAlert')
    },

    errorAlertAsync(context,message){
      setTimeout(() => {
        context.commit('setErrorAlert')
      }, 3500);
      context.commit('setErrorMessage',message)
      context.commit('setErrorAlert')
    },

    adviceAlertAsync(context,message){
      setTimeout(() => {
        context.commit('setAdviceAlert')
      }, 3500)
      context.commit('setAdviceMessage',message)
      context.commit('setAdviceAlert')
      
    },

    successAlertAsync(context,message){
      setTimeout(() => {
        context.commit('setSuccessAlert')
      }, 3500);
      context.commit('setSuccessMessage',message)
      context.commit('setSuccessAlert')
    },

    async changeCalendarioEventsObject(context, data) {
      let xd = await Calendario.getAllCharlas()
      let snapshot = xd.data
      
      Object.keys(snapshot).forEach(async key => {
        let xd = await  Instituciones.getInstById(snapshot[key].instituciones_instituciones_id)
        data.push({
          id: snapshot[key].charlas_id,
          name: `${xd.data.nombre} - ${snapshot[key].nombrecharla}`,
          start: new Date(snapshot[key].fechaInicio),
          end: new Date(snapshot[key].fechaFina),
          details: snapshot[key].link,
          color: snapshot[key].Color,
          timed: true,
        }) 
      });
      
      context.commit('setCalendarioEventsObject',data)
    },

    async changeCharlasAdminObj(context,id){
      try {
        let xd = await Charlas.getCharlaAdmiByIdInstitucion(id)
        context.commit('setCharlasAdminObj',xd.data)
        
      } catch(error) {
        context.commit('setCharlasAdminObj',{})
      }
    },

    
    async changeCharlasInscritasObj(context, id){
      try {
        let xd = await Charlas.getCharlaByIdCuenta(id)
  
      context.commit('setCharlasInscritasObj',xd.data)
      } catch (error){
        context.commit('setCharlasInscritasObj',{})
      }
    },

    async changeNotificacionesList(context){
      try {
        let xd = await Charlas.getNotificacionesAdmi()
        console.log(xd.data)
        context.commit('setNotificacionesList', xd.data)
      } catch (error) {
        context.commit('setNotificacionesList',{})
      }
    },

    changeUserId(context,id){
      context.commit('setcuentaId',id)
    },

    changeloggedinFlag(context,id){
      context.commit('setloggedinFlag',id)
    },

    changeUserAccount(context, account){
      context.commit('setCuentaU',account)
    },
    changeUserEmail(context, email){
      context.commit('setEmailU', email)
    },
    changeSuperUser(context, flag){
      context.commit('setSuperU',flag)
    },
    changeUserPwd(context, pwd){
      context.commit('setPasswordU',pwd)
    }

  },
  getters: {
    // Define your getters to retrieve computed state values here
    getNotificacionesList: state => {
      return state.notificacionesList
    },
    
    getCalendarioEventsObject: state => {
      return state.calendarioEventsObject
    },

    getCharlasAdminObj: state => {
      return state.charlasAdminObj
    },
    getCharlasInscritasObj: state => {
      return state.charlasInscritasObj
    },
    getloggedinFlag: state => {
      return state.loggedinFlag
    },
    getCuentaId: state => {
      return state.cuentaId
    },
    getCuenta: state => {
      return state.cuentaU
    },
    getpasswordU: state => {
      return state.passwordU
    },
    getsuperU: state => {
      return state.superU
    },
    getEmailU: state => {
      return state.emailU
    },

    getAdviceAlert: state => {
      return state.adviceAlert;
    },
    getAdviceMessage: state => {
      return state.adviceMessage;
    },

    getSuccessAlert: state => {
      return state.successAlert;
    },
    getSuccessMessage: state => {
      return state.successMessage
    },

    getErrorAlert: state => {
      return state.errorAlert;
    },
    getErrorMessage: state => {
      return state.errorMessage
    },

    getWarningAlert: state => {
      return state.warningAlert;
    },
    getWarningMessage: state => {
      return state.warningMessage
    },
  },
});

//export default store;