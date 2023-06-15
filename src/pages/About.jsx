import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../Styles/About.css'

const textStyle = {
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const AboutPage = () => {
  const [coworkingExpanded, setCoworkingExpanded] = useState(false);
  const [metodoExpanded, setMetodoExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleCoworkingExpansion = () => {
    setCoworkingExpanded(!coworkingExpanded);
  };

  const toggleMetodoExpansion = () => {
    setMetodoExpanded(!metodoExpanded);
  };

  const calculateTextStyle = (expanded) => {
    return isMobile && !expanded ? {...textStyle, WebkitLineClamp: 10} : null;
  }


   return (
    <div className='about-containers'>
      <div className={`about-coworking ${coworkingExpanded ? 'expanded' : ''}`}>
        <h1>Seja Bem-vindo a Dutra Coworking</h1>
        <p style={calculateTextStyle(coworkingExpanded)}>
        &nbsp;Imagine um local onde o potencial de sua empresa pode ser totalmente explorado e maximizado. Bem-vindo à Dutra Coworking, um centro dinâmico de inovação e progresso empresarial.&nbsp;Aqui, oferecemos quatro espaços distintos, criados meticulosamente, cada um com seu próprio propósito único - mas todos dedicados a impulsionar o sucesso do seu empreendimento.
          <br></br>
          <br></br>
          &nbsp;Seja a realização de uma reunião crucial para fechamento de negócios, a gravação de um podcast envolvente, ou a apresentação de uma palestra inspiradora em nosso auditório - a "Arena", nós garantimos que a infraestrutura e o ambiente estejam à altura das suas ambições.
          <br></br>
          <br></br>
          &nbsp;Nossos espaços para reuniões, enriquecidos com tecnologia de ponta, proporcionam um ambiente onde ideias audaciosas são geradas e negócios prósperos são moldados.&nbsp;Mas não é apenas o espaço físico que torna a Dutra Coworking única.&nbsp;É o acesso à nossa variedade de serviços de backoffice, contabilidade, jurídico e gestão empresarial que complementam e realçam a sua experiência.
          <br></br>
          <br></br>
          &nbsp;Na Dutra Coworking, não oferecemos apenas um espaço.&nbsp;Oferecemos um cenário para o crescimento e a inovação, um lugar onde a visão se transforma em realidade, e onde os empreendedores se sentem em casa.&nbsp;Descubra o potencial do seu negócio.&nbsp;Descubra a Dutra Coworking.
        </p>
        {isMobile && (
          <button onClick={toggleCoworkingExpansion} className='expand-btn'>
            {coworkingExpanded ? 'Ler Menos' : 'Ler Mais'}
          </button>
        )}
      </div>
      <div className={`about-metodo ${metodoExpanded ? 'expanded' : ''}`}>
        <h1>O que é o Método Dutra?</h1>
        <p style={calculateTextStyle(metodoExpanded)}>
        &nbsp;O Método Dutra representa mais que um conjunto de empresas; representa a realização de um sonho, o sonho de proporcionar uma trajetória ascendente a negócios que almejam o crescimento e reconhecimento no mercado.&nbsp;Este é o propósito da nossa aliança estratégica, formada por empresas independentes - Dutra Corporativo, Dutra Contabilidade, Dutra Advogados e Dutra Gestão Empresarial.&nbsp;Cada uma com suas especialidades, mas todas unidas por um propósito comum: orientar nossos clientes para o sucesso através do IPO (Oferta Pública Inicial) ou M&A (Fusões e Aquisições).
          <br></br>
          <br></br>
          &nbsp;A visão do nosso fundador, Vinicius Dutra, foi o catalisador para essa colaboração única.&nbsp;Ao perceber as divergências e desafios enfrentados pelas empresas em diversas áreas de negócio, ele teve a percepção de que unir essas competências sob o mesmo teto seria a chave para oferecer uma solução completa e eficaz.&nbsp;E assim nasceu o Método Dutra, um baluarte de cooperação, inovação e ambição, dedicado a impulsionar negócios ao patamar que eles merecem.
        </p>
        {isMobile && (
          <button onClick={toggleMetodoExpansion} className='expand-btn'>
            {metodoExpanded ? 'Ler Menos' : 'Ler Mais'}
          </button>
        )}
      </div>
    </div>
  )
};

export default AboutPage;
