import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import NotificationMenu from '../ui/Notification';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const AdminBasicMenu = () => {
  // const loginState = useSelector(state => state.loginSlice)

  return (
    <>
      <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Name */}
            {/* <div className="flex items-center"> */}
            <div className="flex-grow flex justify-center lg:justify-start">
              {/* <Link to={'/'} */}
              <Link
                to={'/'}
                className="text-2xl font-semibold tracking-wide text-gray-900">
                Seoul
                <span className="text-red-800">Culture</span>
                <span className="text-blue-900">Quest</span>
              </Link>
            </div>
            {/* <div className='hidden lg:flex lg:flex-grow lg:justify-between lg:items-center px-8'> */}
            <div className='hidden lg:flex items-center space-x-4'>
              {/* <nav className="flex space-x-4 items-center">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: '#fb8c00' }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                // 검색기능
              </nav> */}
              {/* <div className='flex space-x-4 items-center lg:flex-grow lg:justify-between lg:items-center'> */}
              {/* <NotificationMenu className="h-5 w-5 text-gray-600 hover:text-gray-900" /> */}
              <NotificationMenu className="text-gray-600 hover:text-gray-900" />
              {/* <nav className="flex space-x-4 items-center"> */}
              <Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link>
              {/* </nav> */}
              {/* </div> */}
            </div>
          </div >
        </div >
      </header >
    </>
  )
}

export default AdminBasicMenu