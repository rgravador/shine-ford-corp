<script setup lang="ts">
import { Dropdown, Avatar, Badge } from 'ant-design-vue'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'

const user = useSupabaseUser()
const client = useSupabaseClient()

async function handleLogout() {
  await client.auth.signOut()
  navigateTo('/login')
}

// Get user initials for avatar
const userInitials = computed(() => {
  const email = user.value?.email || 'User'
  return email.charAt(0).toUpperCase()
})
</script>

<template>
  <header class="app-header">
    <!-- Left section -->
    <div class="app-header__left">
      <div class="app-header__search">
        <SearchOutlined class="app-header__search-icon" />
        <input
          type="text"
          placeholder="Search equipment, customers..."
          class="app-header__search-input"
        />
        <kbd class="app-header__search-kbd">⌘K</kbd>
      </div>
    </div>

    <!-- Right section -->
    <div class="app-header__right">
      <!-- Notifications -->
      <button class="app-header__icon-btn">
        <Badge :count="3" :offset="[-2, 2]">
          <BellOutlined />
        </Badge>
      </button>

      <!-- User dropdown -->
      <Dropdown placement="bottomRight" :trigger="['click']">
        <div class="app-header__user">
          <Avatar class="app-header__avatar">
            {{ userInitials }}
          </Avatar>
          <div class="app-header__user-info">
            <span class="app-header__user-name">{{ user?.email?.split('@')[0] || 'User' }}</span>
            <span class="app-header__user-role">Administrator</span>
          </div>
        </div>
        <template #overlay>
          <div class="app-header__dropdown">
            <div class="app-header__dropdown-header">
              <Avatar size="large" class="app-header__avatar">
                {{ userInitials }}
              </Avatar>
              <div>
                <div class="app-header__dropdown-name">{{ user?.email?.split('@')[0] || 'User' }}</div>
                <div class="app-header__dropdown-email">{{ user?.email || 'user@example.com' }}</div>
              </div>
            </div>
            <div class="app-header__dropdown-divider" />
            <button class="app-header__dropdown-item">
              <SettingOutlined />
              <span>Settings</span>
            </button>
            <button class="app-header__dropdown-item app-header__dropdown-item--danger" @click="handleLogout">
              <LogoutOutlined />
              <span>Log out</span>
            </button>
          </div>
        </template>
      </Dropdown>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 72px;
  background: white;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.app-header__left {
  flex: 1;
  max-width: 480px;
}

/* Search */
.app-header__search {
  position: relative;
  display: flex;
  align-items: center;
}

.app-header__search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  font-size: 16px;
}

.app-header__search-input {
  width: 100%;
  height: 44px;
  padding: 0 80px 0 44px;
  background: var(--color-slate-100);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  font-size: 0.9375rem;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.app-header__search-input::placeholder {
  color: var(--text-muted);
}

.app-header__search-input:focus {
  outline: none;
  background: white;
  border-color: var(--color-slate-300);
  box-shadow: 0 0 0 3px rgb(148 163 184 / 0.1);
}

.app-header__search-kbd {
  position: absolute;
  right: 12px;
  padding: 4px 8px;
  background: white;
  border: 1px solid var(--color-slate-200);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-sans);
}

/* Right section */
.app-header__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-header__icon-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.app-header__icon-btn:hover {
  background: var(--color-slate-100);
  color: var(--text-primary);
}

/* User section */
.app-header__user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px 6px 6px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.app-header__user:hover {
  background: var(--color-slate-100);
}

.app-header__avatar {
  background: linear-gradient(135deg, var(--color-amber-500) 0%, var(--color-amber-600) 100%) !important;
  color: white !important;
  font-weight: 600 !important;
}

.app-header__user-info {
  display: flex;
  flex-direction: column;
}

.app-header__user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.app-header__user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.2;
}

/* Dropdown */
.app-header__dropdown {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  min-width: 240px;
  overflow: hidden;
}

.app-header__dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.app-header__dropdown-name {
  font-weight: 600;
  color: var(--text-primary);
}

.app-header__dropdown-email {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.app-header__dropdown-divider {
  height: 1px;
  background: var(--border-color);
}

.app-header__dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.app-header__dropdown-item:hover {
  background: var(--color-slate-50);
  color: var(--text-primary);
}

.app-header__dropdown-item--danger {
  color: var(--color-error);
}

.app-header__dropdown-item--danger:hover {
  background: rgb(239 68 68 / 0.05);
  color: var(--color-error);
}

/* Responsive */
@media (max-width: 768px) {
  .app-header__search {
    display: none;
  }

  .app-header__user-info {
    display: none;
  }
}
</style>
