<script setup lang="ts">
import { ref } from 'vue'
import { Form, Input, Button, Alert } from 'ant-design-vue'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'

definePageMeta({
  layout: 'auth',
})

const client = useSupabaseClient()

const formState = ref({
  email: '',
  password: '',
})
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const { error } = await client.auth.signInWithPassword({
      email: formState.value.email,
      password: formState.value.password,
    })

    if (error) {
      errorMessage.value = error.message
      return
    }

    navigateTo('/')
  } catch {
    errorMessage.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <!-- Left side - Login Form -->
    <div class="login-page__form-container">
      <div class="login-page__form-wrapper">
        <div class="login-page__form-header">
          <h2 class="login-page__form-title">Welcome back</h2>
          <p class="login-page__form-subtitle">Sign in to your account to continue</p>
        </div>

        <Alert
          v-if="errorMessage"
          :message="errorMessage"
          type="error"
          show-icon
          closable
          class="login-page__alert"
          @close="errorMessage = ''"
        />

        <Form
          :model="formState"
          layout="vertical"
          class="login-page__form"
          @finish="handleLogin"
        >
          <Form.Item
            name="email"
            label="Email address"
            :rules="[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]"
          >
            <Input
              v-model:value="formState.email"
              placeholder="you@company.com"
              size="large"
              class="login-page__input"
            >
              <template #prefix>
                <MailOutlined class="login-page__input-icon" />
              </template>
            </Input>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            :rules="[{ required: true, message: 'Please enter your password' }]"
          >
            <Input.Password
              v-model:value="formState.password"
              placeholder="Enter your password"
              size="large"
              class="login-page__input"
            >
              <template #prefix>
                <LockOutlined class="login-page__input-icon" />
              </template>
            </Input.Password>
          </Form.Item>

          <div class="login-page__forgot">
            <a href="#">Forgot password?</a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              html-type="submit"
              :loading="loading"
              block
              size="large"
              class="login-page__submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <p class="login-page__footer">
          Don't have an account? <a href="#">Contact administrator</a>
        </p>
      </div>
    </div>

    <!-- Right side - Branding -->
    <div class="login-page__branding">
      <div class="login-page__branding-content">
        <div class="login-page__logo">
          <img src="~/assets/images/logo.png" alt="Shine Ford Corp" class="login-page__logo-img" />
        </div>

        <h1 class="login-page__headline">
          Streamline your<br />
          equipment rentals
        </h1>

        <p class="login-page__tagline">
          Manage bookings, track inventory, and grow your rental business with Shine Ford.
        </p>

        <div class="login-page__features">
          <div class="login-page__feature">
            <div class="login-page__feature-icon">✓</div>
            <span>Real-time availability tracking</span>
          </div>
          <div class="login-page__feature">
            <div class="login-page__feature-icon">✓</div>
            <span>Automated invoicing & payments</span>
          </div>
          <div class="login-page__feature">
            <div class="login-page__feature-icon">✓</div>
            <span>Customer relationship management</span>
          </div>
        </div>
      </div>

      <!-- Background decoration -->
      <div class="login-page__decoration">
        <div class="login-page__decoration-circle login-page__decoration-circle--1" />
        <div class="login-page__decoration-circle login-page__decoration-circle--2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Branding Side */
.login-page__branding {
  width: 50%;
  background: linear-gradient(135deg, var(--color-slate-900) 0%, var(--color-slate-950) 100%);
  padding: 60px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-page__branding-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

.login-page__logo {
  margin-bottom: 40px;
}

.login-page__logo-img {
  height: 100px;
  width: auto;
  border-radius: 12px;
}

.login-page__headline {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin: 0 0 24px 0;
  letter-spacing: -0.02em;
}

.login-page__tagline {
  font-size: 1.125rem;
  color: var(--color-slate-400);
  line-height: 1.6;
  margin: 0 0 48px 0;
}

.login-page__features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-page__feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-slate-300);
}

.login-page__feature-icon {
  width: 24px;
  height: 24px;
  background: rgb(245 158 11 / 0.2);
  color: var(--color-amber-400);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

/* Decorations */
.login-page__decoration {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.login-page__decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(245 158 11 / 0.1) 0%, rgb(245 158 11 / 0.05) 100%);
}

.login-page__decoration-circle--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
}

.login-page__decoration-circle--2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
}

/* Form Side */
.login-page__form-container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: var(--color-slate-900);
}

.login-page__form-wrapper {
  width: 100%;
  max-width: 380px;
}

.login-page__form-header {
  margin-bottom: 32px;
}

.login-page__form-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.login-page__form-subtitle {
  color: var(--color-slate-400);
  margin: 0;
}

.login-page__alert {
  margin-bottom: 24px;
}

.login-page__form :deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: white;
}

.login-page__form :deep(.ant-form-item-label > label.ant-form-item-required::before) {
  color: var(--color-amber-400) !important;
}

.login-page__input {
  height: 48px;
  border-radius: var(--border-radius-sm) !important;
  background: var(--color-slate-800) !important;
  border-color: var(--color-slate-700) !important;
}

.login-page__input :deep(.ant-input) {
  font-size: 0.9375rem;
  background: transparent !important;
  color: white !important;
}

.login-page__input :deep(.ant-input::placeholder) {
  color: var(--color-slate-500) !important;
}

.login-page__input :deep(.ant-input-password-icon) {
  color: var(--color-slate-400) !important;
}

.login-page__input-icon {
  color: var(--color-slate-400);
}

.login-page__forgot {
  text-align: right;
  margin-bottom: 24px;
}

.login-page__forgot a {
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.login-page__forgot a:hover {
  color: var(--accent-hover);
}

.login-page__submit {
  height: 48px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  border-radius: var(--border-radius-sm) !important;
}

.login-page__footer {
  text-align: center;
  color: var(--color-slate-400);
  font-size: 0.875rem;
  margin-top: 32px;
}

.login-page__footer a {
  color: var(--accent-primary);
  font-weight: 500;
  text-decoration: none;
}

.login-page__footer a:hover {
  color: var(--accent-hover);
}

/* Responsive */
@media (max-width: 1024px) {
  .login-page__branding {
    padding: 40px;
  }

  .login-page__headline {
    font-size: 2.25rem;
  }

  .login-page__form-container {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .login-page__branding {
    display: none;
  }

  .login-page__form-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .login-page__form-container {
    padding: 24px;
  }
}
</style>
