import React from 'react';

import DemandBarChart from './DemandBarChart';
import DemandPieChart from './DemandPieChart';
import DemandAxisGridChart from './DemandAxisGridChart';

const DemandPredicitionDashboard = () => {

  return (
    <div>

      {
      
      /*
      <div style={{ marginTop: 10, marginBottom : 30, marginLeft: 300, marginRight: 10 }}>
        <DemandBarChart/>
      </div>

      <div style={{ marginTop: 10, marginBottom : 30, marginLeft: 350, marginRight: 10 }}>
        <DemandPieChart/>
      </div>

      */

      }

      <div style={{ transform: 'translateX(8%) translateY(10%)' , width:'fitContent' , height:'fitContent' }}>
        <DemandBarChart/>
      </div>

      <div style={{ transform: 'translateX(23%) translateY(16%)' }}>
        <DemandAxisGridChart/>
      </div>

      <div style={{ transform: 'translateX(50%) translateY(-100%)' }}>
        <DemandPieChart/>
      </div>

      
    </div>
  );
}

export default DemandPredicitionDashboard;