<template>
  <div class="contact">
    <div>
      <h1 v-if="formType === 'add'" class="title fw-700">Новый контакт</h1>
      <h1 v-else class="title fw-700">Контакт</h1>
      <form class="form" @submit.prevent="submit">
        <div class="form-row row">
          <div class="form-row__title fw-700 flex items-center">Имя</div>
          <div class="form-row__field">
            <q-input
              outlined
              dense
              class="input"
              v-model="name"
              placeholder="Например «Андрей»..."
              :error="!!nameError"
              :error-message="nameError"
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-row__title fw-700 flex items-center">Телефон</div>
          <div class="form-row__field">
            <q-input
              v-model="phone"
              mask="+7(###)###-##-##"
              class="input"
              :error="!!phoneError"
              :error-message="phoneError"
              outlined
              dense
              placeholder="+7(___)___-__-__"
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-row__title fw-700 flex items-center">Email</div>
          <div class="form-row__field">
            <q-input
              v-model.trim="email"
              outlined
              dense
              class="input"
              type="email"
              :error="!!eError"
              :error-message="eError"
              placeholder="Например «pochta@domain.ru»..."
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-row__title fw-700 flex items-center">Категория</div>
          <div class="form-row__field">
            <q-select
              outlined
              dense
              label="Не выбрано"
              v-model="category"
              class="select select-long"
              popup-content-class="select-long-popup"
              :options="categoryOptions"
              option-value="value"
              option-label="label"
              :error="!!categoryError"
              :error-message="categoryError"
              ><template
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
        </div>
        <div v-if="contact && formType === 'edit'" class="form-row row">
          <div class="form-row__title fw-700 flex items-center">Создан</div>
          <div class="form-row__field">
            <div class="flex items-center field-text full-height">
              {{ useFormatDate(contact.created) }}
            </div>
          </div>
        </div>
        <div class="form-row row">
          <div
            class="form-row__title fw-700 flex items-center"
            :class="{ 'd-mobile-none': props.formType == 'edit' }"
          ></div>
          <div class="form-row__field">
            <div
              class="form-controls flex"
              :class="{ 'items-mobile-center': props.formType == 'edit' }"
            >
              <button class="btn-submit" type="submit">
                <span v-if="loader" class="btn-submit-icon">
                  <svg
                    class="loader"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.89812 1.58881C7.6139 1.46655 7.4095 1.19824 7.4095 0.888836C7.4095 0.434864 7.83479 0.0986654 8.25718 0.265014C9.8473 0.891235 11.1093 2.15373 11.7353 3.74613C11.9015 4.16889 11.565 4.59435 11.1107 4.59435C10.8015 4.59435 10.5332 4.39035 10.411 4.10626C9.92472 2.97581 9.02539 2.07372 7.89812 1.58881ZM1.58881 4.1056C1.46657 4.38991 1.19819 4.59435 0.888709 4.59435C0.434735 4.59435 0.0984557 4.16916 0.264514 3.74664C0.890563 2.15375 2.1533 0.890901 3.74613 0.264715C4.16889 0.0985167 4.59435 0.435004 4.59435 0.889259C4.59435 1.19851 4.39034 1.46684 4.1063 1.58915C2.97583 2.07597 2.07373 2.97772 1.58881 4.1056ZM4.10761 10.4153C4.3909 10.5372 4.59435 10.8048 4.59435 11.1132C4.59435 11.5662 4.17007 11.9017 3.74839 11.7362C2.15492 11.1105 0.891532 9.84805 0.265014 8.25718C0.0986654 7.83479 0.434864 7.4095 0.888836 7.4095C1.19824 7.4095 1.46656 7.61389 1.58876 7.89813C2.07385 9.0265 2.97649 9.92856 4.10761 10.4153ZM10.4112 7.89814C10.5334 7.61389 10.8018 7.4095 11.1112 7.4095C11.5651 7.4095 11.9013 7.83478 11.735 8.25718C11.1089 9.84705 9.84705 11.1089 8.25718 11.735C7.83478 11.9013 7.4095 11.5651 7.4095 11.1112C7.4095 10.8018 7.61389 10.5334 7.89814 10.4112C9.02546 9.92662 9.92662 9.02546 10.4112 7.89814Z"
                      fill="#545454"
                    />
                  </svg>
                </span>
                <span v-else class="btn-submit-icon">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1.33333C0 0.596954 0.596954 0 1.33333 0H9.05719C9.41081 0 9.74995 0.140476 10 0.390524L11.8047 2.19526C11.9298 2.32029 12 2.48986 12 2.66667V10.6667C12 11.403 11.403 12 10.6667 12H1.33333C0.596954 12 0 11.403 0 10.6667V1.33333ZM4 10.6667H8V6.66667H4V10.6667ZM9.33333 10.6667H10.6667V2.94281L9.33333 1.60948V2.66667C9.33333 3.40305 8.73638 4 8 4H4C3.26362 4 2.66667 3.40305 2.66667 2.66667V1.33333H1.33333V10.6667H2.66667V6.66667C2.66667 5.93029 3.26362 5.33333 4 5.33333H8C8.73638 5.33333 9.33333 5.93029 9.33333 6.66667V10.6667ZM4 1.33333V2.66667H8V1.33333H4Z"
                      fill="#545454"
                    />
                  </svg>
                </span>
                <span class="btn-submit-text">Сохранить</span>
              </button>

              <button
                v-if="contact && formType === 'edit'"
                @click="deleteContact"
                type="button"
                class="btn-delete"
              >
                <span class="btn-delete-icon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 1C2.5 0.447715 2.94772 0 3.5 0H6.5C7.05228 0 7.5 0.447715 7.5 1V2H8.49484C8.49793 1.99997 8.50103 1.99997 8.50413 2H9.5C9.77614 2 10 2.22386 10 2.5C10 2.77614 9.77614 3 9.5 3H8.96556L8.5319 9.07125C8.49452 9.59455 8.05908 10 7.53444 10H2.46556C1.94092 10 1.50548 9.59455 1.4681 9.07125L1.03444 3H0.5C0.223858 3 0 2.77614 0 2.5C0 2.22386 0.223858 2 0.5 2H1.49587C1.49897 1.99997 1.50207 1.99997 1.50516 2H2.5V1ZM3.5 2H6.5V1H3.5V2ZM2.03699 3L2.46556 9H7.53444L7.96301 3H2.03699Z"
                      fill="#2F80ED"
                    />
                  </svg>
                </span>
                <span class="btn-delete-text">Удалить</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useContactsStore } from "../stores/contacts-store.js";
