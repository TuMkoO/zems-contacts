<template>
  <div v-if="message" class="notification">
    <q-banner class="notification-container">
      <template v-slot:avatar class="111">
        <div class="notification-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0039 1.99805C5.58563 1.99805 2.00391 5.57977 2.00391 9.99805C2.00391 14.4163 5.58563 17.998 10.0039 17.998C14.4222 17.998 18.0039 14.4163 18.0039 9.99805C18.0039 5.57977 14.4222 1.99805 10.0039 1.99805ZM0.00390625 9.99805C0.00390625 4.4752 4.48106 -0.00195312 10.0039 -0.00195312C15.5268 -0.00195312 20.0039 4.4752 20.0039 9.99805C20.0039 15.5209 15.5268 19.998 10.0039 19.998C4.48106 19.998 0.00390625 15.5209 0.00390625 9.99805ZM14.6683 6.75064C15.0811 7.11756 15.1182 7.74963 14.7513 8.16241L9.41798 14.1624C9.22822 14.3759 8.95621 14.498 8.67057 14.498C8.38494 14.498 8.11293 14.3759 7.92316 14.1624L5.2565 11.1624C4.88958 10.7496 4.92676 10.1176 5.33954 9.75064C5.75233 9.38372 6.3844 9.4209 6.75132 9.83368L8.67057 11.9928L13.2565 6.83368C13.6234 6.4209 14.2555 6.38372 14.6683 6.75064Z"
              fill="#6FCF97"
            />
          </svg>
        </div>
      </template>
      {{ message }}
    </q-banner>
  </div>
</template>
<script setup>
import { computed, onUnmounted } from "vue";
import { useContactsStore } from "../stores/contacts-store.js";

const contactsStore = useContactsStore();

const message = computed(() => contactsStore.message);

onUnmounted(() => {
  contactsStore.clearMessage();
});
</script>
