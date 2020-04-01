<template>
  <div >
    <div class="row">
      <h4>Create user</h4>
      <form
        action="#" 
        class="form col s12 form-user" 
        @submit.prevent="submitHandler"
      >
        <div class="row">
          <div class="input-field col s12">
            <input
              name="firstName"
              id="name"
              type="text"
              v-model.trim="user.name" 
              placeholder="Enter your name"
              required
              @blur="nameError(user.name)"
              :class="[isError.name ? 'invalid' : '', 'validate']" 
            >
            <label for="first_name" class="active">Name</label>
            <span class="helper-text" data-error="Fill in your name, please!"></span>
          </div>
          <div class="input-field col s12">
            <input
              v-model.trim="user.surname"
              name="surname"  
              id="last_name" 
              type="text"
              placeholder="Enter your surname"
              required
              @blur="surnameError(user.surname)"
              :class="[isError.surname ? 'invalid' : '', 'validate']"
            >
            <label for="last_name" class="active">Surname</label>
            <span class="helper-text" data-error="Fill in your surname, please!"></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model.trim="user.phone" 
              id="phone"
              name="phone" 
              type="tel"
              title="38(0XX)XXX-XX-XX"
              placeholder="Enter your phone" 
              required
              pattern="38[0-9]{3}[ -][0-9]{3}[ -][0-9]{2}[ -][0-9]{2}"
              @blur="phoneError(user.phone)"
              :class="[isError.phone ? 'invalid' : '', 'validate']"
            >
            <label for="phone" class="active">Phone</label>
            <span class="helper-text" data-error="Please, fill in this field with pattern 38XXX-XXX-XX-XX or 38XXX XXX XX XX"></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model.trim="user.email"
              name="email" 
              id="email" 
              type="email"
              placeholder="Enter your email" 
              @blur="emailError(user.email)"
              :class="[isError.email ? 'invalid' : '', 'validate']"
            >
            <label for="email" class="active">Email</label>
            <span class="helper-text" data-error="Fill in correct email, please"></span>
          </div>
        </div>
        <button 
          class="btn waves-effect btn-color waves-ligh" 
          type="submit" 
          name="action"
        >
          <i class="material-icons left">add_circle_outline</i>
          Add user
        </button>
      </form>

      <div class="row">
        <form class="form" @submit.prevent="submitJSON">
          <div class="row">
            <div class="input-field col s12">
              <textarea
                rows="10" 
                id="textarea1" 
                class="materialize-textarea"
                v-model.trim="jsonUser"
                placeholder='[{"name":"Your Name","surname":"Your Surname","phone":"Your phone","email":"Your@email.com"}]'
                @blur="$v.jsonUser.$touch()"
                :class="{'invalid': $v.jsonUser.$error}"
              ></textarea>
              <label for="textarea1" class="active">JSON-string</label>
              <span
                v-if="!$v.jsonUser.error" 
                class="helper-text" 
                data-error="Fill in correct JSON-string, please"
              ></span>
            </div>
          </div>
          <button 
            class="btn waves-effect btn-color waves-ligh" 
            type="submit" 
            name="action"
          >
            <i class="material-icons left">add_circle_outline</i>
            Add JSON user
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import uuidv4 from 'uuid/v4';
import { required } from 'vuelidate/lib/validators';

let Ajv = require('ajv');
let ajv = new Ajv();

const schema = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        },
      "name": {
        "type": "string",
        "pattern": "[а-яA-Яa-zA-Z]*",
        "minLength": 2,
      },
      "surname": {
        "type": "string",
        "minLength": 2,
      },
      "phone": {
        "type": "string",
        "pattern": "38[0-9]{3}[ -][0-9]{3}[ -][0-9]{2}[ -][0-9]{2}",
        "minLength": 7,
      },
      "email": {
        "type": "string",
        "format": "email",
      },
    },
    "required": ["name", "surname", "phone", "email"],
  },
};

const validateJSON = (value) => {
  let users = null;
  try {
    users = JSON.parse(value);
    const valid = ajv.validate(schema, users);
    if (!valid) {
      return false;
    }
  } catch (e) {
    return false;
  }
  
  return true;
};

export default {
  name: 'v-user-form',
  data() {
    return {
      user: {
        id: this.currentUser.id,
        name: this.currentUser.name,
        surname: this.currentUser.surname,
        phone: this.currentUser.phone,
        email: this.currentUser.email,
      },
      isError: {
        name: false,
        surname: false,
        phone: false,
        email: false,
        jsonUser: false,
      },
      jsonUser: '',
    }
  },
    validations: {
      jsonUser: {
        required,
        validateJSON,
      },
  },
  props: {
    currentUser: {
      type: Object,
      default: function () {
        return {
          user: {
            id: '',
            name: '',
            surname: '',
            email: '',
            phone: '',
          }
        }
      },
    }
  },
  computed: {
    ...mapState(['users']),
  },
  methods: {
    ...mapActions([
        'ADD_NEW_USER',
        'GET_USERS',
      ]),
    nameError(name){
      if (!name) {
        this.isError.name = true
      } else {
        this.isError.name = false;
      }
    },
    surnameError(surname) {
      if (!surname) {
        this.isError.surname = true
      } else {
        this.isError.surname = false;
      }
    },
    phoneError(phone) {
      const phonePattern = /38[0-9]{3}[ -][0-9]{3}[ -][0-9]{2}[ -][0-9]{2}/;
      if (!phone) {
        this.isError.phone = true;
      } else if (!phone.match(phonePattern)) {
        this.isError.phone = true;
      } else {
        this.isError.phone = false;
      }
    },
    emailError(phone) {
      if (!phone) {
        this.isError.email = true
      } else {
        this.isError.email = false;
      }
    },
    submitHandler() {
      if (!this.user.id) {
        this.user.id = uuidv4();
        this.UPDATE_USERS([
          ...this.users, {
            id: uuidv4(),
            name: this.user.name,
            surname: this.user.surname,
            phone: this.user.phone,
            email: this.user.email,
          }
        ]);
      } else {
        const updateUsers = this.users.map(user => {
          if (user.id === this.user.id) {
            return {
              ...user,
              id: this.user.id,
              name: this.user.name,
              surname: this.user.surname,
              phone: this.user.phone,
              email: this.user.email,
            }
          }
          return user;
        });
        this.UPDATE_USERS(updateUsers);
      }
      this.$router.push({ name: 'mainPage' })
    },
    submitJSON() {
      if (!this.$data.isError.jsonUser) {
        let users = JSON.parse(this.jsonUser);
        users = users.map((user) => ({
          ...user,
          id: uuidv4(),
        }));
        this.UPDATE_USERS([...this.users, ...users]);
        this.$router.push({ name: 'mainPage' })
      }
    },
    ...mapActions([
      'UPDATE_USERS',
    ]),
  },
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.btn-color {
  background-color: #64b5f6;

  &:hover {
    background-color: #2196f3;
  }

  &:active {
    background-color: #1976d2;
  }
}

.form-user {
  margin-bottom: 40px;
}

.form-input {
  margin-bottom: 20px;
}

</style>
