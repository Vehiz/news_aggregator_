import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SinglePage } from './index'
import Header from '../components/Header'
import { MdSaveAlt } from 'react-icons/md'
import { toast } from 'react-toastify'

export interface Article {
  url: string
  author: any
  urlToImage: any
  title: any
  description: any
  publishedAt: any
}

const API_KEY: string = '95ee27b835b146aa9f970467509705e3';
const PAGE_SIZE: number = 10 //number of articles per page

const Landing: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [query, setQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true) // State to manage loading state

  const fetchNews = async (page?: number) => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get<{ articles: Article[]; totalResults: number; }>(
        'https://newsapi.org/v2/everything',
        {
          params: {
            q: query? query : 'Apple', // Example query
            apiKey: API_KEY,
            page: page,
            pageSize: PAGE_SIZE
          },
        }
      )
      console.log(response.data.articles )
      setArticles(response.data.articles)
      setTotalPages(Math.ceil(response.data.totalResults / PAGE_SIZE));

    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
    setLoading(false); // Set loading to false after fetching data (whether success or error)
   }
  }

  // useEffect(() => {
  //   fetchNews(currentPage)
  // }, [currentPage]) // Fetch news only once when the component mounts

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const saveArticle = (article: Article) => {
    let savedArticles: Article[] = JSON.parse(
      localStorage.getItem('savedArticles') || '[]'
    )
    savedArticles.push(article)
    toast.success('saved successfully!')
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  }

  return (
    <div>
      {/* Header */}
      <Header />

      {/* form input */}
      <form
        style={{ gridTemplateColumns: '1fr auto' }}
        className="grid mb-20 w-4/5 lg:w-1/2 rounded-md shadow-md p-8 mx-auto mt-6"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search articles"
          className="input input-bordered w-full py-2 px-2.5 rounded-r-none bg-border-[1px] border-slate-200 capitalize text-sm lg:text-lg "
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            fetchNews()
          }}
          className="text-white bg-secondary rounded-r-md py-2.5 px-2.5 tracking-wider  text-sm lg:text-lg"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {/* news articles*/}
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {articles.map((article, index) => {
          return (
            <SinglePage
              article={article}
              key={index}
              onClick={()=>saveArticle(article)}
              icon={MdSaveAlt}
            />
          )
        })}
      </div>

      {/* pagination */}
      <div className="flex justify-end my-4 mx-auto">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className=" py-2 px-4 text-white bg-secondary rounded-l-md tracking-wide ml-2 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 text-white bg-secondary rounded-r-md tracking-wide mr-2 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Landing
