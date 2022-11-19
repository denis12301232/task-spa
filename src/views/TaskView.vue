<template lang="pug">
div(class="message")
   v-alert(type="success", v-if="message") {{message}}
div(v-if="!task") 404
div(class="container" v-else)
   h1(class="title") {{task?.title}}
   v-form
      v-text-field(label="Tags")
         template(v-slot:prepend-inner)
            div(v-for="(tag , index) in task.tags" :key="index")
               v-chip(class="ma-2") {{tag}}
      v-textarea(counter="2048", tag="input", label="Description", :no-resize="true", v-model="task.description")
      v-text-field(type="date", label="Date", v-model="task.date")
      div(v-if="task.status !== 'completed'")
         v-btn(style="margin-right: 1rem;", @click="updateTask") Update
         v-btn(@click="completeTask") Complete task
</template>
   
<script setup lang="ts">
import { useStore } from '@/store/mainStore'
import type { Task, TaskStatus } from '@/types/interfaces'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore();
const route = useRoute();
const task = ref<Task>();
const message = ref('');

onMounted(() => {
   task.value = store.tasks.find(item => {
      return item.id === +route.params.id;
   });
});

function updateTask() {
   const updatedTask = {
      id: task.value!.id,
      description: task.value!.description,
      date: task.value!.date,
      status: ((new Date(task.value!.date) > new Date() && task.value?.status !== 'completed') ? 'active' : 'expired') as  TaskStatus,
   };
   const index = store.tasks.findIndex(item => item.id === task.value?.id);
   store.tasks[index] = { ...store.tasks[index], ...updatedTask };
   localStorage.setItem('tasks', JSON.stringify(store.tasks));
   setMessage('Updated');
}

function setMessage(msg: string) {
   message.value = msg;
   setTimeout(() => message.value = '', 3000);
}

function completeTask() {
   const index = store.tasks.findIndex(item => item.id === task.value?.id);
   store.tasks[index] = { ...store.tasks[index], status: 'completed' };
   localStorage.setItem('tasks', JSON.stringify(store.tasks));
   setMessage('Task was set as completed');
}
</script>
   
   
<style scoped lang="scss">
.container {
   margin: 0 auto;
   width: 50%;

   & .title {
      padding: 5px;
      text-align: center;
   }
}

.message {
   position: fixed;
   min-width: 250px;
   max-width: 300px;
   top: 70px;
   right: 10px;
   z-index: 9999;
}
</style>