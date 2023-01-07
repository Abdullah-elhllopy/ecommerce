import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
const Navbar = () => {
  const navigate = useNavigate();
  const dispathch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      width={'100%'}
      height={'60px'}
      position={'fixed'}
      top={0}
      left={0}
      color={'black'}
      backgroundColor={"rgba(255, 255, 255, 0.95)"}
      zIndex="1"
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'80%'}
        margin="auto"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          Abdallah Store
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          columnGap={'20px'}
          zIndex="2"
        >
          <IconButton sx={{ color: 'black' }} >
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: 'black' }} >
            <PersonOutline />
          </IconButton>
          <Badge
           badgeContent ={cart.length}
           color={'secondary'}
           invisible ={cart.length === 0}
           sx ={{
            '& .MuiBadge-bage':{
              right : 5 ,
              top : 0 ,
              height : '14px',
              minWidth : '13px',
              padding : '0 4px'
            }
           }}
          >
            <IconButton sx={{ color: 'black' }}
              onClick = {()=>dispathch (setIsCartOpen({}))}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: 'black' }} >
            <MenuOutlined />
          </IconButton>

        </Box>
      </Box>
    </Box>
  )
}

export default Navbar