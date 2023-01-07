function filterProducts(products , category_name) {
    return products.filter(
      (product) => product.category === category_name
    );
}

export default function useCategoryFilter(products){
    const mensclothing = filterProducts(products , `men's clothing`);
    const jewelery = filterProducts(products , `jewelery`);
    const electronics = filterProducts(products , `electronics`);
    const Womensclothing = filterProducts(products , `women's clothing`);

    return ({
        mensclothing,
        jewelery,
        electronics,
        Womensclothing
    })

}
  