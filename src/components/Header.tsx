import  { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { CiSaveDown2 } from 'react-icons/ci'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.winter
}

const Header = () => {
  //setting and saving theme based on user's preference
  const [theme, setTheme] = useState(getThemeFromLocalStorage())
  const handleTheme = () => {
    const { winter, dracula } = themes
    const newTheme = theme === winter ? dracula : winter
    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme]) // this runs whenever theres a change in the theme

  return (
    <header className="bg-neutral-content text-black py-2 z-[1] pr-6 ">
      <div className="align-item flex justify-end ">
        <div className="flex gap-x-6 items-center ">
          <Link to="/Savedarticles" >
            <CiSaveDown2 className=" h-6 w-6" />
          </Link>

          <Link
            to="/"
            className="link link-hover text-sm capitalize"
          >
            sign out
          </Link>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            <BsSunFill className="swap-on h-4 w-4" />
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
        </div>
      </div>
    </header>
  )
}

export default Header
