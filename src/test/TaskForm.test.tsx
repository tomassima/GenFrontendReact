import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskForm } from '../components/TaskForm'
import { TaskStatus } from '../enums/task-status'
import type { TaskEntity } from '../types/task-entity'

const mockForm: TaskEntity = { key: '', name: 'Test Task', priority: 5, status: TaskStatus.NotStarted }
const mockProps = { form: mockForm, editing: null, onFormChange: vi.fn(), onFormSubmit: vi.fn(), onCancel: vi.fn() }

describe('TaskForm', () => {
  it('renders fields and status options', () => {
    render(<TaskForm {...mockProps} />)
    expect(screen.getByDisplayValue('Test Task')).toBeTruthy()
    expect(screen.getByText('Not Started')).toBeTruthy()
  })

  it('calls handlers', () => {
    render(<TaskForm {...mockProps} />)
    fireEvent.change(screen.getByDisplayValue('Test Task'), { target: { value: 'X' } })
    fireEvent.submit(screen.getByRole('button', { name: /add task/i }).closest('form')!)
    expect(mockProps.onFormChange).toHaveBeenCalled()
    expect(mockProps.onFormSubmit).toHaveBeenCalled()
  })
})
