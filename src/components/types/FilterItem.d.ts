import React, { ComponentType } from 'react';

export interface FilterItemTypeProps {
  name: string;
  filter: ProductsByCategoryFilter;
}

export const FilterItemType: React.FC<FilterItemTypeProps>;
