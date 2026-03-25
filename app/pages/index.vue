<script setup lang="ts">
import { ref } from 'vue'
import { Card, Empty } from 'ant-design-vue'
import {
  ToolOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue'

definePageMeta({
  middleware: ['auth'],
})

// Placeholder stats - will be replaced with real data
const stats = ref([
  {
    key: 'equipment',
    title: 'Total Equipment',
    value: 24,
    change: 12,
    trend: 'up',
    icon: ToolOutlined,
    color: 'amber',
  },
  {
    key: 'customers',
    title: 'Total Customers',
    value: 156,
    change: 8,
    trend: 'up',
    icon: TeamOutlined,
    color: 'blue',
  },
  {
    key: 'bookings',
    title: 'Active Bookings',
    value: 12,
    change: -3,
    trend: 'down',
    icon: CalendarOutlined,
    color: 'emerald',
  },
  {
    key: 'revenue',
    title: 'Monthly Revenue',
    value: 48500,
    change: 23,
    trend: 'up',
    icon: DollarOutlined,
    color: 'violet',
    prefix: '$',
  },
])

const recentBookings = ref([
  { id: 'BK-001', customer: 'Smith Construction', equipment: 'Excavator CAT 320', status: 'active', date: '2 hours ago' },
  { id: 'BK-002', customer: 'Metro Builders', equipment: 'Crane Liebherr LTM', status: 'pending', date: '5 hours ago' },
  { id: 'BK-003', customer: 'Highway Corp', equipment: 'Bulldozer D8T', status: 'completed', date: '1 day ago' },
])

const pendingActions = ref([
  { title: 'Equipment inspection due', subtitle: 'Excavator CAT 320', type: 'warning' },
  { title: 'Invoice payment overdue', subtitle: 'INV-2024-089', type: 'error' },
  { title: 'Contract renewal', subtitle: 'Metro Builders', type: 'info' },
])

function formatNumber(num: number, prefix = '') {
  if (num >= 1000) {
    return prefix + (num / 1000).toFixed(1) + 'k'
  }
  return prefix + num.toLocaleString()
}

function getStatusClass(status: string) {
  const classes: Record<string, string> = {
    active: 'status--active',
    pending: 'status--pending',
    completed: 'status--completed',
  }
  return classes[status] || ''
}
</script>

<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="dashboard__header">
      <div>
        <h1 class="dashboard__title">Dashboard</h1>
        <p class="dashboard__subtitle">Welcome back! Here's what's happening today.</p>
      </div>
      <div class="dashboard__date">
        <ClockCircleOutlined />
        <span>{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div
        v-for="(stat, index) in stats"
        :key="stat.key"
        class="stat-card animate-fade-in-up"
        :class="[`stat-card--${stat.color}`, `stagger-${index + 1}`]"
      >
        <div class="stat-card__icon">
          <component :is="stat.icon" />
        </div>
        <div class="stat-card__content">
          <span class="stat-card__title">{{ stat.title }}</span>
          <span class="stat-card__value">{{ formatNumber(stat.value, stat.prefix) }}</span>
        </div>
        <div class="stat-card__trend" :class="{ 'stat-card__trend--down': stat.trend === 'down' }">
          <ArrowUpOutlined v-if="stat.trend === 'up'" />
          <ArrowDownOutlined v-else />
          <span>{{ Math.abs(stat.change) }}%</span>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Recent Bookings -->
      <Card class="content-card animate-fade-in-up stagger-2">
        <template #title>
          <div class="content-card__header">
            <span>Recent Bookings</span>
            <NuxtLink to="/bookings" class="content-card__link">View all</NuxtLink>
          </div>
        </template>

        <div v-if="recentBookings.length" class="bookings-list">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="booking-item"
          >
            <div class="booking-item__info">
              <span class="booking-item__id">{{ booking.id }}</span>
              <span class="booking-item__customer">{{ booking.customer }}</span>
              <span class="booking-item__equipment">{{ booking.equipment }}</span>
            </div>
            <div class="booking-item__meta">
              <span class="booking-item__status" :class="getStatusClass(booking.status)">
                {{ booking.status }}
              </span>
              <span class="booking-item__date">{{ booking.date }}</span>
            </div>
          </div>
        </div>

        <Empty v-else description="No recent bookings" />
      </Card>

      <!-- Pending Actions -->
      <Card class="content-card animate-fade-in-up stagger-3">
        <template #title>
          <div class="content-card__header">
            <span>Pending Actions</span>
            <span class="content-card__badge">{{ pendingActions.length }}</span>
          </div>
        </template>

        <div v-if="pendingActions.length" class="actions-list">
          <div
            v-for="(action, index) in pendingActions"
            :key="index"
            class="action-item"
            :class="`action-item--${action.type}`"
          >
            <div class="action-item__indicator" />
            <div class="action-item__content">
              <span class="action-item__title">{{ action.title }}</span>
              <span class="action-item__subtitle">{{ action.subtitle }}</span>
            </div>
            <CheckCircleOutlined class="action-item__check" />
          </div>
        </div>

        <Empty v-else description="No pending actions" />
      </Card>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.dashboard__title {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.dashboard__subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.dashboard__date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.875rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Stat Card */
.stat-card {
  background: white;
  border-radius: var(--border-radius-lg);
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  opacity: 0;
}

.stat-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.stat-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.stat-card--amber .stat-card__icon {
  background: linear-gradient(135deg, rgb(251 191 36 / 0.15) 0%, rgb(245 158 11 / 0.15) 100%);
  color: var(--color-amber-600);
}

.stat-card--blue .stat-card__icon {
  background: linear-gradient(135deg, rgb(59 130 246 / 0.15) 0%, rgb(37 99 235 / 0.15) 100%);
  color: #2563eb;
}

.stat-card--emerald .stat-card__icon {
  background: linear-gradient(135deg, rgb(16 185 129 / 0.15) 0%, rgb(5 150 105 / 0.15) 100%);
  color: #059669;
}

.stat-card--violet .stat-card__icon {
  background: linear-gradient(135deg, rgb(139 92 246 / 0.15) 0%, rgb(124 58 237 / 0.15) 100%);
  color: #7c3aed;
}

.stat-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card__title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-card__value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-card__trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-success);
  background: rgb(16 185 129 / 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

.stat-card__trend--down {
  color: var(--color-error);
  background: rgb(239 68 68 / 0.1);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Content Card */
.content-card {
  opacity: 0;
}

.content-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-card__link {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.content-card__link:hover {
  color: var(--accent-hover);
}

.content-card__badge {
  background: var(--color-amber-500);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
}

/* Bookings List */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--color-slate-50);
  border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast);
}

.booking-item:hover {
  background: var(--color-slate-100);
}

.booking-item__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.booking-item__id {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.booking-item__customer {
  font-weight: 600;
  color: var(--text-primary);
}

.booking-item__equipment {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.booking-item__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.booking-item__status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: capitalize;
}

.status--active {
  background: rgb(16 185 129 / 0.1);
  color: #059669;
}

.status--pending {
  background: rgb(245 158 11 / 0.1);
  color: #d97706;
}

.status--completed {
  background: rgb(148 163 184 / 0.2);
  color: var(--text-secondary);
}

.booking-item__date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Actions List */
.actions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--color-slate-50);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-item:hover {
  background: var(--color-slate-100);
}

.action-item:hover .action-item__check {
  opacity: 1;
}

.action-item__indicator {
  width: 4px;
  height: 40px;
  border-radius: 2px;
  flex-shrink: 0;
}

.action-item--warning .action-item__indicator {
  background: var(--color-warning);
}

.action-item--error .action-item__indicator {
  background: var(--color-error);
}

.action-item--info .action-item__indicator {
  background: var(--color-info);
}

.action-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-item__title {
  font-weight: 600;
  color: var(--text-primary);
}

.action-item__subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.action-item__check {
  color: var(--text-muted);
  font-size: 18px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
</style>
