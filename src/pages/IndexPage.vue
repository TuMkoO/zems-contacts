<template>
  <div>
    <div>
      <Notification />
    </div>
    <div class="contacts">
      <div class="contacts__filter">
        <div class="container full-height">
          <div class="row justify-between items-center full-height">
            <div class="filter-container">
              <q-select
                class="select select-short full-width"
                outlined
                dense
                v-model="filter"
                option-value="value"
                option-label="label"
                :options="options"
              >
                <template
                  v-slot:option="{ itemProps, opt, selected, toggleOption }"
                >
                  <q-item v-bind="itemProps">
                    <q-item-section>
                      <q-item-label v-html="opt.label" />
                    </q-item-section>
                    <q-item-section side>
                      <span v-if="selected" class="relative-position">
                        <svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7763 0.500432C12.0514 0.745044 12.0762 1.16643 11.8316 1.44161L4.7205 9.44161C4.59399 9.58394 4.41265 9.66537 4.22223 9.66537C4.0318 9.66537 3.85047 9.58394 3.72396 9.44161L0.168401 5.44161C-0.0762111 5.16643 -0.051424 4.74504 0.223765 4.50043C0.498953 4.25582 0.920335 4.28061 1.16495 4.5558L4.22223 7.99524L10.8351 0.555796C11.0797 0.280607 11.5011 0.25582 11.7763 0.500432Z"
                            fill="#545454"
                          />
                        </svg>
                      </span>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div>
              <q-btn
                to="/add"
                outline
                rounded
                :label="addBtnLabel"
                icon="add"
                class="add-btn fw-700"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="contacts__table">
        <div class="container">
          <table v-if="filteredContacts.length" class="table">
            <thead>
              <tr>
                <th class="text-left">Контакт</th>
                <th v-if="windowSize === 'desktop'" class="text-left">
                  Телефон
                </th>
                <th v-if="windowSize === 'desktop'" class="text-left">Email</th>
                <th
                  v-if="windowSize === 'mobile'"
                  class="text-left td-contacts"
                >
                  Телефон / Email
                </th>
                <th class="text-right td-created">Создан</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(contact, idx) of filteredContacts"
                :key="idx"
                @click="open(contact.id)"
              >
                <td class="flex items-center no-wrap td-name full-height">
                  <ContactIcon :contact-cymbol="contact.name[0]" />
                  <span>{{ contact.name }}</span>
                </td>
                <td v-if="windowSize === 'desktop'" class="text-small">
                  {{ contact.phone }}
                </td>
                <td v-if="windowSize === 'desktop'" class="text-small">
                  {{ contact.email }}
                </td>
                <td v-if="windowSize === 'mobile'" class="td-contacts">
                  <span class="block">{{ contact.phone }}</span>
                  <span class="block">{{ contact.email }}</span>
                </td>
                <td class="text-right td-created">
                  {{ useFormatDate(contact.created) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-center q-pt-xl fw-700">Контактов нет</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useContactsStore } from "../stores/contacts-store.js";
import { useFormatDate } from "../composables/useFormatDate.js";
import Notification from "../components/Notification.vue";
import ContactIcon from "../components/ContactIcon.vue";

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
const addBtnLabel = ref("Добавить контакт");
const windowSize = ref("desktop");

const filter = ref(options[0]);

const filteredContacts = computed(() =>
  contactsStore.contacts
    .sort((a, b) => (new Date(a.created) > new Date(b.created) ? 1 : -1))
    .filter((c) => {
      if (filter.value.value === options[0].value) {
        return true;
      }
      return c.category === filter.value.value;
    })
);

onMounted(() => {
  window.addEventListener("resize", onResize);
  onResize();
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

const onResize = () => {
  if (window.innerWidth < 575 && window.innerWidth > 375) {
    addBtnLabel.value = "Добавить";
  } else if (window.innerWidth <= 375) {
    addBtnLabel.value = "";
  } else {
    addBtnLabel.value = "Добавить контакт";
  }

  if (window.innerWidth < 768) {
    windowSize.value = "mobile";
  } else {
    windowSize.value = "desktop";
  }
};

const open = (id) => {
  router.push(`/contact/${id}`);
};
</script>
