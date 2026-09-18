import { useQuery } from '@tanstack/react-query'

const fetchAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')

  if (!response.ok) {
    throw new Error('failed to fetch anecdotes')
  }

  return response.json()
}

const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotes
  })
}

export default useAnecdotes