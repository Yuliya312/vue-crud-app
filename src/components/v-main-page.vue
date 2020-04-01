<template>
  <div class="hello">
    <p>Home page</p>
    <table class="responsive-table">
      <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Add</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in USERS" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{user.name}}</td>
          <td>{{user.surname}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.email}}</td>
          <td>
            <router-link 
              class="btn-small waves-effect waves-light"
              :to="{name: 'vUserForm', params: {currentUser: user}}" 
            >
              <i class="material-icons">add_circle_outline</i>
            </router-link>
          </td>
          <td>
            <button 
              class="btn-small waves-effect waves-ligh"
              @click="deleteUser(user.id)"
            >
              <i class="material-icons">remove_circle_outline</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'v-main-page',
   computed: {
    ...mapGetters([
      'USERS',
    ]),
  },
  methods: {
    ...mapActions([
      'UPDATE_USERS'
    ]),
    deleteUser(id) {
      this.UPDATE_USERS(this.USERS.filter(user => id !== user.id));
    },
  },
}
</script>


<style lang="scss" scoped>
  .btn-small {
    background-color: #64b5f6;

    &:hover {
      background-color: #2196f3;
    }

    &:active {
      background-color: #1976d2;
    }
  }
</style>