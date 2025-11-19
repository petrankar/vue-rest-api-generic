<script setup lang="ts">
import { useAsyncRequest } from '../composables/useRestApi.ts'
import { useUsersStore, type User } from '../stores/users';

defineProps<{ msg: string }>()

const usersStore = useUsersStore();

const { loading, error, run: fetchUsers } = useAsyncRequest<User[]>({
  method: 'GET',
  path: '/users/',
  autoRun: false, 
  storeSetter: usersStore.setUsers
})

const { loading: postLoading, error: postError, run: createPost } = useAsyncRequest<{ id: number; title: string; body: string; userId: number }>({
  method: 'POST',
  path: '/posts',
  autoRun: false
})

const handleCreatePost = () => {
  createPost({
    title: 'foo',
    body: 'bar',
    userId: 1,
  })
}


</script>

<template>
  <h1>{{ msg }}</h1>
  
  <button @click="fetchUsers">Fetch Users</button>
  <button @click="handleCreatePost">Create Post</button>

  <div v-if="loading">Loading users...</div>
  <div v-if="error">Error: {{ error }}</div>

  <div v-if="postLoading">Creating post...</div>
  <div v-if="postError">Post Error: {{ postError }}</div>
  
  <ul v-if="usersStore.users.length > 0">
    <li v-for="user in usersStore.users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>

</template>


