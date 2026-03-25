<script setup lang="ts">
import { Layout } from 'ant-design-vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <Layout class="min-h-screen">
    <LayoutSidebar v-model:collapsed="collapsed" />
    <Layout>
      <LayoutHeader v-model:collapsed="collapsed" />
      <Layout.Content class="m-4 p-6 bg-white rounded-lg">
        <slot />
      </Layout.Content>
    </Layout>
  </Layout>
</template>
