import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { RecipeDetails } from '../types';

export default function Modal() {

  const showModal = useAppStore(state => state.showModal)
  const closeModal = useAppStore(state => state.closeModal)
  const recipe = useAppStore(state => state.selectedRecipe)
  const handleFavorites = useAppStore(state => state.handleFavorites)
  const favoriteExist = useAppStore(state => state.favoriteExist)

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []

    for (let i = 1; i <= 6; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetails]
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetails]
      if (ingredient && measure) {
        ingredients.push(<li key={i} className='text-normal font-normal'>{`${ingredient} - ${measure}`}</li>)
      }
    }

    return ingredients.length ? ingredients : <li>No hay información de la bebida</li>
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-auto rounded bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                    {recipe.strDrink}
                  </DialogTitle>
                  <img
                    src={recipe.strDrinkThumb}
                    alt={`thumb of ${recipe.strDrink}`}
                    className="mx-auto w-52"
                  />
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </DialogTitle>
                  <ul className='list-disc list-inside'>{renderIngredients()}</ul>
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </DialogTitle>
                  <p className='text-base'>{recipe.strInstructions}</p>

                  <div className='mt-4 flex gap-4 justify-between items-center'>
                    <button
                      type="button"
                      className="bg-gray-700 hover:bg-gray-500 transition-colors text-white font-bold uppercase px-6 py-2 w-full rounded shadow"
                      onClick={closeModal}
                    >Cerrar</button>
                    <button
                      type="button"
                      className="bg-orange-700 hover:bg-orange-500 transition-colors text-white font-bold uppercase px-6 py-2 w-full rounded shadow"
                      onClick={() => {handleFavorites(recipe)}}
                    >{favoriteExist(recipe.idDrink) ? "Eliminar de favoritos" : "Agregar a favoritos"}</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}