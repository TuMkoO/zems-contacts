<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title
          ><router-link to="/">Title</router-link></q-toolbar-title
        >
        <q-btn to="/" flat round dense icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
