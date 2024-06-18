<template>
  <v-footer color="#ffc506">
    <div class="footer-text">
      <div class="footer-date" style="font-size:20px;">© {{ new Date().getFullYear() }}</div>
      <div class="footer-description">Unidad de Servicios Estudiantiles (USEI)</div>
      <div class="footer-social">
        <a href="https://www.facebook.com/UCB.BOLIVIA/" target="_blank">
          <v-icon size="50" class="mr-10">mdi-facebook</v-icon>
        </a>
        <a href="https://twitter.com/UCBLaPaz" target="_blank">
          <v-icon size="50" class="mr-10">mdi-twitter</v-icon>
        </a>
        <a href="https://www.instagram.com/ucb.lapaz/" target="_blank">
          <v-icon size="50" class="mr-10">mdi-instagram</v-icon>
        </a>
        <a href="https://api.whatsapp.com/send/?phone=59177767647" target="_blank">
          <v-icon size="50" class="mr-10">mdi-whatsapp</v-icon>
        </a>
      </div>
    </div>
    
  </v-footer>
</template>

<style>
*{
  font-family: Helvetica;
}
.footer-text {
  display: flex;
  font-size: 16px;
  font-family: Helvetica;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}
.footer-description {
  font-size: 18px;
  margin-bottom: 16px;
}
.footer-social {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
}
.footer-date {
  font-size: 14px;
}
</style>