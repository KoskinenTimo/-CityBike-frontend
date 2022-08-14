import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar';
import Footerbar from '../components/FooterBar';
import { AppWrapper, ContentWrapper } from './Homepage.styles';
import Stations from './stations/Stations';

const HomePage = () => {
  return (
    <AppWrapper>
      <CustomAppBar />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Stations />}/>
        </Routes>
      </ContentWrapper>
      <Footerbar />
    </AppWrapper>
  )
}

export default HomePage;