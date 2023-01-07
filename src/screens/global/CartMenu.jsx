import { useCallback ,useMemo} from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice =useMemo(()=>{
        return cart.reduce((total, item) => {
            return total + item.count * item.price;
        }, 0);
    },[cart]) 
    // }, [cart.length])

    return (
        <Box
            display={isCartOpen ? 'block' : 'none'}
            width='100%'
            height={'100%'}
            position={'fixed'}
            zIndex={10}
            backgroundColor={"rgba(0, 0, 0, 0.4)"}
            left={"0"}
            top={"0"}
            overflow="auto"
        >
            <Box
                position={'fixed'}
                height={'100%'}
                backgroundColor={'white'}
                right={"0"}
                bottom={"0"}
                width={"max(400px, 30%)"}
            >
                <Box
                    padding={'30px'} overflow={'auto'} height={'100%'}
                >
                    <FlexBox mb={'15px'}>
                        <Typography variant="h3">Shopping Chart {cart.lenght} </Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} >
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    <Box>
                        {
                            cart.map(item => (
                                <Box key={`${item.title}-${item.id}`}>
                                    <FlexBox p={'15px 0'}>
                                        <Box flex={'1 1 40%'}>
                                            <img
                                                alt={'name'}
                                                width="123px"
                                                height="164px"
                                                style={{ objectFit: 'contain' }}
                                                src={item.image}
                                            />
                                        </Box>
                                        <Box flex={'1 1 60%'}>
                                            <FlexBox mb="5px" >
                                                <Typography fontWeight="bold">{item.title} </Typography>
                                                <IconButton
                                                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </FlexBox>
                                            <Typography >{item.title} </Typography>
                                            <FlexBox m={'15px 0'}>
                                                <Box
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    border={`1.5px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton
                                                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography>{item.count} </Typography>

                                                    <IconButton
                                                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <Typography fontWeight={'500'}>{item.price} </Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider />
                                </Box>
                            ))
                        }
                        {/* should be a  map for products */}


                    </Box>

                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0",
                            }}
                            onClick={() => {
                                navigate("/checkout");
                                dispatch(setIsCartOpen({}));
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export default CartMenu