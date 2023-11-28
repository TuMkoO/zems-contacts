<template>
  <div>
    <div class="card-wrapper">
      <q-card class="card">
        <q-card-section class="card__section">
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
