import React, { useState } from 'react';
import { Container } from '../../atoms';
import { CheckButton, RadioButton } from 'components/molecules';
import { FilterItemTypeProps } from 'components/types/FilterITem';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';

interface Props {
  filters: FilterItemTypeProps[];
  hasMultiCheck: boolean;
  type: string;
  sectionIndex: number;
  onPressFilter: (filter: ProductsByCategoryFilter) => void;
}

const FilterContainer: React.FC<Props> = ({ filters, hasMultiCheck, type, sectionIndex, onPressFilter }) => {
  const [responses, setResponses] = useState<number[]>([0]);

  const onPressItem = (optionIndex: number) => {
    if (hasMultiCheck) {
      let tem: number[] = [];
      tem = tem.concat(responses);
      const exist = tem.findIndex(filter => filter === optionIndex);
      if (exist >= 0) {
        tem.splice(exist, 1);
      } else {
        tem.push(optionIndex);
      }
      setResponses(tem);
    } else {
      onPressFilter(filters[optionIndex]?.filter);
      setResponses([optionIndex]);
    }
  };

  return (
    <Container width={'100%'}>
      {filters.map((filter, indexOption) => {
        const isSelected = responses.length ? responses.some(item => item === indexOption) : false;
        if (type === 'check') {
          return <CheckButton name={filter.name} isSelected={isSelected} onPressItem={onPressItem} optionIndex={indexOption} />;
        } else if (type === 'radio') {
          return <RadioButton name={filter.name} isSelected={isSelected} onPressItem={onPressItem} optionIndex={indexOption} />;
        }
      })}
    </Container>
  );
};

export default FilterContainer;
