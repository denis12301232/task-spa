<template lang="pug">
v-app(:theme="theme")
  the-header(@show="setVisible", @theme="setTheme")
  v-navigation-drawer(clipped floating temporary app v-model="isVisible")
    v-list
      v-list-item
        v-btn(to="/", width="100%")
         router-link(to="/", class="link") Create
      v-list-item
        v-btn(to="/list", width="100%")
          router-link(to="/list", class="link") List
  v-main
    router-view
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'

const isVisible = ref(true);
const theme = ref('light');

function setVisible() {
  isVisible.value = !isVisible.value;
}

function setTheme() {
  switch (theme.value) {
    case 'light':
      theme.value = 'dark';
      localStorage.setItem('theme', 'dark');
      break;
    case 'dark':
      theme.value = 'light';
      localStorage.setItem('theme', 'light');
      break;
  }
}

onMounted(() => {
  if (localStorage.getItem('theme')) {
    switch (localStorage.getItem('theme')) {
      case 'dark':
      case 'light':
        theme.value = localStorage.getItem('theme')!;
        break;
    }
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return theme.value = 'dark';
  } else {
    return theme.value = 'light';
  }
});
</script>


<style lang="scss">
.link {
   text-decoration: none;
   color: inherit;

   &:visited {
      color: inherit;
   }
}
</style>
