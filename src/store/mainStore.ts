import { defineStore } from 'pinia'
import type { Task } from '@/types/interfaces';

export const useStore = defineStore('counter', {
   state: () => ({
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[],
   }),

});