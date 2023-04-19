import { CustomModal, Container, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface ModalProps {
  visible: boolean;
  onPressClose: () => void;
}

const MoreDetailModal: React.FC<ModalProps> = ({ visible, onPressClose }) => {
  return (
    <CustomModal visible={visible} animationType={'slide'}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: theme.brandColor.iconn_light_grey,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: '100%',
            padding: 16,
            maxHeight: '80%'
          }}
        >
          <Touchable onPress={onPressClose}>
            <AntDesign name="close" size={24} style={{ alignSelf: 'flex-end' }} />
          </Touchable>
          <TextContainer
            text="Porque agradecemos tu lealtad, por cada seis que acumules"
            fontBold
            fontSize={16}
            marginLeft={16}
            marginRight={80}
            marginTop={20}
          />
          <TextContainer text="¡el séptimo es gratis!" textColor={theme.brandColor.iconn_green_original} fontBold fontSize={18} marginLeft={16} marginTop={4} />
          <TextContainer
            text="Cada vez que acumules 6 compras, tu siguiente Café Select será gratis, ya sea al momento o en tu próxima visita."
            fontSize={14}
            marginRight={16}
            marginLeft={16}
            marginTop={24}
          />
          <TextContainer text="Máximo 7 acumulación por día." fontSize={14} marginRight={16} marginLeft={16} marginTop={24} />
          <TextContainer
            text="Promoción válida en todas las tiendas 7-Eleven del país. No válido con otras promociones. El relleno gratis de los lunes no acumula para esta promoción."
            fontSize={14}
            marginRight={16}
            marginLeft={16}
          />
          <TextContainer
            text="Promoción válida al 31 de diciembre de 2022 en vasos y rellenos de Café Select de 12 hasta 20 oz de jarra o capuchinera."
            fontSize={12}
            marginRight={16}
            marginLeft={16}
            marginTop={32}
            marginBottom={40}
          />
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};
export default MoreDetailModal;
