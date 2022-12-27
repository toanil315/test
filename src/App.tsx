/** @format */

import reactLogo from '@assets/react.svg';
import './App.css';
import { Cube } from '@components/3Ds/Cube';
import { CommonCanvas } from '@components/3Ds/CommonCanvas';
import { ReactiveCube } from '@components/3Ds/Cube/variants/ReactiveCube';

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
        <Cube initialRotate={true} />
        <ReactiveCube
          color='lightgreen'
          position={[2, 0, 0]}
        />
      </CommonCanvas>
    </div>
  );
}

export default App;
