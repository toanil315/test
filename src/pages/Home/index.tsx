import { DatePicker } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('helloWorld')}
      <div>
        <DatePicker />
      </div>
    </div>
  );
};

export default Home;
