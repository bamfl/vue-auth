<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-center q-mb-lg menu-icon">Регистрация</div>
        <div class="login-form">
          <q-form ref="loginForm" @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              type="email"
              v-model="form.username"
              label="Email"
              hint="Введите ваш email"
              :rules="[rules.username]"
            />

            <q-input
              filled
              type="password"
              v-model="form.password"
              label="Пароль"
              hint="Введите пароль"
              :rules="[rules.required, rules.minLen(6)]"
            />

            <q-input
              filled
              type="password"
              v-model="form.passwordConfirm"
              label="Пароль"
              hint="Повторите пароль"
              :rules="[rules.required, rules.minLen(6)]"
            />

            <div v-if="recaptchaSiteKey">
              <vue-recaptcha
                ref="recaptcha"
                :sitekey="recaptchaSiteKey"
                type=""
                :loadRecaptchaScript="true"
                language="ru"
                @verify="onRecaptchaVerify"
              />
            </div>

            <div class="row justify-between">
              <q-btn
                class="q-mr-md"
                label="Зарегистрироваться"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Вход"
                flat
                color="positive"
                @click="router.push('/login')"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import { VueAuth } from '@websanova/vue-auth';
import { VueRecaptcha } from 'vue-recaptcha';
import { useRouter } from 'vue-router';
import { Ref, ref } from 'vue';
import { useQuasar } from 'quasar';
import { IRefForm, IRegisterForm } from 'src/types/types';

const recaptcha: Ref<VueRecaptcha | null> = ref(null);
const loginForm: Ref<IRefForm | null> = ref(null);

const $q = useQuasar();
const router = useRouter();
const auth: VueAuth = useAuth();

const recaptchaSiteKey = `${process.env.RECAPTCHA_SITE_KEY}` || '';

const isValidRecaptcha = ref(false);

const form: Ref<IRegisterForm> = ref({
  username: process.env.DEMO_USER || '',
  password: process.env.DEMO_PASSWORD || '',
  passwordConfirm: process.env.DEMO_PASSWORD || '',
  'g-recaptcha-response': null
});

const rules = ref({
  username: (v: string) => /.+@.+/.test(v) || 'Введите настоящий E-Mail',
  required: (v: string) => !!v || 'Поле обязательно для заполнения',
  minLen: (minLen: number) => (v: string) =>
    v.length >= minLen || `Минимум ${minLen} символов`
});

function onRecaptchaVerify(token: string): void {
  form.value['g-recaptcha-response'] = token;
  isValidRecaptcha.value = true;
}

function resetRecaptcha(): void {
  if (recaptcha.value) {
    recaptcha.value.reset();
  }
}

const onSubmit = async (): Promise<void> => {
  if (loginForm.value && isValidRecaptcha.value) {
    $q.loading.show();
    try {
      const result = await loginForm.value.validate();

      if (result) return authenticate();
    } catch (e) {
      console.error(e);
    }
  }
};

const authenticate = async (): Promise<void> => {
  try {
    await auth.login({ data: form.value });
    resetRecaptcha();
    router.push({ path: '/' });
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      $q.loading.hide();
    }, 400);
  }
};
</script>

<style scoped>
.login-form {
  min-width: 640px;
  max-width: 1080px;
}
</style>
