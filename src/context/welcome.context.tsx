import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { WelcomeModal } from 'components/organisms/ModalWelcome';
import { RootState, setSeenCarousel, useAppDispatch, useAppSelector } from 'rtk';
import { vtexDocsServices } from 'services';

export interface WelcomeModalInterface {
  visible?: boolean;
}

interface WelcomeModalContextInterface {
  show: (data?: WelcomeModalInterface) => void;
  hide: () => void;
}

interface ImagesWelcomeLogin {
  id: string;
  index: number;
  description: string;
  imageURL: string;
  isActive: boolean;
}

interface Props {
  children: ReactNode;
}

export const WelcomeModalContext = React.createContext<WelcomeModalContextInterface>({} as WelcomeModalContextInterface);

const initialState: WelcomeModalInterface = { visible: false };

export const WelcomeModalContextProvider = ({ children }: Props) => {
  const [WelcomeModalState, setWelcomeModalState] = useState<WelcomeModalInterface>(initialState);
  const [imageToRender, setImagesToRender] = useState<ImagesWelcomeLogin[]>([]);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const images: ImagesWelcomeLogin[] = await vtexDocsServices.getImagesWelcomeLogin();
      const imagesTem: ImagesWelcomeLogin[] = images.filter(image => image.isActive);
      if (imagesTem.length) {
        setImagesToRender(imagesTem);
      }
    } catch {
      // onPressOut();
    }
  };

  const show = async () => {
    if(imageToRender.length){
      setWelcomeModalState({ visible: true });
    }
  };

  const hide = () => {
    setWelcomeModalState(initialState);
  };

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <WelcomeModalContext.Provider value={value}>
      {children}
      {WelcomeModalState.visible && (
        <WelcomeModal
          visible={WelcomeModalState.visible}
          userName={user.name}
          imageToRender={imageToRender}
          onPressOut={() => {
            dispatch(setSeenCarousel(true));
            setWelcomeModalState(initialState);
          }}
        />
      )}
    </WelcomeModalContext.Provider>
  );
};

export const useWelcomeModal = () => React.useContext(WelcomeModalContext);
