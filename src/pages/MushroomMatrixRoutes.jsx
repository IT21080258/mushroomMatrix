import React from 'react';
import { BrowserRouter , Route , Routes } from 'react-router-dom';


import MushroomMatrixSignIn from '../components/sign-in-and-sign-up/MushroomMatrixSignIn';
import MushroomMatrixSignUp from '../components/sign-in-and-sign-up/MushroomMatrixSignUp';

import DemandPredicitionDashboard from '../components/demand-predicition-signed-in/DemandPredicitionDashboard';
import DemandPredicitionLayout from '../components/demand-predicition-signed-in/DemandPredicitionLayout';
import DemandPredicitionProfile from '../components/demand-predicition-signed-in/DemandPredicitionProfile';

export default function MushroomMatrixRoutes() {


    return (
      <div>
  
        <BrowserRouter>
          <Routes>
  
            <Route 
            path='/' 
            element = {<MushroomMatrixSignIn/>}
            />
  
            <Route 
            path='/sign-in' 
            element = {<MushroomMatrixSignIn/>}
            />
  
            <Route 
            path='/sign-up' 
            element = {<MushroomMatrixSignUp/>}
            />
  
          </Routes>
  
        </BrowserRouter>
        
  
        {window.location.pathname.startsWith('/demand-predicition') && (
          <BrowserRouter>
            <DemandPredicitionLayout>
              <Routes>
                <Route path="/demand-predicition-dashboard" element={<DemandPredicitionDashboard />} />
                <Route path="/demand-predicition-profile" element={<DemandPredicitionProfile />} />
              </Routes>
            </DemandPredicitionLayout>
          </BrowserRouter>
        )}
        
  
      </div>
    )
  }
  