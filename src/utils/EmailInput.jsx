import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/Teste.css'

const EmailInput = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

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

  return (
    <>
      {items.map(item => (
        <div className="tag-item" key={item.id}>
          <div className='item-email'>{item.email}</div>
          <button className="button-test" onClick={(evt) => handleDelete(evt, item.id)}>
            &times;
          </button>
        </div>
      ))}

      <input
        className={"input-test " + (error && " has-error")}
        value={value}
        placeholder="Digite ou cole endereços de email e pressione `Enter`..."
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onPaste={handlePaste}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default EmailInput;
