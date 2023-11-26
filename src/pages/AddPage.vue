<template>
  <div>
    <div class="container">
      <q-card class="my-card">
        <q-card-section>
          <div>
            <ContactForm form-type="add" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import ContactForm from "../components/ContactForm.vue";
</script>
