import React from 'react';
import BranchesScreen from './BranchesScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';
import { usePermissions } from 'context';

const BranchesController: React.FC = () => {
  const { permissions, askLocationPermission } = usePermissions();

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <BranchesScreen onPressAskPermission={askLocationPermission} permissions={permissions} />
    </SafeArea>
  );
};

export default BranchesController;
