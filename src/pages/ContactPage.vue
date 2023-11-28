<template>
  <div>
    <div class="card-wrapper">
      <q-card class="card">
        <q-card-section class="card__section">
          <div v-if="contact">
            <ContactForm :contact="contact" form-type="edit" />
          </div>
          <div v-else class="text-center">Контакт не найден</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useContactsStore } from "../stores/contacts-store.js";
import { useRoute } from "vue-router";
import ContactForm from "../components/ContactForm.vue";

const contactsStore = useContactsStore();

const route = useRoute();

const contact = computed(() =>
  contactsStore.contacts.find((c) => c.id === route.params.id)
);

onMounted(() => {
  if (contact.value) {
    contactsStore.setContact(contact.value.name);
  } else {
    contactsStore.setContact("Не найден");
  }
});

onUnmounted(() => {
  contactsStore.clearContact();
});
</script>
