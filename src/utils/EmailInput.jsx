import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/Teste.css'

const EmailInput = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const emailInputRef = useRef();

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
    const emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g);

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

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (isFocused) {
      emailInputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <div className={`tag-container`}>
        <div className={`tag-items ${isFocused ? 'expanded' : ''}`}>
          {items.map((item, index) => {
            if (!isFocused && index >= 2) {
              return null;
            }
            return (
              <div className="tag-item" key={item.id}>
                <div className='item-email'>{item.email}</div>
                <button className="button-test" onClick={(evt) => handleDelete(evt, item.id)}>
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        {!isFocused && items.length > 2 && (
          <button className="button-more" onClick={handleFocus}>
            Mais {items.length - 2}
          </button>
        )}
      </div>

      <div className="email-area">
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
};

export default EmailInput;