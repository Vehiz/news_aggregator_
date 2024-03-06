import React, { useEffect, useState } from 'react'
import { SinglePage } from '.'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

interface SavedArticle {
  url: string
  author: string | null
  urlToImage: string | null
  title: string | null
  description: string | null
  publishedAt: string | null
}

const SavedArticles: React.FC = () => {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([])


  useEffect(() => {
    // Function to retrieve saved articles from local storage
    const getSavedArticles = () => {
      const savedArticlesData = localStorage.getItem('savedArticles')
      if (savedArticlesData) {
        const savedArticlesArray: SavedArticle[] = JSON.parse(savedArticlesData)
        setSavedArticles(savedArticlesArray)
      }
    }

    getSavedArticles()
  }, []) // Run once on component mount

  // Function to removed saved articles from local storage
  const removeSavedArticle =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      const updatedSavedArticles = [...savedArticles]
      updatedSavedArticles.splice(index, 1)
      setSavedArticles(updatedSavedArticles)
      toast.error('removed!')
      localStorage.setItem(
        'savedArticles',
        JSON.stringify(updatedSavedArticles)
      )
    }
  return (
    <>
      <div className="text-2xl breadcrumbs font-bold capitalize text-secondary mx-auto pl-4 py-6">
        <ul>
          <li>
            <Link to="/landing">Home</Link>
          </li>
          <li>
            <h2> Saved Articles</h2>
          </li>
        </ul>
      </div>

      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {savedArticles.map((article, index) => (
          console.log(article),
          <SinglePage
            key={index}
            article={article}
            icon={RiDeleteBack2Line}
            onClick={removeSavedArticle(index)}
          />
        ))}
      </div>
    </>
  )
}

export default SavedArticles
