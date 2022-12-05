const initialState = {
    products : [],
    allProducts : [],
    categories: [],
    cart: [],
    reviews: [],
    orders: [],
    detail: {}
};

export default function productsReducer (state= initialState, action){
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload
            };
        case 'GET_PRODUCT_DETAILS':
            return {
                  ...state,
                  detail: action.payload,
                 
                };

        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            };

        case 'POST_CATEGORY':
            return {
                ...state,
            }

        case 'POST_PRODUCT':
            return{
                ...state,
            };

        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter((c) => c.id !== action.payload),
            };

        case 'PUT_CATEGORY':
            return {
                ...state,                
            };    
            
        case 'DELETE_PRODUCT':
            return {
                ...state,
                productDeleted: action.payload
            };

        case 'PUT_PRODUCT':
            return {
                ...state,                
            };            
            
        case 'ALPHABETICAL_ORDER':
            let sortedArr = action.payload === true ?
                
                state.products?.sort((a, b) => b.title.localeCompare(a.title)) :
                
                state.products?.sort((a, b) => a.title.localeCompare(b.title));
            return {
                ...state,
                products: sortedArr
            };

        case 'ORDER_BY_RATING':
            let sortedArr2 = action.payload === true ?
                state.products?.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating )) : 
                state.products?.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            return {
                ...state,
                products: sortedArr2
            };

        case 'ORDER_BY_PRICE':
            let sortedArr3 = action.payload === true ?
                state.products?.sort((a, b) => parseInt(a.price) - parseInt(b.price)) : 
                state.products?.sort((a, b) => parseInt(b.price) - parseInt(a.price))
            return {
                ...state,
                products: sortedArr3
            };

        case 'FILTER_BY_CATEGORIES':
            const allProductsCategories = state.allProducts;
            console.log(action.payload);
            const categoriesFiltered = action.payload === 'All' ? allProductsCategories : allProductsCategories.filter( pro => pro.categories?.find( e => e.hasOwnProperty("name")).name.includes(action.payload))
            console.log(categoriesFiltered);
            return {
                ...state,
                products: categoriesFiltered
            };    

        case 'SEARCH_PRODUCT': 
            let productList;
            if (action.payload.length === 0) {
                productList = state.allProducts
            } else {
                productList = state.products.filter( product => {
                let nameProduct = product.title.toLowerCase();
                return nameProduct.includes(action.payload.toLowerCase())
                })
            }
            return {
                ...state,
                products: productList
            };

        case 'GET_PRODUCTS_BY_NAME':
            return{
                ...state,
                products: action.payload
            };

        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };

        case 'ADD_CART':
            let addedCart = [];

            if (state.cart !== null) {
               addedCart = [...state.carrito];
            }

            let indexAddedCart = state.cart?.findIndex(
               (cart) => Number(cart.id) === Number(action.payload.productId)
            );

            if (indexAddedCart !== -1) {
            addedCart[indexAddedCart].amount = action.payload.amount;
            return {
                ...state,
                cart: addedCart,
            };
            } else {
            const productSelected = state.Allproducts.find(
            (product) =>
            Number(product.id) === Number(action.payload.productId)
            );

            return {
                ...state,
                cart: [
                    ...state.cart,
                {
                    id: productSelected.id,
                    title: productSelected.title,
                    price: productSelected.price,
                    images: productSelected.images,
                    amount: action.payload.amount,
                },
                ],
             };
            }

        case 'ONE_ITEM_CART':
         let newCart = [...state.cart];
         let cartIndex = state.cart.findIndex(
            (cart) => Number(cart.id) === Number(action.payload.productId)
         );

         if (cartIndex !== -1) {
         newCart[cartIndex].amount =
         newCart[cartIndex].amount - 1;
        
         return {
              ...state,
              cart: newCart,
         };
         } else {
         const productSelected = state.Allproducts.find(
          (product) =>
            Number(product.id) === Number(action.payload.productId)
         );

        return {
          ...state,
          cart: [
            ...state.cart,
            {
                id: productSelected.id,
                title: productSelected.title,
                price: productSelected.price,
                images: productSelected.images,
                amount: action.payload.amount,
            },
           ],
         };
        }

        case 'DELETE_ITEMS':
         const data = state.cart?.filter(
         (item) => item.id !== action.payload.id
         );
         return {
           ...state,
           cart: data,
        };

        case "CREATE_REVIEW":
         return {
           ...state,
           reviews: [...state.reviews, action.payload],
        };

        case "GET_ORDERS":
         return {
           ...state,
           orders: action.payload,
        };

        case "GET_ORDER_DETAIL":
         return {
          ...state,
          orderDetail: action.payload,
        };

        default:
        return {...state};
     }
}

    