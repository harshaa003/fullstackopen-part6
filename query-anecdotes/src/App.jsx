import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import useAnecdotes from './hooks/useAnecdotes'

const App = () => {
  const result = useAnecdotes()

  if (result.isPending) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      <AnecdoteList anecdotes={result.data} />

      <AnecdoteForm />
    </div>
  )
}

export default App