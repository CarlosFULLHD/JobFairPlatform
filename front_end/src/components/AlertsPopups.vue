<template>

    <div>
    <v-alert type="success" v-if="successFlag"
    >
    {{ successMessage }} 
    </v-alert>

    <v-alert type="info" v-if="adviceFlag">
      {{ adviceMessage }}
    </v-alert>

    <v-alert type="warning" v-if="warningFlag">
      {{ warningMessage }}
    </v-alert>

    <v-alert type="error" v-if="errorFlag">
      {{ errorMessage }}
    </v-alert>
  </div>

</template>

  <script>

  
export default {
  name:"AlertsPopups",
  data: () => ({
 
      
  }),
   methods: {
      adviceAlert(e){
        this.$store.dispatch('adviceAlertAsync',e)
      }
   },
   computed: {
      adviceFlag() {
        return this.$store.getters.getAdviceAlert
      },
      adviceMessage(){
        return this.$store.getters.getAdviceMessage
      },
      successFlag() {
        return this.$store.getters.getSuccessAlert
      },
      successMessage(){
        return this.$store.getters.getSuccessMessage
      },
      warningFlag() {
        return this.$store.getters.getWarningAlert
      },
      warningMessage(){
        return this.$store.getters.getWarningMessage
      },
      errorFlag() {
        return this.$store.getters.getErrorAlert
      },
      errorMessage(){
        return this.$store.getters.getErrorMessage
      },
   }
  };
  </script>
  