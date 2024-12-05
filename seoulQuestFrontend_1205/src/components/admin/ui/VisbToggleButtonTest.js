// import React from 'react'
// import ClearAllIcon from '@mui/icons-material/ClearAll'
// import { Button } from '@mui/material'

// export default function VisbToggleButton({ isVisible, onToggle }) {
//     const [visMenuButton, setVisMenuButton] = React.useState('display: invisible')

//     React.useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth <= 750) {
//                 setVisMenuButton('display: visible')
//             } else setVisMenuButton('display: invisible')
//         }

//         handleResize()

//         window.addEventListener('resize', handleResize)

//         return () => window.removeEventListener('resize', handleResize)
//     })

//     return (
//         <Button variant='text' onClick={onToggle} className='flex items-center'>
//             <ClearAllIcon className={`${visMenuButton}`} />
//             {isVisible ? '' : ''}
//         </Button>
//     )
// }