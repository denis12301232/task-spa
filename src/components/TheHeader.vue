<template lang="pug">
v-app-bar
   v-app-bar-nav-icon(@click="emit('show')", class="menu")
      v-icon mdi-menu
   div(class="nav")
      v-btn(to="/", class="buttons")
         router-link(to="/", class="link") Create
      v-btn(to="/list")
         router-link(to="/list", class="link") List
   v-app-bar-title
   v-app-bar-nav-icon(@click="emit('theme')")
      v-icon mdi-brightness-6
</template>

<script setup lang="ts">
import { ref } from 'vue'


const emit = defineEmits(['show', 'theme']);

const isVisible = ref(true);
</script>
   
   
<style scoped lang="scss">
.router-link-active {
   color: teal !important;
}

.menu {
   display: none;
}

.buttons {
   margin-left: 10px;
}

@media (max-width:768px) {
   .menu {
      display: block;
   }

   .nav {
      display: none;
   }
}
</style>
   