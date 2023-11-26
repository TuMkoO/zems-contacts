<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <router-link to="/">Книга контактов</router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
