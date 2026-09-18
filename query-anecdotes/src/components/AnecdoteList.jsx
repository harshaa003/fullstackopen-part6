import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotify } from '../NotificationContext'

const updateAnecdote = async anecdote => {
  const response = await fetch(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(anecdote)
    }
  )

  if (!response.ok) {
    throw new Error('failed to update anecdote')
  }

  return response.json()
}

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const mutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })

  const vote = anecdote => {
    mutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    notify(`you voted '${anecdote.content}'`)
  }

  const sortedAnecdotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  )

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>has {anecdote.votes} votes</p>

          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList