/** @format */

import reactLogo from '@assets/react.svg';
import './App.css';
import { Cube } from '@components/3Ds/Cube';
import { Plannet } from '@components/3Ds/Plannet';
import { CommonCanvas } from '@components/3Ds/CommonCanvas';
import { ReactiveCube } from '@components/3Ds/Cube/variants/ReactiveCube';
import { PlannetSystem } from '@components/3Ds/PlannetSystem';

function App() {
  return (
    <div className='App'>
      <div>
        <img
          src='/vite.svg'
          className='logo'
          alt='Vite logo'
        />

        <img
          src={reactLogo}
          className='logo react'
          alt='React logo'
        />
      </div>

      <CommonCanvas>
        {/* <Cube initialRotate={true} />
        <ReactiveCube
          color='lightgreen'
          position={[2, 0, 0]}
        />
        <Plannet
          color='lightgreen'
          position={[4, 0, 0]}
        /> */}

        <PlannetSystem
          mainPlannet={{
            color: 'lightgreen',
            position: [0, 0, 0],
          }}
          satelliteList={[
            // {
            //   orbit: {
            //     a: 3,
            //     b: 3,
            //   },
            //   object: {
            //     color: 'red',
            //   },
            // },
            {
              orbit: {
                a: 7,
                b: 3,
              },
              object: {
                color: 'blue',
              },
            },
          ]}
        />
      </CommonCanvas>
    </div>
  );
}

export default App;
