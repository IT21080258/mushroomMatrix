import React from 'react';

import MushroomTypeDisplay from './MushroomTypeDisplay';

import CustomerDemandHeading from './CustomerDemandHeading';
import CustomerDemandByWeightForm from './CustomerDemandByWeightForm';
import CustomerDemandByWeight from './CustomerDemandByWeight';

import ShopDemandHeadingOne from './ShopDemandHeadingOne';
import ShopDemandByPacketsFormAom from './ShopDemandByPacketsFormAom';
import ShopDemandByPacketsCurrentAom from './ShopDemandByPacketsCurrentAom';
import ShopDemandByPacketsFollowingAom from './ShopDemandByPacketsFollowingAom';

import ShopDemandByPacketsFormAm from './ShopDemandByPacketsFormAm';
import ShopDemandByPacketsCurrentAm from './ShopDemandByPacketsCurrentAm';
import ShopDemandByPacketsFollowingAm from './ShopDemandByPacketsFollowingAm';


const ViewDemand = () => {

    return (
      <div>

        <div style={{ transform: 'translateX(0%) translateY(0%)' , width:'fitContent' , height:'fitContent' }}>
          <CustomerDemandHeading/>
        </div>

        <div style={{ transform: 'translateX(0%) translateY(20%)' , width:'fitContent' , height:'fitContent' }}>
          <CustomerDemandByWeight/>
        </div>

        <div style={{ transform: 'translateX(115%) translateY(-80%)' , width:'fitContent' , height:'fitContent' }}>
          <MushroomTypeDisplay/>
        </div>

        <div style={{ transform: 'translateX(55%) translateY(-50%)' , width:'fitContent' , height:'fitContent' }}>
          <CustomerDemandByWeightForm/>
        </div>

        <div style={{ transform: 'translateX(80%) translateY(-140%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandHeadingOne/>
        </div>

        <div style={{ transform: 'translateX(-24%) translateY(0%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsCurrentAom/>
        </div>

        <div style={{ transform: 'translateX(35%) translateY(-100%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsFollowingAom/>
        </div>

        <div style={{ transform: 'translateX(112%) translateY(-225%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsFormAom/>
        </div>

        <div style={{ transform: 'translateX(-10%) translateY(-185%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsFormAm/>
        </div>

        <div style={{ transform: 'translateX(66%) translateY(-250%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsCurrentAm/>
        </div>

        <div style={{ transform: 'translateX(125%) translateY(-350%)' , width:'fitContent' , height:'fitContent' }}>
          <ShopDemandByPacketsFollowingAm/>
        </div>

      </div>
    );
  }
  
export default ViewDemand;