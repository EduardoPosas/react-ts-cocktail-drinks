import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Header from "../components/Header"
import Modal from "../components/HeadlessModal"
import Notification from "../components/HeadlessNotification"

function Root() {
  const fetchedFavorites = useAppStore(state => state.fetchFavoritesFromLocalStorage)

  useEffect(() => {
    fetchedFavorites()
  }, [fetchedFavorites])

  return (
    < >
      <Header />
      <main className="container mx-auto py-16 px-5">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  )
}

export default Root