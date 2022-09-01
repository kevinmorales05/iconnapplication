import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Container } from 'components/atoms';
import { TextContainer } from '../TextContainer';
import theme from 'components/theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InvoicingPetroTicketResponseInterface, InvoicingSevenTicketResponseInterface } from 'rtk';

interface ListSwipeableItemProps {
  ticketSeven?: InvoicingSevenTicketResponseInterface;
  ticketPetro?: InvoicingPetroTicketResponseInterface;
  onPressEdit: (ticket: any, position: number) => any;
  onPressDelete: (ticket: any, position: number) => any;
  index: number;
  rowRefs: any;
}

const ListSwipeableItem: React.FC<ListSwipeableItemProps> = ({
  onPressEdit,
  onPressDelete,
  ticketSeven,
  ticketPetro,
  index,
  rowRefs
}: ListSwipeableItemProps): any => {
  const item: StyleProp<ViewStyle> = {
    height: 68,
    paddingLeft: 16,
    paddingRight: 26,
    marginBottom: 4
  };

  const rightAction: StyleProp<ViewStyle> = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  };

  const renderRightAction = (buttonType: string, backgroundColor: any) => {
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        {buttonType === 'edit' ? (
          <RectButton
            style={[rightAction, { backgroundColor: backgroundColor }]}
            onPress={() => {
              closeRow(index);
              onPressEdit(ticketSeven ? ticketSeven : ticketPetro, index);
            }}
          >
            <Container middle>
              <Octicons name="pencil" size={theme.iconSize.xsmall} color={theme.brandColor.iconn_white} />
              <TextContainer fontBold text="Editar" textColor={theme.fontColor.white} fontSize={theme.fontSize.h6} marginTop={4} />
            </Container>
          </RectButton>
        ) : (
          <RectButton
            style={[rightAction, { backgroundColor: backgroundColor }]}
            onPress={() => {
              closeRow(index);
              setTimeout(() => {
                onPressDelete(ticketSeven ? ticketSeven : ticketPetro, index);
              }, 500);
            }}
          >
            <Container middle>
              <Ionicons name="md-trash-outline" size={theme.iconSize.xsmall} color={theme.brandColor.iconn_white} />
              <TextContainer fontBold text="Borrar" textColor={theme.fontColor.white} fontSize={theme.fontSize.h6} marginTop={4} />
            </Container>
          </RectButton>
        )}
      </Animated.View>
    );
  };

  const renderRightActions = () => (
    <Container row style={{ width: 120 }}>
      {renderRightAction('edit', theme.brandColor.iconn_grey)}
      {renderRightAction('delete', theme.brandColor.iconn_red_original)}
    </Container>
  );

  const closeRow = (idx: number) => {
    [...rowRefs.entries()].forEach(([key, ref]) => {
      if (key === idx && ref) ref.close();
    });
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        overshootLeft={true}
        ref={ref => {
          if (ref && !rowRefs.get(index)) {
            rowRefs.set(index, ref);
          }
        }}
        onSwipeableWillOpen={() => {
          [...rowRefs.entries()].forEach(([key, ref]) => {
            if (key !== index && ref) ref.close();
          });
        }}
      >
        <Container row center style={item} backgroundColor={theme.brandColor.iconn_white} space={ticketSeven ? 'between' : 'around'}>
          {ticketSeven ? (
            <>
              <TextContainer text={ticketSeven!.ticketNo} fontSize={12} />
              <TextContainer text={`$${ticketSeven!.ticketTotal}`} textColor={theme.fontColor.dark_orange} fontSize={12} fontBold />
            </>
          ) : (
            <>
              <TextContainer text={ticketPetro!.station} fontSize={12} />
              <TextContainer text={ticketPetro!.ticketNo} fontSize={12} />
              <TextContainer text={ticketPetro!.webId} fontSize={12} />
              <TextContainer text={`$${ticketPetro!.ticketTotal}`} textColor={theme.fontColor.dark_orange} fontSize={12} fontBold />
            </>
          )}
        </Container>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ListSwipeableItem;
