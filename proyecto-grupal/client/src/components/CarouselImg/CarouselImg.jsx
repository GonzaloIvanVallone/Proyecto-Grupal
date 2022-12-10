import React from 'react';
import { useSelector } from "react-redux";



export default function CarouselImg () {

  let detail = useSelector((state) => state.detail);
      
    return (
    
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{width: "700px"}}>
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={detail.images[0]} alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={detail.images[1]} alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={detail.images[2]} alt="Third slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={detail.images[3]} alt="Third slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={detail.images[4]} alt="Third slide"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
       
 
    );
};
