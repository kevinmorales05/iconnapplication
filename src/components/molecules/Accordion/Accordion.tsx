import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { AccordeonItemTypeProps } from 'components/types/Accordion';
import { Container, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilterContainer from 'components/organisms/FilterContainer/FilterContainer';
import { ProductsByCategoryFilter } from 'rtk/types/category.types';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  sections: AccordeonItemTypeProps[];
  onPressFilter: (filter: ProductsByCategoryFilter) => void;
}

const AccordionFilter: React.FC<Props> = ({ sections, onPressFilter }) => {
  const [sectionsRender, setSectionsRender] = useState<AccordeonItemTypeProps[]>();

  const [activeSections, setActiveSections] = useState([0, 1]);

  const _renderSectionTitle = (section: AccordeonItemTypeProps) => {
    return <View></View>;
  };

  useEffect(() => {
    setSectionsRender(sections);
  }, []);

  const _renderHeader = (section: AccordeonItemTypeProps, index: number, isActive: boolean) => {
    return (
      <Container middle row width={'100%'} style={{ paddingVertical: moderateScale(isActive ? 1 : 15), marginTop: moderateScale(isActive ? 15 : 1) }}>
        <Container flex={1}>
          <CustomText fontSize={theme.fontSize.h5} fontWeight={'900'} text={section.sectionName} />
        </Container>
        <Container flex={1} style={{ alignItems: 'flex-end' }}>
          <MaterialIcons name={`keyboard-arrow-${isActive ? 'up' : 'down'}`} size={30} color={theme.fontColor.dark_grey} />
        </Container>
      </Container>
    );
  };

  const _renderContent = (section: AccordeonItemTypeProps, idx: number) => {
    return (
      <FilterContainer filters={section.filters} type={section.type} hasMultiCheck={section.hasMultiCheck} sectionIndex={idx} onPressFilter={onPressFilter} />
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  if (sectionsRender?.length) {
    return (
      <Accordion
        sections={sectionsRender}
        activeSections={activeSections}
        renderSectionTitle={_renderSectionTitle}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        expandMultiple={true}
      />
    );
  } else {
    return null;
  }
};

export default AccordionFilter;
