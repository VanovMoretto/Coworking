import '../Styles/Texts.css'

const Texts = {
    arenatxt: (
        <div className="div-txt">
            <h4>Descubra</h4>
            <h4>a</h4>
            <h2 style={{ color: '#34cad2'}}>Arena</h2>
            <p className='body-txt'>
                &nbsp;Um espaço único de inspiração e aprendizado.
                A <span style={{ color: '#34cad2' }}>&nbsp;Arena</span> é o cenário perfeito para uma experiência de conhecimento inesquecível.
                Este é o lugar onde ideias ganham vida. Venha, experimente e seja inspirado.
            </p>
        </div>
    ),
    metodotxt: (
        <div className='txt2'>
            <p className='txt2' style={{margin: '10px'}}>Você já conhece o <span style={{color: '#34cad2'}}>&nbsp;Método Dutra</span>?</p>
            <p className='p-metodo' style={{margin: '10px'}}>Que tal conhecer um pouco mais sobre o método de sucesso?</p>
        </div>
    )
};

export default Texts;
