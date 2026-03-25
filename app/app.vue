<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'

const colorMode = useColorMode()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const antTheme = computed(() => ({
  algorithm: isMounted.value && colorMode.value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: '#f59e0b',
    borderRadius: 12,
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
}))
</script>

<template>
  <ConfigProvider :theme="antTheme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>

<style>
/* Prevent flash of unstyled content */
html.dark {
  color-scheme: dark;
}

html:not(.dark) {
  color-scheme: light;
}
</style>
