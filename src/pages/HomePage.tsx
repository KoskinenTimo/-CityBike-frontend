import React from 'react';
import CustomAppBar from '../components/CustomAppBar';
import Footerbar from '../components/FooterBar';
import { AppWrapper, ContentWrapper } from './Homepage.styles';
import Stations from './stations/Stations';

const HomePage = () => {
  return (
    <AppWrapper>
      <CustomAppBar />
      <ContentWrapper>
        <Stations />
      </ContentWrapper>
      <Footerbar />
    </AppWrapper>
  )
}

export default HomePage;