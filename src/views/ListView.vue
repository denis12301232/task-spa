<template lang="pug">
div(class="container")
   h1(class="title") LIST
   div
      v-autocomplete(label="Filter", :items="filterGroup", v-model="filter", clearable)
   v-table(v-if="filteredTasks.length")
      thead
         tr
            th №
            th Title
            th Date
            th Description
            th Status
            th Open
      tbody
         tr(v-for="(task, index) in filteredTasks", :key="task.id")
            td {{index + 1}}
            td(:style="{maxWidth: '100px'}")
               div(class="cut") {{task.title}}
            td {{task.date}}
            td(:style="{maxWidth: '350px'}")
               div(class="cut") {{task.description}}
            td {{task.status}}
            td
               v-btn
                  router-link(tag="button", class="link", :to="`/task/${task.id}`") Open
   p(v-else, style="text-align: center;") Нет задач
</template>
   
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store/mainStore';

const store = useStore();
const filter = ref('');
const filterGroup = ['active', 'expired', 'completed'];
const filteredTasks = computed(() => {
   if(!filter.value) return store.tasks;
   else return store.tasks.filter(item => item.status === filter.value);
});


</script>
   
   
<style scoped lang="scss">
.container {
   margin: 0 auto;
   width: 70%;

   & .title {
      padding: 5px;
      text-align: center;
   }

   & .cut {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
   }
}
</style>