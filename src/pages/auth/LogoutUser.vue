<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="primary" text-color="white" />
          <span class="q-ml-sm">Вы действительно хотите выйти?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Нет" color="primary" @click="cancelLogout" />
          <q-btn flat label="Да" color="primary" @click="logout" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <img
      height="400"
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { useAuth } from '@websanova/vue-auth/src/v3.js'
import { useRouter } from 'vue-router';

// const auth = useAuth()
const router = useRouter();

const confirm = ref(false);

const logout = (): void => {
  // TODO: Сделать логику logout, т.к. Logout метода на бэке go еще нет
  // auth
  //   .logout({
  //     makeRequest: true,
  //     redirect: { name: 'login' }
  //   })
  //   .then(() => console.log('logout'))
  //   .finally(() => {
  //     localStorage.clear()
  //     router.push('/login')
  //   })

  // TODO: Сделать логику logout, т.к. Logout метода на бэке go еще нет
  console.log('logout');
  localStorage.clear();
  router.push('/login');
};

function cancelLogout(): void {
  router.go(-1);
}

onMounted((): void => {
  confirm.value = true;
});
</script>

<style scoped></style>
