<template>
  <span class="contact-icon text-uppercase fw-700">{{ contactCymbol }}</span>
</template>
<script setup>
defineProps({
  contactCymbol: {
    type: String,
    required: true,
  },
});
</script>
