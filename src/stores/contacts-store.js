import { defineStore } from "pinia";

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [
      {
        id: "2zqqph86iou",
        name: "Двери Вадим",
        phone: "+7(987)655-11-44",
        email: "swedgtuy@mail.ru",
        category: "Родственник",
        created: Date.now(),
      },
      {
        id: "2zqqph11iou",
        name: "Двери Вадим 2",
        phone: "+7(987)655-11-44",
        email: "swedgtuy@mail.ru",
        category: "Родственник",
        created: "2017-01-26",
      },
      {
        id: "2z00ph11iou",
        name: "Доставка Андрей Стоянов",
        phone: "+7(987)655-11-44",
        email: "swe56465767fvghdgtuy@mail.ru",
        category: "Коллеги",
        created: "2021-07-26",
      },
    ],
    currentContact: null,
    message: null,
    messageTimeout: null,
  }),
  actions: {
    async addContact(contact) {
      try {
        const randomId = (length = 12) => {
          return Math.random()
            .toString(36)
            .substring(2, length + 2);
        };

        //Имитация отправки запроса к API
        await new Promise((resolve) => {
          setTimeout(() => resolve(console.log("load complete...")), 1000);
        });

        this.contacts.push({
          id: randomId(),
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          category: contact.category,
          created: Date.now(),
        });

        this.setMessage("Контакт успешно создан");
      } catch (e) {
        console.log(e);
      }
    },
    async deleteContact(contactId) {
      try {
        //find contact
        const id = this.contacts.findIndex(
          (contact) => contact.id === contactId
        );

        //delete
        this.contacts.splice(id, 1);

        this.setMessage("Контакт удалён");
      } catch (e) {
        console.log(e);
      }
    },
    async updateContact(contact, contactId) {
      try {
        //find contact
        const id = this.contacts.findIndex(
          (contact) => contact.id === contactId
        );

        //Имитация отправки запроса к API
        await new Promise((resolve) => {
          setTimeout(() => resolve(console.log("load complete...")), 1000);
        });

        //update
        this.contacts[id] = { ...contact, id: contactId };

        this.setMessage("Контакт успешно изменён");
      } catch (e) {
        console.log(e);
      }
    },
    setMessage(message) {
      clearTimeout(this.messageTimeout);

      this.message = message;

      this.messageTimeout = setTimeout(() => {
        this.message = null;
        this.messageTimeout = null;
      }, 3000);
    },
    clearMessage() {
      this.message = null;
    },
    setContact(contact) {
      this.currentContact = contact;
    },
    clearContact() {
      this.currentContact = null;
    },
  },
});
