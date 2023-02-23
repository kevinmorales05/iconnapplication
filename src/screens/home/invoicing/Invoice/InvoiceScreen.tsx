import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CardBilling, TaxInfoCard, AnnounceItem, CardAction } from 'components';
import theme from 'components/theme/theme';
import { InvoicingProfileInterface, RootState, useAppSelector } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InvoiceModal from 'screens/home/InvoiceModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { logEvent } from 'utils/analytics';
import { modulesBilling, modulesRemoteConfig } from '../../../../common/modulesRemoteConfig';
import { getStatusModule } from 'utils/modulesApp';
import { useNotEnabledModal } from 'context/notEnabled.context';

interface Props {
  onSubmit: () => void;
  invoicingProfileList: InvoicingProfileInterface[];
  defaultProfile: InvoicingProfileInterface | null;
  resendEmail: () => void;
  goToAddTicketPetro: () => void;
  goToAddTicketSeven: () => void;
}

const InvoiceScreen: React.FC<Props> = ({ onSubmit, invoicingProfileList, defaultProfile, resendEmail, goToAddTicketPetro, goToAddTicketSeven }) => {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { appModules } = useAppSelector((state: RootState) => state.app);

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const modalNotEnabled = useNotEnabledModal();

  const petroFlag: boolean | undefined = getStatusModule(appModules ? appModules : [], modulesRemoteConfig.billing, modulesBilling.petroSevenBilling);
  const sevenFlag: boolean | undefined = getStatusModule(appModules ? appModules : [], modulesRemoteConfig.billing, modulesBilling.sevenElevenBilling);

  const sevenFlagDisable: boolean = sevenFlag ? invoicingProfileList.length === 0 || defaultProfile?.verified_mail === false : true;
  const petroFlagDisable: boolean = petroFlag ? invoicingProfileList.length === 0 || defaultProfile?.verified_mail === false : true;

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16
      }}
    >
      <TextContainer typography="h2" fontBold text="Datos fiscales" marginTop={20} marginBottom={8} />

      {defaultProfile ? (
        <>
          <TaxInfoCard
            rfc={defaultProfile.rfc}
            name={defaultProfile.business_name}
            onPress={() => {
              setVisible(true);
            }}
            withExchange
          />
          {!defaultProfile.verified_mail && (
            <AnnounceItem
              message="Verifica tu correo para facturar"
              withActionButton
              ActionButtonText="Enviar correo de verificación"
              icon={<AntDesign name="warning" size={25} color={theme.brandColor.iconn_white} />}
              onPressActionButton={resendEmail}
            />
          )}
          <Container style={{ marginTop: 36 }}>
            <CardAction
              text="Historial de Facturas"
              onPress={() => {
                navigate('InvoiceHistory');
                logEvent('invOpenInvoicingHistory', {
                  id: user.id,
                  description: 'Abrir historial de facturas'
                });
              }}
              icon={<AntDesign name="copy1" size={25} color={theme.brandColor.iconn_accent_secondary} />}
            />
          </Container>
        </>
      ) : (
        <>
          <Container
            backgroundColor={theme.brandColor.iconn_white}
            height={90}
            style={{ paddingHorizontal: 16, borderTopStartRadius: 8, borderTopEndRadius: 8, marginTop: 4 }}
          >
            <Button length="long" round onPress={onSubmit} fontSize="h4" fontBold marginTop={16}>
              Crear perfil fiscal
            </Button>
          </Container>
          <Container backgroundColor={'#DDE8F3'} center crossCenter height={58} style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
            <TextContainer text="Deberás verificar tu correo para facturar." />
          </Container>
        </>
      )}

      <Container style={{ marginTop: 34 }}>
        <TextContainer text="Nueva Factura" typography="h3" fontBold />
      </Container>
      <Container style={{ marginTop: 18 }}>
        <CardBilling
          text="Facturar ticket"
          type="seven"
          disable={sevenFlagDisable}
          onPress={() => (sevenFlagDisable ? modalNotEnabled.show() : goToAddTicketSeven())}
        />
      </Container>
      <Container style={{ marginTop: 8 }}>
        <CardBilling
          text="Facturar ticket"
          type="petro"
          disable={petroFlagDisable}
          onPress={() => (petroFlagDisable ? modalNotEnabled.show() : goToAddTicketPetro())}
        />
      </Container>
      <InvoiceModal
        invoicingProfileList={invoicingProfileList}
        visible={visible}
        onAdd={() => {
          navigate('AddRFC');
          setVisible(false);
        }}
        onManage={(selected: InvoicingProfileInterface | null) => {
          if (selected) {
            navigate('CreateTaxProfile', selected);
            setVisible(false);
          }
        }}
        onPressOut={() => {
          setVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default InvoiceScreen;
