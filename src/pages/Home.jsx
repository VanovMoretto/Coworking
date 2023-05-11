import React from 'react';
import SliderContainer from '../components/HomeComps/SliderContainer';
import InfoContainer from '../components/HomeComps/InfoContainer';
import '../Styles/Home.css'

const HomePage = () => {
  return (
    <div className='home-main'>
      <div className="home-header">
        <h3 className='title-method'>MÉTODO DUTRA</h3>
        <h1 className='title-coworking'>COWORKING</h1>
        <h2 className='title-bookings'>RESERVAS</h2>
      </div>
      <SliderContainer>
        <InfoContainer img='arena' txt='arenatxt' btnRoute='/reservas' btnTxt='Reserve já!'/>
        <InfoContainer img='metodo' txt='metodotxt'btnRoute='/about' btnTxt='Saiba mais...' />
      </SliderContainer>
    </div>
  )
};

export default HomePage;