import { useFormatDate } from "../composables/useFormatDate.js";

const contactsStore = useContactsStore();
const router = useRouter();

const loader = ref(false);

const props = defineProps({
  formType: {
    type: String,
    required: true,
  },
  contact: {
    type: Object,
    required: false,
  },
});

onMounted(() => {
  if (props.contact && props.formType == "edit") {
    loader.value = true;

    const catVal = categoryOptions.find(
      (c) => c.value === props.contact.category
    );

    name.value = props.contact.name;
    phone.value = props.contact.phone;
    email.value = props.contact.email;
    category.value = catVal;

    loader.value = false;
  }
});

const categoryOptions = [
  {
    label: "Родственники",
    value: "Родственник",
  },
  {
    label: "Коллеги",
    value: "Коллеги",
  },
];

const { handleSubmit } = useForm();

const { value: name, errorMessage: nameError } = useField(
  "name",
  yup
    .string()
    .trim()
    .min(3, "Слишком короткое имя")
    .required("Поле не может быть пустым")
);
const { value: phone, errorMessage: phoneError } = useField(
  "phone",
  yup
    .string()
    .trim()
    .required("Поле не может быть пустым")
    .min(16, "Некорректный номер")
);
const { value: email, errorMessage: eError } = useField(
  "email",
  yup
    .string()
    .trim()
    .required("Поле не может быть пустым")
    .email("Некорректный e-mail")
);
const { value: category, errorMessage: categoryError } = useField(
  "category",
  yup.object().required("Поле не может быть пустым")
);

const submit = handleSubmit(async (values) => {
  if (props.formType === "add") {
    loader.value = true;

    await contactsStore.addContact({
      id: values.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      category: values.category.value,
    });

    loader.value = false;

    router.push("/");
  } else if (props.contact && props.formType === "edit") {
    loader.value = true;

    await contactsStore.updateContact(
      {
        id: props.contact.id,
        name: values.name,
        phone: values.phone,
        email: values.email,
        category: values.category.value,
        created: props.contact.created,
      },
      props.contact.id
    );

    loader.value = false;

    router.push("/");
  }
});

const deleteContact = async () => {
  await contactsStore.deleteContact(props.contact.id);

  router.push("/");
};
</script>
