import { useRoute, RouteProp, useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAlert, useLoading } from 'context';
import { WalletStackParams } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { PackageDetail, PackageVtex, RootState, TrackingHistory, useAppSelector } from 'rtk';
import { estafetaServices } from 'services/estafeta.services';
import { vtexDocsServices } from 'services/vtexdocs.services';
import PackageDetailScreen from './PackageDetailScreen';
import { logEvent } from 'utils/analytics';

const PackageDetailController: React.FC = () => {
  const loader = useLoading();
  const [trackingInfo, setTrackingInfo] = useState<PackageDetail>();
  const route = useRoute<RouteProp<WalletStackParams, 'PackageDetail'>>();
  const alert = useAlert();
  const { params } = route;
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const onDelete = async (id: string) => {
    logEvent('walRemovePacket', {
      id: user.id,
      description: 'Eliminar paquete',
      origin: 'detail'
    });
    alert.show(
      {
        title: 'Eliminar paquete',
        message: '¿Seguro que deseas eliminar el número de guía? Puedes volver a agregarlo en cualquier momento.',
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_med_grey',
        cancelTextColor: 'iconn_accent_secondary',
        onCancel() {
          alert.hide();
          logEvent('walEstafetaCancel', {
            id: user.id,
            description: 'Botón de cancelar eliminar paquete'
          });
        },
        async onAccept() {
          alert.hide();
          await vtexDocsServices.deleteDocByDocID('ET', id);
          navigate('Tracking');
          logEvent('walRemoveconfirmPacket', {
            id: user.id,
            description: 'Botón de confirmar eliminar paquete'
          });
        }
      },
      'deleteCart',
      true,
      true,
      true
    );
  };

  useEffect(() => {
    const getTracking = async () => {
      loader.show();
      var xml2js = require('xml2js');
      let data;
      let trackingHistory: TrackingHistory[] = [];
      const response = await estafetaServices.getPackageTracking(params?.packageData as string);
      var parser = new xml2js.Parser();
      parser.parseStringPromise(response).then(function (result) {
        data = result['soap:Envelope']['soap:Body'][0].ExecuteQueryResponse[0].ExecuteQueryResult[0].trackingData[0].TrackingData[0];
        if (data.history[0].History) {
          const histories = data.history[0].History;
          histories.forEach((element: any, index: any) => {
            const newStep: TrackingHistory = {
              eventDateTime: element.eventDateTime[0],
              eventDescriptionSPA: element.eventDescriptionSPA[0],
              eventPlaceName: element.eventPlaceName[0],
              isLast: index === histories.length - 1 ? true : false
            };
            trackingHistory.push(newStep);
          });
        }
        let formatData: PackageDetail = {
          shortWaybillId: data.shortWaybillId[0],
          statusENG: data.statusENG[0],
          waybill: data.waybill[0],
          trackingHistory: trackingHistory
        };
        setTrackingInfo(formatData);
        loader.hide();
        return formatData;
      });
    };
    getTracking();
  }, []);

  return <PackageDetailScreen packageInfo={trackingInfo as PackageDetail} onDelete={onDelete} packageVtex={params?.packageVtex as PackageVtex} />;
};
export default PackageDetailController;
