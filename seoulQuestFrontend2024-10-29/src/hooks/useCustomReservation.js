// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getreservationItemsAsync, postChangeReservationAsync } from '../slices/reservationSlice'

// const useCustomReservation = () => {
//     const reservationItems = useSelector(state => state.reservationSlice)
//     const dispatch = useDispatch()
//     const refreshReservation = () => {
//       console.log("useCustomReservation: refresh")
//          dispatch(getreservationItemsAsync())
//     }
//     const changeReservation = (param) => {
//         dispatch(postChangeReservationAsync(param))
//     }
//   return (
//     {reservationItems, refreshReservation, changeReservation}
//   )
// }

// export default useCustomReservation