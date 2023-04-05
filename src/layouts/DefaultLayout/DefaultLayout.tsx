import { Home } from '@/pages';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultLayoutContainer } from './styles';

const DefaultLayout = () => {
  return (
    <DefaultLayoutContainer>
      <Outlet />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
