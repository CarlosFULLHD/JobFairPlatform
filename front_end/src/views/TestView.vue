
<template>

   <div id="app">
    <h1>HOLA</h1>


    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          VIDEO PRUEBA
        </v-card-title>

        <v-card>
            <v-card-title>Añadir URL</v-card-title>
            <v-card-text>
            <v-text-field
                v-model="newString"
                label="Copiar URL"
                outlined
                dense
                @keydown.enter="addString"
            ></v-text-field>
            <v-btn @click="addString" color="primary">Añadir</v-btn>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="(video, index) in videosArray" :key="index">
                    <v-list-item-content>
                        <v-text-field
                        v-model="videosArray"
                        outlined
                        dense
                        :disabled=true
                    
                        >
                        </v-text-field>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="deleteString(index)">
                        <v-icon color="error">mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            </v-card-text>
        </v-card>


        
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>




  <v-btn
            color="primary"
            text
            @click="listVideos"
          >
            I accept
          </v-btn>
   </div> 
</template>


<script>

export default {
    data () {
      return {
        dialog: false,
        newString: '',
        videosArray: [],
        playerVars: {
            autoplay: 0
        }
      }
    },
    methods: {
        // LAZY VIDEO CONTROL
    handleClick(event, ref) {
      this.$refs[ref][event]();
    },
    handleSearch(e, platform) {
      if (platform === "youtube") this.youtubeLink = e.target.value;
      else this.vimeoLink = e.target.value;
    },



    // STRINGS CONTROL FOR VIDEO
    addString() {
      if (this.newString) {
        let videoID = this.extractVideoId(this.newString)
        //this.videosArray.push(this.newString);
        this.videosArray.push(videoID);
        this.newString = '';
      }
    },

    deleteString(index) {
      this.videosArray.splice(index, 1);
    },
    extractVideoId(url) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|youtu\.be\/|user\/.+\/u\/\d+\/|e\/|embed\/|v=))([a-zA-Z0-9_-]{11})/i;
    const match = url.match(regExp);

    if (match && match[1]) {
        return match[1];
    }
    // If no match is found, return null or handle the error case as needed
    return null;
    },

    listVideos(){
        console.log(this.videosArray)
    }

  }
  }


</script>
      
    
      