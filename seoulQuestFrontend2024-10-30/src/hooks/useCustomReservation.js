import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationItemsAsync, postChangeReservationAsync } from '../slices/reservationSlice'

const useCustomReservation = () => {
    const reservationItems = useSelector(state => state.reservationSlice)
    const dispatch = useDispatch()

    const refreshReservation = () => {
      console.log("useCustomReservation: refresh")
         dispatch(getReservationItemsAsync())
    }

    const changeReservation = (param) => {
        dispatch(postChangeReservationAsync(param))
    }

  return (
    {reservationItems, refreshReservation, changeReservation}
  )
}

export default useCustomReservation