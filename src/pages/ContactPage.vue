<template>
  <div>
    <div class="container">
      <q-card class="my-card">
        <q-card-section>
          <div>
            <ContactForm :contact="contact" form-type="edit" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useContactsStore } from "../stores/contacts-store.js";
import { useRoute, useRouter } from "vue-router";
import ContactForm from "../components/ContactForm.vue";

const contactsStore = useContactsStore();

const route = useRoute();

const contact = computed(() =>
  contactsStore.contacts.find((c) => c.id === route.params.id)
);
</script>
