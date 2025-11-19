import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  
  const setUsers = (data: User[]) => {
    users.value = data;
  };
  
  const clearUsers = () => {
    users.value = [];
  };
  
  return {
    users,
    setUsers,
    clearUsers,
  };
});
