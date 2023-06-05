import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/SlideEmail.css'

const EmailInput = forwardRef((props, ref) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const emailInputRef = useRef();
  const { onChange = () => {} } = props;
  
  useImperativeHandle(ref, () => ({
    getEmails: () => items.map(item => item.email),
    clear: () => setItems([]),
  }));

  const handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      let valueTrimmed = value.trim();

      if (valueTrimmed && isValid(valueTrimmed)) {
        setItems([...items, { id: uuidv4(), email: valueTrimmed }]);
        setValue('');
      }
    }
  };

  const handleChange = evt => {
    setValue(evt.target.value);
    setError(null);
  };

  const handleDelete = (evt, id) => {
    evt.stopPropagation();
    setItems(items.filter(item => item.id !== id));
  };

  const handlePaste = evt => {
    evt.preventDefault();

    const paste = evt.clipboardData.getData("text");
    const emails = paste.match(/[\w\dç.-]+@[\w\dç.-]+\.[\w\dç.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter(email => !isInList(email));
      setItems([...items, ...toBeAdded.map(email => ({ id: uuidv4(), email }))]);
    }
  };

  const isValid = email => {
    let error = null;

    if (isInList(email)) {
      error = `${email} já foi adicionado.`;
    }

    if (!isEmail(email)) {
      error = `${email} não é um endereço de email válido.`;
    }

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  const isInList = email => items.some(item => item.email === email);

  const isEmail = (email) => {
    return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    onChange(items.map(item => item.email));
  }, [items, onChange]);

  useEffect(() => {
    if (isFocused) {
      emailInputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <div className={`tag-container`}>
        <div className={`tag-items ${showAll ? 'expanded' : ''}`}>
          {items.map((item, index) => {
            if (!(showAll || isFocused)  && index >= 2) {
              return null;
            }
            return (
              <div className={`tag-item ${item.id === isHovered ? 'hovered' : ''}`} key={item.id}>
                <div className='item-email'>{item.email}</div>
                <button className="deleteEmail-button"
                  onMouseEnter={() => setIsHovered(item.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={(evt) => handleDelete(evt, item.id)}>
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        {!isFocused && items.length > 2 && (
          <div className="moreBtn-container">
            <button className="seeMore-button" onClick={toggleShowAll}>
              {showAll ? 'Menos' : `Mais ${items.length - 2}`}
            </button>
          </div>
        )}
      </div>
      <div className="email-area">
        <p>Quem irá participar?<span> (incluir você)*</span></p>
        <input
          ref={emailInputRef}
          className="panel-email"
          value={value}
          placeholder="Digite o email dos participantes..."
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <p className="error-message">{error ? error : ''}</p>
      </div>
    </>
  );
});

export default EmailInput;