import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const Signin = () => {
  return (
    <Form className="sign-in-form">
      <h2 className="title">Entrar</h2>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label>Senha</Label>
        <Input type="password" placeholder="Senha" />
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block">
        Entrar
      </Button>
      <div className="text-center pt-3">
        Ou continue com sua conta social
      </div>
      <FacebookLoginButton className="mt-3 mb-3" />
      <GoogleLoginButton className="mt-3 mb-3" />
      <div className="text-center">
        <a href="/sign-up">Inscreva-se</a>
        <span className="p-2">|</span>
        <a href="/forgot-password">Esqueceu a Senha</a>
      </div>
    </Form>
  );
};

export default Signin;
