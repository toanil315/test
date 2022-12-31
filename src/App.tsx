import { useState } from 'react';
import reactLogo from '@assets/react.svg';
import './App.css';

import Select, { mockData } from '@components/Select';

function App() {
  const [v, setV] = useState<number | string | undefined>();

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
      <div>
        <Select
          options={mockData}
          value={v}
          onSelect={(v) => {
            setV(() => v);
          }}
        />
      </div>
    </div>
  );
}

export default App;
