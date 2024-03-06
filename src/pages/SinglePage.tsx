import React, { FC, MouseEvent } from 'react'
import { Link, To } from 'react-router-dom'
import img from '../assets/pexels-thought-catalog-904616.jpg'
import { MdSaveAlt } from 'react-icons/md'
import { Article } from './Landing'
import { IconType } from 'react-icons'
// interface newsArticles {
//   publishedAt: any
//   url: any
//   author: any
//   urlToImage: any
//   title: any
//   description: any
//   article: {
//     author: any
//     title: string
//     publishedAt: string
//     urlToImage: string
//   }[]
// }
// interface saveArticles {
//   saveArticles: (e: ChangeEvent<HTMLInputElement>) => void
// }

interface Props {
  article: Article
  // saveArticle: (article: Article) => void
  icon: IconType
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}



const SinglePage: React.FC<Props> = ({article, icon: Icon, onClick}) => {
  return (
    <div className=" card w-full shadow-md hover:shadow-lg ">
      <figure className="pt-4 px-4">
        <img
          src={article.urlToImage === null ? img : article.urlToImage}
          alt={article.title}
          className="rounded-xl h-64 md:h-48  object-cover mx-auto"
        />
      </figure>
      <div className="card-body items-center ">
        <h2 className="card-title capitalize tracking-wider">
          {article.title.slice(0, 23)}
        </h2>
        <h4 className="font-bold">{article.publishedAt}</h4>
        <p>
          <span className="text-secondary">{article.author}</span>
        </p>
        <p className="flex flex-col">
          <span>{article.description?.slice(0, 127)}...</span>
          <span className="flex justify-between mt-4 place-items-center">
            <a href={article.url} target="_blank">
              <button className="hover:scale-105 transition duration-300 btn btn-secondary mt-2 font-medium capitalize ">
                read more
              </button>
            </a>
            <button onClick={onClick} >
              <Icon className='w-6 h-6 '/>
            </button>
          </span>
        </p>
      </div>
    </div>
  )
}

export default SinglePage
