import { useMutation, useQueryClient } from '@tanstack/react-query'

const createAnecdote = async newAnecdote => {
  const response = await fetch('http://localhost:3001/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  })

  if (!response.ok) {
    throw new Error('failed to create anecdote')
  }

  return response.json()
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
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

        <button type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm