import { Container } from 'components/atoms';
import { TypographyTypes } from 'components/types/typography-type';
import React from 'react';
import { TextContainer } from '../TextContainer';
import styles from './styles';

interface Props {
  isSelect: boolean;
  text: string;
  fontSize: TypographyTypes;
}

const PillContainer = ({ isSelect, text, fontSize }: Props) => {
  return (
    <Container style={isSelect ? styles.containerSelect : styles.container}>
      <TextContainer typography={fontSize} text={text} />
    </Container>
  );
};

export default PillContainer;
