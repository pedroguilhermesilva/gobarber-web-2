import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

//type is equal the an interface, but as ButtonProps is empty we can use type for this.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
