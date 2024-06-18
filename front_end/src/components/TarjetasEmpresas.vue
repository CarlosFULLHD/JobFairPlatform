<template>
    <div>
      <v-btn prepend-icon="mdi-vuetify" append-icon="mdi-vuetify" @click="test">Login</v-btn>
    </div>

</template>

<script>

import Instituciones from '@/services/Instituciones'

export default ({

    name:"TarjetasEmpresas",
    
  data () {
    return {
        mensaje:''
    }
  },

  methods: {
    async test(){
        try{
            const response = await Instituciones.listarIns({})
            console.log(response.data);
        }   catch(error){
            this.error = error.response.data.error
        }

    }
  }

})
</script>
