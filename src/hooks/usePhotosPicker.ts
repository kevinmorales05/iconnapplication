import { useState, useEffect, useCallback } from 'react';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary
} from 'react-native-image-picker';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';

import storage from '@react-native-firebase/storage';
import { authServices } from 'services';

export default function usePhotosPicker(
  selectionLimit: number | undefined,
  bucketPath: string
) {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const loader = useLoading();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | undefined>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const updatePhoto = async (url: string) => {
    loader.show();
    try {
      await authServices.putUser({ ...user, photo: url });
    } catch (error) {
      console.warn(error);
    } finally {
      loader.hide();
    }
  };

  useEffect(() => {
    (async () => {
      setAssets(response?.assets || null);
    })();
  }, [response]);

  useEffect(() => {
    (async () => {
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

        await updatePhoto(url);

        setCurrentPhoto(url);
      } catch (error) {
        console.warn(error);
      } finally {
        loader.hide();
      }
    })();
  }, [assets]);

  const launch = useCallback(async () => {
    try {
      loader.show();
      await launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          includeExtra: true,
          selectionLimit
        },
        setResponse
      );
    } catch (error) {
      console.warn(error);
    } finally {
      loader.hide();
    }
  }, []);

  return { launch, currentPhoto } as const;
}
