import React from 'react';
import SliderContainer from '../components/HomeComps/SliderContainer';
import InfoContainer from '../components/HomeComps/InfoContainer';
import AboutPage from './About';
import '../Styles/Home.css'

const HomePage = () => {
  return (
    <div className='home-main'>
      <div className="home-header">
        <h3 className='title-method'>DUTRA</h3>
        <h1 className='title-coworking'>COWORKING</h1>
        <h2 className='title-bookings'>RESERVAS</h2>
      </div>
      <SliderContainer>
        <InfoContainer img='arena' txt='arenatxt' btnRoute='/arena' btnTxt='Reserve já!' />
        <InfoContainer img='metodo' txt='metodotxt' target='_blank' rel="noopener noreferrer" btnRoute='https://www.metododutra.com.br/' btnTxt='Saiba mais...' />
      </SliderContainer>
      <div id="about">
        <AboutPage />
      </div>
    </div>
  )
};

export default HomePage;