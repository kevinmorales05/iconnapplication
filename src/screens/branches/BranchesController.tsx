import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';
import { usePermissions } from 'context';

const BranchesController: React.FC = () => {
  const { permissions } = usePermissions();

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background} childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <BranchesScreen onPress={() => {}} permissions={permissions} />
    </SafeArea>
  );
};

export default BranchesController;
