import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar';
import Footerbar from '../components/FooterBar';
import { AppWrapper, ContentWrapper } from './Homepage.styles';
import Journeys from './journeys/Journeys';
import Stations from './stations/Stations';
import Home from './home/Home';
import StationPage from './station/StationPage';

const HomePage = () => {
  return (
    <AppWrapper>
      <CustomAppBar />
      <ContentWrapper>
        <Routes>
          <Route path="/stations/:id" element={<StationPage />}/>
          <Route path="/stations" element={<Stations />}/>
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ContentWrapper>
      <Footerbar />
    </AppWrapper>
  );
};

export default HomePage;