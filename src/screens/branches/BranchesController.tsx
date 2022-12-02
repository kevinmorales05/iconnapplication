import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';
import { usePermissions } from 'context';
import { POINTS } from 'assets/files';
import { getNearbyPoints } from 'utils/geolocation';
import { useLocation } from 'hooks/useLocation';
import { PointInterface } from 'rtk';
import { PointDetailSheet } from 'components';

const BranchesController: React.FC = ({ navigation, route }: any) => {
  const { permissions } = usePermissions();
  const { userLocation } = useLocation();
  const [markers, setMarkers] = useState<PointInterface[]>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);
  const [marker, setMarker] = useState<PointInterface>();

  // removing navigation header in this screen.
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get stack parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "BranchesScreen" before turn header off
      if (route.name === 'BranchesScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }
  }, [navigation, route]);

  useEffect(() => {
    const nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], POINTS as PointInterface[]);
    setMarkers(nearbyMarkers);
  }, [userLocation]);

  const onPressMarker = (marker: PointInterface) => {
    // console.log(marker);
    setHelpVisible(true);
    setMarker(marker);
  };

  /**
   * Hide helper modal.
   */
  const onPressOut = () => {
    setHelpVisible(false);
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_white} childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <BranchesScreen permissions={permissions} markers={markers!} onPressMarker={onPressMarker} />
      <PointDetailSheet marker={marker!} onPressOut={onPressOut} visible={helpVisible} />
    </SafeArea>
  );
};

export default BranchesController;
