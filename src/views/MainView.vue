<template lang="pug">
div(class="container")
   h1(class="title") Create Task
   v-form(@submit.prevent="onSubmit", ref="form", v-model="isValid", onkeydown="return event.key != 'Enter'")
      v-text-field(label="Title", v-model="inputs.title" :rules="titleValidators")
      v-text-field(label="Tags", v-model="inputs.chip", @keydown.stop="addChips")
         template(v-slot:prepend-inner)
            div(v-for="(tag , index) in inputs.tags" :key="index")
               v-chip(class="ma-2", closable, @click:close="removeChip(index)") {{tag}}
      v-textarea(counter="2048", tag="input" :rules="descriptionValidators", label="Description", :no-resize="true", v-model="inputs.description")
      v-text-field(type="date", label="Date", v-model="inputs.date", :rules="dateValidators")
      v-btn(type="submit", :disabled="!isValid") Set             
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from '@/store/mainStore'
import { useRouter } from 'vue-router'
import Validate from '@/libs/Validate'
import type { Task } from '@/types/interfaces'

const store = useStore();
const router = useRouter();
const inputs = reactive({
   title: '',
   date: '',
   chip: '',
   tags: [] as string[],
   description: '',
});

const form = ref<HTMLFormElement>();
const titleValidators = [
   (v: string) => Validate.required(v) || 'Title is required',
];
const descriptionValidators = [
   (v: string) => Validate.required(v) || 'Description is required',
   (v: string) => Validate.maxLength(2048)(v) || 'To many symbols',
];
const dateValidators = [
   (v: string) => Validate.required(v) || 'Date is required',
];
const isValid = ref(false);

function addChips(event: KeyboardEvent) {
   if (event.key === 'Enter') {
      if (inputs.chip.length > 0) {
         inputs.tags.push(inputs.chip);
         inputs.chip = '';
      }
      event.preventDefault();
   } else if (event.key === 'Backspace' && inputs.tags.length) {
      inputs.tags.pop();
   }
}

function removeChip(index: number) {
   inputs.tags.splice(index, 1);
}

async function onSubmit() {
   const task: Task = {
      title: inputs.title,
      description: inputs.description,
      date: inputs.date,
      id: Date.now(),
      status: 'active',
      tags: inputs.tags
   };
   store.tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(store.tasks));
   form.value?.reset();
   form.value?.resetValidation();
   router.push('/list');
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
</style>