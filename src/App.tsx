
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Landing, Login, SinglePage , Register, SavedArticles} from './pages'



//the staletime configures the time, in miliseconds, after which the cached data is considered stale.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/singlepage',
    element: (
      <SinglePage
        article={{
          url: 'someUrl',
          author: 'someAuthor',
          urlToImage: 'someUrlToImage',
          title: 'someTitle',
          description: 'someDescription',
          publishedAt: 'someDate',
        }}
        icon={function () {
          throw new Error('Function not implemented.')
        }}
        onClick={function () {
          throw new Error('Function not implemented.')
        }}
      />
    ),
  },
  {
    path: '/Savedarticles',
    element: <SavedArticles />,
  },
])

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
