import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotify } from '../NotificationContext'

const createAnecdote = async newAnecdote => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const mutation = useMutation({
    mutationFn: createAnecdote,

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })

      notify(`a new anecdote '${data.content}' created`)
    },

    onError: error => {
      notify(error.message)
    }
  })

  const addAnecdote = event => {
    event.preventDefault()

    const content = event.target.anecdote.value

    mutation.mutate({
      content,
      votes: 0
    })

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>

      <form onSubmit={addAnecdote}>
        <input name="anecdote" />

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm