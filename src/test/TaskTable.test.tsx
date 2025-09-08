import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskTable } from '../components/TaskTable'
import { TaskStatus } from '../enums/task-status'
import type { TaskEntity } from '../types/task-entity'

const mockTasks: TaskEntity[] = [
  { key: '1', name: 'Task 1', priority: 5, status: TaskStatus.NotStarted },
  { key: '2', name: 'Task 2', priority: 3, status: TaskStatus.InProgress },
]
const mockProps = { tasks: mockTasks, onEdit: vi.fn(), onDelete: vi.fn() }

describe('TaskTable', () => {
  it('renders tasks and handles actions', () => {
    render(<TaskTable {...mockProps} />)
    expect(screen.getByText('Task 1')).toBeTruthy()
    fireEvent.click(screen.getAllByText('Edit')[0])
    expect(mockProps.onEdit).toHaveBeenCalled()
  })
})
