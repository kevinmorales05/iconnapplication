import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import BranchesScreen from './BranchesScreen';
import theme from 'components/theme/theme';
import { usePermissions } from 'context';
import { POINTS } from 'assets/files';
import { getNearbyPoints } from 'utils/geolocation';
import { useLocation } from 'hooks/useLocation';
import { PointInterface } from 'rtk';

const BranchesController: React.FC = () => {
  const { permissions } = usePermissions();
  const { userLocation } = useLocation();
  const [markers, setMarkers] = useState<PointInterface[]>();

  useEffect(() => {
    const nearbyMarkers = getNearbyPoints([userLocation?.latitude!, userLocation?.longitude!], POINTS as PointInterface[]);
    setMarkers(nearbyMarkers);
  }, [userLocation]);

  const onPressMarker = (marker: PointInterface) => {
    // console.log(marker);
    marker;
  };

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background} childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <BranchesScreen permissions={permissions} markers={markers!} onPressMarker={onPressMarker} />
    </SafeArea>
  );
};

export default BranchesController;
