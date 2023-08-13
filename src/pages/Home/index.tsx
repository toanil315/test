import { Editor } from '@/components/Editor';
import { DatePicker } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Editor />
    </div>
  );
};

export default Home;
