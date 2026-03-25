<script setup lang="ts">
</script>

<template>
  <div class="app-layout">
    <LayoutSidebar />

    <div class="app-layout__main">
      <LayoutHeader />

      <main class="app-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: var(--bg-primary);
}

.app-layout__main {
  margin-left: 260px;
  min-height: 100vh;
}

.app-layout__content {
  padding: 24px;
  min-height: calc(100vh - 72px);
}

/* Responsive */
@media (max-width: 768px) {
  .app-layout__content {
    padding: 16px;
  }
}
</style>
