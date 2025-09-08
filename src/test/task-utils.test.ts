import { describe, it, expect } from 'vitest'
import { sortTasks, filterTasks, statusLabels } from '../utils/task-utils'
import { TaskStatus } from '../enums/task-status'
import type { TaskEntity } from '../types/task-entity'

const mockTasks: TaskEntity[] = [
  { key: '1', name: 'High priority task', priority: 10, status: TaskStatus.NotStarted },
  { key: '2', name: 'Low priority task', priority: 1, status: TaskStatus.InProgress },
  { key: '3', name: 'Medium priority task', priority: 5, status: TaskStatus.Completed },
]

describe('task-utils', () => {
  it('sorts by priority asc', () => {
    const r = sortTasks(mockTasks, 'priority', 'asc')
    expect(r.map((t) => t.priority)).toEqual([1, 5, 10])
  })

  it('filters by name', () => {
    const r = filterTasks(mockTasks, 'high')
    expect(r).toHaveLength(1)
  })

  it('has status labels', () => {
    expect(statusLabels[TaskStatus.NotStarted]).toBe('Not Started')
  })
})
