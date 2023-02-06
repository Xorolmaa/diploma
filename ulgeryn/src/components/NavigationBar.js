import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import {selectedCategory} from "../redux/actions/contentActions"
import {logout} from "../redux/actions/authActions"
import CloseIcon from "@mui/icons-material/Close";
import CreatableSelect from 'react-select/creatable';
import ReactSelect from './ReactSelect'
import Typography from '@mui/material/Typography';




const pages = ['Нүүр хуудас', 'Тухай'];
const settings = [ 'VIP хэрэглэгч болох','Үлгэр удирдах', 'Гарах'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function NavigationBar() {

  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    console.log("handleOpenNavMenu");
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    console.log(event);
    if(event.currentTarget.textContent === pages[0]){
        navigate("/")
      }else{
        navigate("/About")
      }
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    console.log(event);
    if(event.currentTarget.textContent === settings[1])
        navigate("/UserContent")
    else if(event.currentTarget.textContent === settings[2]){
      setLogoutState(true)       
    }
      
    setAnchorElUser(null);
  };

  const [categorySelected, setCategorySelected] = useState(0);

  const categorySelectionChangeHandler = (event) => {
    setCategorySelected(event.target.value);
  };

  const dispatch = useDispatch();

  const fetchCategory = async () => {
      dispatch(selectedCategory(categorySelected));
  }
  useEffect(() => {
    fetchCategory();
  }, [categorySelected]);

  const category = useSelector((state) => state.category)

  //const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

  const [user, setUser] = useState(null)
  useEffect(() => {
    const userString = localStorage.getItem("user")
    if(userString){
      setUser(JSON.parse(userString))
    }

  });
  const [logoutState, setLogoutState] = useState(false);
  
  const userOut = async () => {
    dispatch(logout()).then(() => {
      setUser(null);
      console.log("userOut", user)
    });
  }
  useEffect(() => {
    userOut();
  }, [logoutState]);

  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    console.log(event)
    setQuery(event.target.value);
  };

  // const options = tmp.filter(post => {
  //   if (query === '') {
  //     return post;
  //   } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
  //     return post;
  //   }
  // }).map((post) => (
  //   <div className="box" key={post.id}>
  //     <p>{post.title}</p>
  //   </div>
  //     ))

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ULGERYN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ULGERYN
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
              
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} alignItems="center">
            <FormControl variant="standard"  sx={{ m :2,  minWidth: 120,
                      display: { xs: 'none', md: 'flex' }}}>
              <Select value={categorySelected} onChange={categorySelectionChangeHandler} disableUnderline 
                    style={{color: 'white'}} >
                      <MenuItem value={0}>Бүх үлгэр</MenuItem>
                      <MenuItem value={1}>Монгол ардын үлгэр</MenuItem>
                      <MenuItem value={2}>Орос үлгэр</MenuItem>
                      <MenuItem value={3}>Бусад орны үлгэр</MenuItem>
              </Select>
            </FormControl>
            <Search >                    
                      {/* <ReactSelect/> */}
                      <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Хайлт"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
            </Search>
            
          </Box>
          
          {!user && <Box sx={{ display: { xs: 'none', md: 'flex'},  m:2  }}>
            <Button variant="outlined" color="inherit" sx={{ mr:2 }} onClick={()=>navigate("/LogIn")} type="button">Нэвтрэх</Button>
            <Button variant="outlined" color="inherit" onClick={()=>navigate("/SignUp")}>Бүртгүүлэх</Button>
          </Box>}

          {user && <>
           <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
            <Typography alignItems="center" sx={{mr: 2}}> {user && user.userName}</Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>           
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </>}
          
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default NavigationBar;
