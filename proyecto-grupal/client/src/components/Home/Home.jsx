import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import s from './Home.module.css';
import logo from "..//../img/logo.JPG";


export default function Home() {

  const dispatch = useDispatch();
  let listProducts = useSelector((state) => state.products);
  // let listCategories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(actions.getProducts());
    // dispatch(actions.getCategories());
  },
  [dispatch])

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  let indexlastGame = page * pageSize;
  let indexFirstGame = indexlastGame- pageSize;
  // let currentGames = gamesOrdered.slice(indexFirstGame, indexlastGame);

  console.log('listProducts',listProducts);
  console.log('page',page);
  console.log('pageSize',pageSize);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img src={logo} alt="LOGO" className={s.logo}/>
        <h3>CloudyBuy</h3>
        <SearchBar/>
      </div>
      
      <div className="">


      </div>

      <div className={s.productCards}>
        {
          listProducts?.map( (product) => 
          <ProductCard key={product.id} title={product.title} id={product.id} price={product.price} images={product.thumbnail} />
          )

        }
      </div>

    </div>
  );


};