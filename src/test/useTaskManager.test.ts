import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTaskManager } from '../hooks/useTaskManager'

vi.mock('../services/task-api', () => ({
  taskApi: { getAllTasks: vi.fn().mockResolvedValue([]) }
}))

describe('useTaskManager', () => {
  it('updates form fields', () => {
    const { result } = renderHook(() => useTaskManager())
    act(() => result.current.handleFormChange({ target: { name: 'name', value: 'Hello' } } as any))
    expect(result.current.form.name).toBe('Hello')
  })

  it('converts numeric fields', () => {
    const { result } = renderHook(() => useTaskManager())
    act(() => result.current.handleFormChange({ target: { name: 'priority', value: '4' } } as any))
    act(() => result.current.handleFormChange({ target: { name: 'status', value: '2' } } as any))
    expect(result.current.form.priority).toBe(4)
    expect(result.current.form.status).toBe(2)
  })
})
