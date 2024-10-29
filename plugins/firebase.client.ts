import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseUrl,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const database = getDatabase(app);

  /*   nuxtApp.vueApp.provide('auth', auth); */
  nuxtApp.provide('auth', auth);

  /*  nuxtApp.vueApp.provide('database', database); */
  nuxtApp.provide('database', database);
});
