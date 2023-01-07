import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { shades } from "../../theme";
import { addToCart } from "../../state";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    // to access theme colors or any thing from theme component
    const {
        palette: { neutral },
    } = useTheme();
    const { category, price, title, image, rating } = item;
    const { rate } = rating
    return (
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                {/* <img
                    onClick={() => navigate(`/item/${item.id}`)}
                    alt={'name'}
                    width="300px"
                    height="400px"
                    style={{ objectFit: 'contain', cursor: 'pointer' }}
                    src={image}
                /> */}

                <LazyLoadImage
                    onClick={() => navigate(`/item/${item.id}`)}
                    src={image}
                    height={400}
                    width={300}
                    effect="blur"
                    placeholderSrc={image}
                />
                <Box
                    display={isHovered ? 'block' : 'none'}
                    position='absolute'
                    width='100%'
                    bottom={'10%'}
                    left={0}
                    padding='0 5%'
                >
                    <Box display={'flex'} justifyContent='space-between'>
                        <Box display={'flex'} alignItems={'center'}
                            backgroundColor={shades.neutral[100]}
                            borderRadius="3px"
                        >
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]} >{count} </Typography>
                            <IconButton
                                onClick={() => setCount(Math.max(count + 1))}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            onClick={() => dispatch(addToCart({ ...item, count }))}
                            sx={{ backgroundColor: shades.primary[300], color: "white" }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {category
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{title}</Typography>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Typography fontWeight="bold">${price}</Typography>

                    <Rating name="read-only" value={rate} readOnly />
                </Box>
            </Box>
        </Box>
    )
}

export default Item