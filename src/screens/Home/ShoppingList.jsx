import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from '@mui/material/CircularProgress';
import { useProducts } from "../../Hooks/UseProducts";
import useCategoryFilter from "../../Hooks/UseFilter";

const ShoppingList = () => {
    const [value, setValue] = useState("all");
    const { products } = useProducts();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { mensclothing, jewelery, electronics, Womensclothing } = useCategoryFilter(products)
    const breakPoint = useMediaQuery("(min-width:600px)");
    return (
        <Box
            width={'80%'}
            margin={'80px auto'}
        >
            <Typography textAlign={'center'} variant="h3"  >Our Featured <b>Products</b> </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                    fontWeight: '700'
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="Men's clothing" value="Men's clothing" />
                <Tab label="Jewelery" value="Jewelery" />
                <Tab label="Electronics" value="Electronics" />
                <Tab label="Women's clothing" value="Women's clothing" />

            </Tabs>
            {
                products.length > 0 ?
                    <Box
                        margin={'0 auto'}
                        display='grid'
                        gridTemplateColumns={'repeat(auto-fill,300px)'}
                        justifyContent='space-around'
                        rowGap={'20px'}
                        columnGap={'1.33%'}
                    >
                        {value === "all" &&
                            products?.map((item) => (
                                <Item item={item} key={`${item.name}-${item.id}`} />
                            )) 
                        }
                        {value === "Men's clothing" &&
                            mensclothing?.map((item) => (
                                <Item item={item} key={`${item.name}-${item.id}`} />
                            ))
                        }
                        {value === "Jewelery" &&
                            jewelery?.map((item) => (
                                <Item item={item} key={`${item.name}-${item.id}`} />
                            ))
                        }
                        {value === "Electronics" &&
                            electronics?.map((item) => (
                                <Item item={item} key={`${item.name}-${item.id}`} />
                            ))
                        }
                        {value === "Women's clothing" &&
                            Womensclothing?.map((item) => (
                                <Item item={item} key={`${item.name}-${item.id}`} />
                            ))
                        }
                    </Box> :
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <CircularProgress />
                    </Box>
            } 
        </Box>
    )
}

export default ShoppingList