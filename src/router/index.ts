import { createRouter, createWebHistory } from 'vue-router';
import FileUploadView from '@/views/FileUploadView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FileUploadView,
  },
  // You can add other routes here as you expand the app
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
