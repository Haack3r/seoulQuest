import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from "../ui/Button";
import {
  UserIcon,
  LogInIcon
} from "lucide-react";
import SearchIcon from '@mui/icons-material/Search';

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
  const loginState = useSelector(state => state.loginSlice)

  return (
    <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to={'/'} className="text-2xl font-semibold tracking-wide text-gray-900">
              Seoul<span className="text-orange-500">Culture</span>Quest
            </Link>
          </div>
          {/* Navigation links */}
          <nav className="flex-grow flex justify-center float-right">
            <ul className="flex space-x-8">
              <li><Link to='/contact/' className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </nav>
          {/* User controls */}
          <ul className="flex space-x-4 items-center">
            <Search>
              <SearchIconWrapper>
                <SearchIcon className="bg-orange-600" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {!loginState.email ? (
              <>
                <li><Link to={'/member/login/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"><LogInIcon className="h-5 w-5 mr-2" />Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link></li>
                <Notification className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                <SearchIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </>
            )}
            <Button
              variant="default"
              size="sm"
              className="bg-orange-600 hover:bg-rose-700 text-white font-medium"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Sign up
            </Button>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default AdminBasicMenu
