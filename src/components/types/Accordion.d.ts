import React, { ComponentType } from 'react';
import { FilterItemTypeProps } from './FilterITem';

export interface AccordeonItemTypeProps {
  sectionName: string;
  filters: FilterItemTypeProps[];
  type: string;
  hasMultiCheck: boolean;
}

export const AccordeonItemType: React.FC<AccordeonItemTypeProps>;
