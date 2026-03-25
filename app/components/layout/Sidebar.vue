<script setup lang="ts">
import { computed } from 'vue'
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
  ToolOutlined,
} from '@ant-design/icons-vue'
import type { NavigationItem } from '~/types'

const route = useRoute()

const navigationItems: NavigationItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'DashboardOutlined', path: '/' },
  { key: 'equipment', label: 'Equipment', icon: 'ToolOutlined', path: '/equipment' },
  { key: 'customers', label: 'Customers', icon: 'TeamOutlined', path: '/customers' },
  { key: 'bookings', label: 'Bookings', icon: 'CalendarOutlined', path: '/bookings' },
  { key: 'invoices', label: 'Invoices', icon: 'FileTextOutlined', path: '/invoices' },
  { key: 'users', label: 'Users', icon: 'UserOutlined', path: '/users', adminOnly: true },
]

const iconComponents: Record<string, any> = {
  DashboardOutlined,
  ToolOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
}

const selectedKey = computed(() => {
  const currentPath = route.path
  const item = navigationItems.find((item) => item.path === currentPath)
  return item?.key || 'dashboard'
})

function handleNavClick(item: NavigationItem) {
  navigateTo(item.path)
}
</script>

<template>
  <aside class="sidebar">
    <!-- Logo Area -->
    <div class="sidebar__logo">
      <img src="~/assets/images/logo.png" alt="Shine Ford Corp" class="sidebar__logo-img" />
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <div
        v-for="item in navigationItems"
        :key="item.key"
        class="sidebar__nav-item"
        :class="{ 'sidebar__nav-item--active': selectedKey === item.key }"
        @click="handleNavClick(item)"
      >
        <component :is="iconComponents[item.icon || 'DashboardOutlined']" class="sidebar__nav-icon" />
        <span class="sidebar__nav-label">{{ item.label }}</span>
        <div v-if="selectedKey === item.key" class="sidebar__nav-indicator" />
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background: linear-gradient(180deg, var(--color-slate-900) 0%, var(--color-slate-950) 100%);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: 4px 0 24px rgb(0 0 0 / 0.1);
}

/* Logo */
.sidebar__logo {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-bottom: 1px solid rgb(255 255 255 / 0.06);
  margin-bottom: 8px;
}

.sidebar__logo-img {
  height: 100px;
  width: auto;
  border-radius: 12px;
}

/* Navigation */
.sidebar__nav {
  flex: 1;
  padding: 8px 12px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar__nav-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--color-slate-400);
  transition: all var(--transition-fast);
  gap: 14px;
  overflow: hidden;
}

.sidebar__nav-item:hover {
  background: rgb(255 255 255 / 0.06);
  color: white;
}

.sidebar__nav-item--active {
  background: rgb(255 255 255 / 0.1);
  color: white;
}

.sidebar__nav-item--active .sidebar__nav-icon {
  color: var(--color-amber-400);
}

.sidebar__nav-icon {
  font-size: 20px;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.sidebar__nav-label {
  font-size: 0.9375rem;
  font-weight: 500;
  white-space: nowrap;
}

.sidebar__nav-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: var(--color-amber-500);
  border-radius: 0 3px 3px 0;
}

</style>
