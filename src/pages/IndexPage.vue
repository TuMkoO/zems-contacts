<template>
  <div>
    <div>
      <Notification />
    </div>
    <div class="contacts">
      <div class="contacts__filter">
        <div class="container">
          <div class="row justify-between">
            <div style="width: 300px">
              <q-select
                class="full-width"
                outlined
                v-model="filter"
                option-value="value"
                option-label="label"
                :options="options"
              />
            </div>
            <div>
              <q-btn
                to="/add"
                outline
                rounded
                color="primary"
                label="Добавить контакт"
                icon="add"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="contacts__table">
        <div class="container">
          {{ contacts }}
          <table class="table">
            <thead>
              <tr>
                <th>Контакт</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Создан</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(contact, idx) of filteredContacts"
                :key="idx"
                @click="open(contact.id)"
              >
                <td>{{ contact.name }}</td>
                <td>{{ contact.phone }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.created }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useContactsStore } from "../stores/contacts-store.js";
import Notification from "../components/Notification.vue";

const router = useRouter();
const contactsStore = useContactsStore();

const options = [
  {
    label: "Все",
    value: "Все",
  },
  {
    label: "Родственники",
    value: "Родственник",
  },
  {
    label: "Коллеги",
    value: "Коллеги",
  },
];

const filter = ref(options[0]);

const contacts = ref(contactsStore.contacts);
const filteredContacts = computed(() =>
  contactsStore.contacts.filter((c) => {
    if (filter.value.value === options[0].value) {
      return true;
    }
    return c.category === filter.value.value;
  })
);

const open = (id) => {
  router.push(`/contact/${id}`);
};
</script>
