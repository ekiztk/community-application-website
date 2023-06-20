import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar } from '@mui/material';
import { mainLogo, profileImage } from '../../assets/img';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from 'store';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const isLoggedIn = () => {
    if (user && isAuth) {
      return (
        <>
          <Link
            to="/profile"
            className="flex flex-row justify-center items-center cursor-pointer whitespace-nowrap"
          >
            <img
              className="p-2 object-contain max-h-12 rounded-full"
              src={profileImage}
              alt="logo"
            />
            {user?.name}
          </Link>

          <Button variant="outlined" color="error">
            <Link to="/" onClick={() => dispatch(setLogout())}>
              LOG OUT
            </Link>
          </Button>
        </>
      );
    }

    return (
      <>
        <Button variant="contained">
          <Link to="/auth/login">Log In</Link>
        </Button>

        <Button variant="contained" color="success">
          <Link to="/auth/signup">Sign Up</Link>
        </Button>
      </>
    );
  };

  return (
    <AppBar position="sticky" color="default" className="px-2">
      <div className="flex items-center justify-between space-x-4 lg:space-x-8">
        <Link to="/">
          <img
            className="pl-4 md:pl-0 object-contain max-h-16"
            src={mainLogo}
            alt="logo"
          />
        </Link>
        <div className="block md:hidden pr-4" onClick={() => setOpen(!open)}>
          <div className="space-y-1 cursor-pointer">
            <div className="bg-black w-8 h-1 rounded-full"></div>
            <div className="bg-black w-8 h-1 rounded-full"></div>
            <div className="bg-black w-8 h-1 rounded-full"></div>
          </div>
        </div>
        <nav className="pr-4 hidden md:flex justify-end flex-1">
          <div className="flex items-center lg:text-lg space-x-4 lg:space-x-8">
            <Link to="/">HOME</Link>
            <Link to="/applications">APPLICATIONS</Link>
            <div className="cursor-none">|</div>
            {isLoggedIn()}
          </div>
        </nav>
      </div>
      <div
        className={
          open
            ? 'absolute min-h-[60vh] top-16 flex flex-col justify-evenly items-center gap-y-2 md:hidden w-full'
            : 'hidden'
        }
      >
        <Link to="/">HOME</Link>
        <Link to="/applications">APPLICATIONS</Link>
        {isLoggedIn()}
      </div>
    </AppBar>
  );
};

export default Navbar;
