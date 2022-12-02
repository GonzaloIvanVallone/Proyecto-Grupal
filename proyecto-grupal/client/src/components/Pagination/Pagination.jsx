import React from "react";
import s from './Pagination.module.css';


export default function Pagination({pageSize, totalProducts, page, pagination}) {
  const pageNumbers= [];

  for (let i = 1; i <= Math.ceil(totalProducts/pageSize); i++) {
    pageNumbers.push(i);  
  }

  let lastPage = Math.ceil(totalProducts/pageSize);

  return (
    <div className={s.pagination}>
      { page > 1 && 
        <button className={s.btns1} onClick={()=> pagination('back')}>{'< Anterior'}</button>
      }
      <div><input className={s.page} type="number" value={page} readOnly/></div>
      <div><span className={s.p_page} >de:</span></div>
      <div><input className={s.page} type="number" value={lastPage} readOnly/></div>
      { page < lastPage && 
        <button className={s.btns1} onClick={()=> pagination('next')}>{'Siguiente >'}</button>
      }
    </div>
  )
  
}