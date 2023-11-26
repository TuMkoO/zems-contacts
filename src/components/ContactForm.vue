<template>
  <div>
    <div v-if="loader">
      <q-spinner-cube size="xl" color="primary" />
    </div>
    <div v-else>
      <h3 v-if="formType === 'add'">Новый контакт</h3>
      <h3 v-else>Контакт</h3>
      <form class="form" @submit.prevent="submit">
        <div class="form-row row">
          <div class="form-field__title">Имя</div>
          <div class="form-field__field">
            <q-input
              outlined
              v-model="name"
              placeholder="Например «Андрей»..."
              :error="!!nameError"
              :error-message="nameError"
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-field__title">Телефон</div>
          <div class="form-field__field">
            <q-input
              v-model="phone"
              label="Телефон"
              mask="+7 (###) ###-##-##"
              fill-mask
              :error="!!phoneError"
              :error-message="phoneError"
              outlined
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-field__title">Email</div>
          <div class="form-field__field">
            <q-input
              v-model.trim="email"
              outlined
              type="email"
              :error="!!eError"
              :error-message="eError"
              placeholder="Например «pochta@domain.ru»..."
            />
          </div>
        </div>
        <div class="form-row row">
          <div class="form-field__title">Категория</div>
          <div class="form-field__field">
            <q-select
              outlined
              v-model="category"
              :options="categoryOptions"
              option-value="value"
              option-label="label"
              :error="!!categoryError"
              :error-message="categoryError"
            />
          </div>
        </div>
        <div v-if="contact && formType === 'edit'" class="form-row row">
          <div class="form-field__title">Создан</div>
          <div class="form-field__field">{{ contact.created }}</div>
        </div>
        <div class="form-row row">
          <div class="form-field__field">
            <q-btn type="submit" color="red" icon="mail" label="Сохранить" />
            <q-btn
              v-if="contact && formType === 'edit'"
              @click="deleteContact"
              type="button"
              color="red"
              icon="mail"
              label="Удалить"
            />
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
  console.log("contact: ", props.contact);

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
    .min(3, "Имя не может быть короче 3 символов")
    .required("Пожалуйста, укажите имя")
);
const { value: phone, errorMessage: phoneError } = useField(
  "phone",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите телефон")
    .min(18, "Номер телефона не может быть меньше 11 цифр (с кодом)")
);
const { value: email, errorMessage: eError } = useField(
  "email",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите эл. почту")
    .email("Необходимо ввести корректный email")
);
const { value: category, errorMessage: categoryError } = useField(
  "category",
  yup.object().required("Пожалуйста, укажите категорию")
);

const submit = handleSubmit(async (values) => {
  console.log(values);

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
  loader.value = true;
  await contactsStore.deleteContact(props.contact.id);

  loader.value = false;

  router.push("/");
};
</script>
