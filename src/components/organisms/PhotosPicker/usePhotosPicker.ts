import { useState, useEffect, useCallback } from 'react';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useLoading, useToast } from 'context';
import { RootState, useAppSelector, useAppDispatch, setPhoto } from 'rtk';

import storage from '@react-native-firebase/storage';
import { authServices } from 'services';

export enum PhotosPickerMode {
  CAMERA = 'CAMERA',
  LIBRARY = 'LIBRARY'
}

export default function usePhotosPicker(
  selectionLimit: number | undefined,
  bucketPath: string,
  onFinish: () => void
) {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const loader = useLoading();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | undefined>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setAssets(response?.assets || null);
    })();
  }, [response]);

  useEffect(() => {
    (async () => {
      onFinish();
      loader.show();
      try {
        // local reference
        if (!assets) return;
        if (assets.length < 1) return;

        const { fileName } = assets[0];
        const { uri } = assets[0];

        if (!fileName || !uri) return;

        const reference = storage().ref(bucketPath);

        // storage bucket reference
        await reference.putFile(uri);

        // get download url file
        const url = await storage().ref(bucketPath).getDownloadURL();

        await authServices.putUser({ ...user, photo: url });
        
        dispatch(
          setPhoto({
            photo: url,
          })
        );
        
        toast.show({
          message: 'Datos guardados exitosamente.',
          type: 'success'
        });
      } catch (error) {
        toast.show({
          message: 'No se pudo guardar tu foto, intenta mas tarde',
          type: 'error'
        });
      } finally {
        loader.hide();
      }
    })();
  }, [assets]);

  const launch = useCallback(async (mode: PhotosPickerMode) => {
    if (mode === PhotosPickerMode.LIBRARY) {
      try {
        loader.show();
        const response = await launchImageLibrary({
          mediaType: 'photo',
          includeBase64: false,
          includeExtra: true,
          selectionLimit
        });

        setResponse(response);
      } catch (error) {
        toast.show({
          message: 'No se pudo guardar tu foto,\n intenta mas tarde',
          type: 'error'
        });
      } finally {
        loader.hide();
      }
    }

    if (mode === PhotosPickerMode.CAMERA) {
      try {
        const response = await launchCamera({
          mediaType: 'photo',
          includeBase64: false,
          includeExtra: true
        });

        setResponse(response);
      } catch (error) {
        toast.show({
          message: 'No se pudo guardar tu foto,\n intenta mas tarde',
          type: 'error'
        });
      } finally {
      }
    }
  }, []);

  return { launch, currentPhoto } as const;
}
