const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/add",
    component: () => import("layouts/PagesLayout.vue"),
    children: [{ path: "/add", component: () => import("pages/AddPage.vue") }],
  },
  {
    path: "/contact/:id",
    component: () => import("layouts/PagesLayout.vue"),
    children: [
      {
        path: "/contact/:id",
        component: () => import("pages/ContactPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
