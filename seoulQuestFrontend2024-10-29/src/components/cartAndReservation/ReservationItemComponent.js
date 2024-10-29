// import React from 'react'
// import { API_SERVER_HOST } from '../../api/todoApi';

// const host = API_SERVER_HOST

// const ReservationItemComponent = ({rino, tname, tprice, tno, tqty, imageFile, changeReservation, email}) => {
    
//     const handleCLickQty = (amount) => {
//         changeReservation({ email, rino, tno, tqty: tqty + amount})
//     }

//   return (
//     <li key = {rino} className='border-2'>
//         <div className='w-full border-2'>
//             <div className='m-1 p-1'>
//                 <img src={`${host}/api/tours/view/s_${imageFile}`}/>
//             </div>
//             <div className='justify-center p-2 text-xl '>
//                 <div className='jsutify-end w-full'>
//                 </div>
//                 <div>Reservation Item No: {rino}</div>
//                 <div>Tno: {tno}</div>
//                 <div>Name: {tname}</div>
//                 <div>Price: {tprice}</div>
//                 <div className='flex'>
//                     <div className='w-2/3'>
//                     Qty: {tqty}
//                     </div>
//                     <div>
//                     <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
//                     onClick={()=> handleCLickQty(1)}>
//                             +
//                         </button>
//                         <button className='m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg' 
//                         onClick={()=> handleCLickQty(-1)}>
//                             -
//                         </button>
//                     </div>
//                 </div>
//                 <div>
//                     <div className='flex text-white font-bold p-2 justify-center'>
//                         <button
//                         className='m-1 p-1 text-white bg-red-500 w-full rounded-lg' onClick={()=> handleCLickQty(-1 * tqty)}>
//                             delete
//                         </button>
//                     </div>
//                     <div className='font-extrabold border-t-2 text-right m-2 pr-4'>
//                         ₩{tqty * tprice} 
//                     </div>
//                 </div>
//             </div>
//             </div>
//     </li>
//   );
// }

// export default ReservationItemComponent