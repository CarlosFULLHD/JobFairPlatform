<template>
  <v-app id="inspire">
    <div class="wrapper">
      <nav class="navChat">
        <h2>Lista ChatBots</h2>
        <br>
        <ul>
          <li v-for="empresa in empresas" :key="empresa.instituciones_id" >
            <div class="navChat-item">
              <a @click="selectEmpresa(empresa.instituciones_id)" style="color: white;">{{ empresa.nombre }}</a>
            </div>
          </li>
        </ul>
      </nav>
    <div v-if="selectedEmpresa">
      <div class="main">
        <div class="chat-container">
          <div class="head">
            <h2>Nombre de la empresa: {{ selectedEmpresa.nombre }}</h2>
          </div>
          <div class="chat-area">
            <div v-for="message in messages" :key="message.id" :class="{ 'bot-message': message.isBot, 'user-message': !message.isBot }">
              {{ message.content }}
            </div>
          </div>
          <div class="input">
            <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe tu mensaje...">
            <button @click="sendMessage" class="send-button">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="justify-content: center; align-items: center;">
        <p class="welcome-text">Prueba nuestro chatbot!</p>
        <img src="../assets/chat2.png" class="chat-image">
        <p class="select-text">Seleccione una empresa</p>
      </div>
    </div>
    </div>
  </v-app>
</template>

<script>
import Chat from '@/services/Chat';

export default {
data() {
  return {
    empresas: [],
    selectedEmpresaId: null,
    selectedEmpresa: null,
    messages: [],
    newMessage: ''
  };
},
mounted() {
  this.loadEmpresas();
},
methods: {
  async loadEmpresas() {
    try {
      const response = await Chat.listarIns();
      this.empresas = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  selectEmpresa(empresaId) {
    this.selectedEmpresaId = empresaId;
    this.selectedEmpresa = null;
    this.messages = [];
    this.loadEmpresaData();
  },
  async loadEmpresaData() {
    try {
      const [nombreEmpresa] = await Promise.all([
        Chat.chatIns(this.selectedEmpresaId),
        Chat.chatDatos(this.selectedEmpresaId)
      ]);

      this.selectedEmpresa = nombreEmpresa.data;
      this.messages = [
        {
          id: 'nombre',
          content: `${nombreEmpresa.data.nombre}, le da la bienvenida!`,
          isBot: true
        },
        {
          id: 'sig-ms',
          content: `Porfavor presione 1 para saber la cantidad de cupos disponibles en la sala, presione 2 para ver el link de la reunion`,
          isBot: true
        },
        // Agrega los mensajes adicionales que necesites mostrar
      ];
    } catch (error) {
      console.error(error);
    }
  },
  async sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        id: 'user-message-' + Date.now(),
        content: this.newMessage.trim(),
        isBot: false
      });

      if (this.newMessage.trim() === '1') {
        try {
        const response = await Chat.chatCupos(this.selectedEmpresaId);
        const cuposDisponibles = response.data.Cupos_charla;
        const response2 = await Chat.chatCupos(this.selectedEmpresaId);
        const fechaIn = response2.data.fechaInicio;
        const response3 = await Chat.chatCupos(this.selectedEmpresaId);
        const fechaFin = response3.data.fechaFina;

        this.messages.push({
          id: 'cupos-disponibles',
          content: `Cupos disponibles: ${cuposDisponibles}`,
          isBot: true
        });
        this.messages.push({
          id: 'fecha-inicio',
          content: `Fecha de la reunión: ${fechaIn}`,
          isBot: true
        });
        this.messages.push({
          id: 'fehca-fin',
          content: `Fecha fin de la reunión: ${fechaFin}`,
          isBot: true
        });
      } catch (error) {
        console.error(error);
      }
      } else if (this.newMessage.trim() === '2') {
        try {
        const response = await Chat.chatDatos(this.selectedEmpresaId);
        const url = response.data.url;

        this.messages.push({
          id: 'url-institucion',
          content: `URL: ${url}`,
          isBot: true
        });
      } catch (error) {
        console.error(error);
      }
      } else {
        this.messages.push({
        id: 'user-message-' + Date.now(),
        content: 'Porfavor escriba solo 1 o 2',
        isBot: true
      });
      }

      this.newMessage = '';
    }
  }
}
};
</script>

<style scoped>
.wrapper {
display: flex;
height: 100vh;
height: 100%;
  width: 100%;
}

.navChat {
background-color: #71a1f4;
opacity: 0.9;
color: black;
padding: 20px;
width: 200px;
}

.navChat ul {
list-style: none;
padding: 0;
}

.navChat li {
margin-bottom: 10px;
padding: 5px 10px; /* Ajustar el relleno */
}

.navChat-item {
background-color: #001f3f;
border-radius: 5px;
padding: 10px;
}

.navChat a {
color: black;
text-decoration: none;
}

.main {height: 100%;
  width: 100%;
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

.chat-container {
height: 100%;
width: 100vh;
border: 1px solid #ccc;
border-radius: 5px;
padding: 5px;
overflow-y: auto;
}

.head {
background-color: #2e3748;
opacity: 0.9;
width: 100%;
height: fit-content;
border-radius: 5px; /* Bordes redondeados */
padding: 5px 10px; /* Ajustar el relleno */
}

.head h2 {
color: white;
}

.chat-area {
padding: 20px;
overflow-y: auto;
flex: 1;
display: flex;
flex-direction: column;
}

.message {
margin-bottom: 10px;
padding: 10px;
border-radius: 5px;
word-break: break-word;
display: block;
}

.bot-message {
background-color: #3399ff;
color: #ffffff;
align-self: flex-start;
display: inline-flex;
border-radius: 10px; /* Bordes redondeados */
padding: 5px 10px; /* Ajustar el relleno */
max-width: 250px;
}

.user-message {
max-width: 250px;
background-color: rgba(255, 255, 0, 0.9);
color: #000000;
align-self: flex-end;
display: inline-flex;
border-radius: 10px; /* Bordes redondeados */
padding: 5px 10px; /* Ajustar el relleno */
}

.bot-message,
.user-message {
margin-bottom: 10px;
}

.input {
  display: flex;
  opacity: 0.9;
  position: sticky;
  bottom: 0;
}
.input input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #ffd717;
}
.send-button {
  background-color: #71a1f4;
  color: black;
  border-radius: 50%;
  padding: 10px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
}
.send-button i {
  margin-right: 5px;
}

.center-text {
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
}

.welcome-text {
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
}

.chat-image {
width: 500px;
align-items: center;
}

.select-text {
font-size: 18px;
margin-top: 20px;
}

</style>