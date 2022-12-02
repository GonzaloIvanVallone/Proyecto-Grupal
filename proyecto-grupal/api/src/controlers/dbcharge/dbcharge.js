const { Category } = require('../../db');
const { Product } = require('../../db');
const axios = require('axios');
const {apiArray} = require('./productfix')

const storeAllProducts = async () =>{
    try{
        for (let i = 0; i < apiArray.length; i++) {
            let nuevo = await Product.create(apiArray[i]);
            let nuevaCat = await Category.findOne({where:{name: apiArray[i].categories}});
            await nuevo.addCategory(nuevaCat);
        }
        console.log('Products correctly stored into the DB');
    }catch(error){
        console.log(error)
    }
}

const storeAllCategories = async () =>{
    try{
        const apiUrl = await axios.get('https://dummyjson.com/products/categories');
        const apiInfo = await apiUrl.data.map((e, index) => {
            return {
                id: index,
                name: e,
            }
        });
        await Category.bulkCreate(apiInfo);
        console.log('Categories correctly stored into the DB');
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    storeAllCategories,
    storeAllProducts,
}