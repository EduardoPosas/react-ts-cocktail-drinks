import { useEffect, useMemo } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import Form from "./Form"



function Header() {

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === "/", [pathname])
  const fetchCategories = useAppStore((state) => state.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <header className={` ${isHome ? "h-svh bg-header bg-cover bg-center bg-no-repeat" : "bg-slate-800"}`}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div className="w-32">
            <img src="/assets/logo.svg" alt="app logo" className="object-cover object-center" />
          </div>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "text-orange-600 uppercase font-extrabold" : "text-white uppercase"}
            >Home</NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) => isActive ? "text-orange-600 uppercase font-extrabold" : "text-white uppercase"}
            >Favoritos</NavLink>
          </nav>
        </div>
        {
          isHome && (<Form />)
        }

      </div>
    </header>
  )
}

export default Header