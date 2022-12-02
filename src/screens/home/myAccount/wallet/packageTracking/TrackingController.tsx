import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAlert, useToast } from 'context';
import { WalletStackParams } from 'navigation/types';
import React, { useCallback, useEffect, useState } from 'react';
import { DeliveryStatus, PackageVtex, RootState, useAppSelector } from 'rtk';
import { estafetaServices } from 'services/estafeta.services';
import { vtexDocsServices } from 'services/vtexdocs.services';
import TrackingScreen from './TrackingScreen';

const TrackingController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const isFocused = useIsFocused();
  const alert = useAlert();
  const { id } = user;
  var xml2js = require('xml2js');
  const [userPackages, setUserPackages] = useState<PackageVtex[]>();
  const [barcodeField, setBarcodeField] = useState<string>('');

  const onPressHelp = () => {
    navigate('PackageHelp');
  };

  const onDelete = async (idPackage: string) => {
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
        },
        async onAccept() {
          alert.hide();
          await vtexDocsServices.deleteDocByDocID('ET', idPackage);
          getPackages();
        }
      },
      'deleteCart',
      true,
      true,
      true
    );
  };

  const OnPressDetail = async (waybill: string, packageVtex: PackageVtex) => {
    navigate('PackageDetail', { packageData: waybill, packageVtex });
  };

  const onSubmit = async (barCodeFields: any) => {
    if (userPackages && userPackages.length === 10) {
      toast.show({
        message: 'Número máximo de paquetes.',
        type: 'error'
      });
    } else {
      await getTracking(barCodeFields.barcodeNumber);
    }
  };

  const onPressScan = () => {
    navigate('CodeReader', { navigationDestiny: 'Tracking' });
  };

  const sendVtex = async (userId: string, waybill: string, status: DeliveryStatus) => {
    const data = await vtexDocsServices.createDoc('ET', { userId: userId, waybill: waybill, status: status });
    return data;
  };

  const getTracking = async (trackingNumber: string) => {
    try {
      const response = await estafetaServices.getPackageTracking(trackingNumber);
      var parser = new xml2js.Parser(/* options */);
      parser.parseStringPromise(response).then(async function (result) {
        if (result['soap:Envelope']['soap:Body'][0].ExecuteQueryResponse[0].ExecuteQueryResult[0].trackingData[0]) {
          const trackingD = result['soap:Envelope']['soap:Body'][0].ExecuteQueryResponse[0].ExecuteQueryResult[0].trackingData[0].TrackingData[0];
          await sendVtex(id as string, trackingD.waybill[0], trackingD.statusENG[0]);
          setTimeout(() => {
            setBarcodeField(trackingD.waybill[0]);
          }, 250);
        } else {
          toast.show({
            message: 'Número invalido.',
            type: 'error'
          });
        }
      });
    } catch (error) {
      //console.log('error TRACKING', error);
    }
  };

  const getPackages = useCallback(async () => {
    let packagesFormat: PackageVtex[] = [];
    const packages = await vtexDocsServices.getAllDocByUserID('ET', id as string);
    if (packages) {
      packages.forEach(element => {
        const newPackage: PackageVtex = {
          status: element.status,
          userId: element.userId,
          waybill: element.waybill,
          id: element.id
        };
        packagesFormat.push(newPackage);
      });
    }
    setUserPackages(packagesFormat);
  }, [barcodeField, getTracking]);

  useEffect(() => {
    getPackages();
  }, [id, isFocused, barcodeField]);

  return (
    <TrackingScreen
      onPressDetail={OnPressDetail}
      onSubmit={onSubmit}
      packages={userPackages as PackageVtex[]}
      onPressScan={onPressScan}
      onPressHelp={onPressHelp}
      onPressDelete={onDelete}
    />
  );
};
export default TrackingController;
