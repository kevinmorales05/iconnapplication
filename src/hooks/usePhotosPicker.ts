import { useState, useEffect, useCallback } from 'react';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary
} from 'react-native-image-picker';
import { useLoading } from 'context';

export default function usePhotosPicker(selectionLimit: number | undefined) {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const loader = useLoading();

  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  useEffect(() => {
    (async () => {
      setAssets(response?.assets || null);
    })();
  }, [response]);

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

  return { launch, assets } as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
