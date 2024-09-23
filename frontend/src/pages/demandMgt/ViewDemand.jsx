import React from 'react';
import CustomerDemandHeading from './CustomerDemandHeading';
import CustomerDemandVisualOne from './CustomerDemandVisualOne';
import InformationViewOne from './InformationViewOne';
import CustomerDemandForm from './CustomerDemandForm';
import ShopDemandHeadingOne from './ShopDemandHeadingOne';
import ShopDemandForm from './ShopDemandForm';
import InformationViewTwo from './InformationViewTwo';
import ShopDemandVisualOne from './ShopDemandVisualOne';
import ShopDemandVisualTwo from './ShopDemandVisualTwo';
import ShopDemandVisualThree from './ShopDemandVisualThree';
import ShopDemandVisualFour from './ShopDemandVisualFour';
import ShopDemandVisualFive from './ShopDemandVisualFive';


const ViewDemand = () => {

  return (
    
    <div>

      <div style={{ transform: 'translateX(75%) translateY(0%)' , width:'fitContent' , height:'fitContent' }}>
        <CustomerDemandHeading/>
      </div>

      <div style={{ transform: 'translateX(0%) translateY(20%)' , width:'fitContent' , height:'fitContent' }}>
        <CustomerDemandVisualOne/>
      </div>

      <div style={{ transform: 'translateX(115%) translateY(-80%)' , width:'fitContent' , height:'fitContent' }}>
        <InformationViewOne/>
      </div>

      <div style={{ transform: 'translateX(55%) translateY(-50%)' , width:'fitContent' , height:'fitContent' }}>
        <CustomerDemandForm/>
      </div>

      <div style={{ transform: 'translateX(80%) translateY(-140%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandHeadingOne/>
      </div>

      <div style={{ transform: 'translateX(0%) translateY(0%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandForm/>
      </div>
      
      <div style={{ transform: 'translateX(110%) translateY(-185%)' , width:'fitContent' , height:'fitContent' }}>
        <InformationViewTwo/>
      </div>
        
      <div style={{ transform: 'translateX(0%) translateY(-30%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandVisualOne/>
      </div>

      <div style={{ transform: 'translateX(110%) translateY(-130%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandVisualTwo/>
      </div>

      <div style={{ transform: 'translateX(55%) translateY(-110%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandVisualThree/>
      </div>

      <div style={{ transform: 'translateX(0%) translateY(-90%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandVisualFour/>
      </div>

      <div style={{ transform: 'translateX(110%) translateY(-190%)' , width:'fitContent' , height:'fitContent' }}>
        <ShopDemandVisualFive/>
      </div>



    </div>

  );
}
  
export default ViewDemand;