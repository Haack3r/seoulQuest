
import { useDispatch, useSelector } from 'react-redux'
import { getTourItemsAsync, postChangeTourAsync } from '../slices/tourSlice'

const useCustomTour = () => {
    const tourItems = useSelector(state => state.tourSlice)
    const dispatch = useDispatch()

    const refreshTour = () => {
      console.log("useCustomTour: refresh")
         dispatch(getTourItemsAsync())
    }

    const changeTour = (param) => {
        dispatch(postChangeTourAsync(param))
    }

  return (
    {tourItems, refreshTour, changeTour}
  )
}

export default useCustomTour