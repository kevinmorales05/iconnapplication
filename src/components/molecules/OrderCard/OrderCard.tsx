import React, { useCallback, useEffect, useState } from "react";
import theme from 'components/theme/theme';
import { Container, Touchable } from "components/atoms";
import { TextContainer } from "../TextContainer";
import { Image, StyleSheet } from "react-native";
import {ICONN_SHOPPING_BAG, ICONN_STORE_MODERN, ICONN_ITEM_REFRESH, ICONN_LEFT_ARROW} from 'assets/images';
import Icon from "react-native-vector-icons/Entypo";
import { OrderInterface } from "rtk";
import { vtexsingleOrdersServices } from "services/vtexsingleorder.services";
import { formatDate, formatDate2 } from "utils/functions";


const OrderCard = (props: OrderInterface) => {
    const { status, creationDate, orderId, totalItems, totalValue, orderIsComplete } = props;
    const newDate = ( date: string) => {
      const formatDay = new Date(date);
      return formatDate2(formatDay);
    }
    console.log('ESTE ES EL ORDER ID', orderId);
    console.log('ESTE ES EL ORDER ID', typeof(orderId) );
    const [delivery, setDelivery] = useState();
    
    useEffect(() => {
      try {
        vtexsingleOrdersServices.getOrderById(orderId).then(response => {
          setDelivery(response.shippingData.logisticsInfo[1].selectedDeliveryChannel);
          console.log('RESPONSE ORDER', JSON.stringify(response.shippingData.logisticsInfo[1].selectedDeliveryChannel) );
        })
      } catch (error) {
        console.log(error)    }
    }, [delivery])
    
    return (
        <Container style={styles.backgroundCard} >
            <Container row space="around">
              <Container style={styles.iconDelivery}>
               {
                delivery == 'delivery' ? <Image source={ICONN_SHOPPING_BAG} style={{height: 24, width: 24}} /> : <Image source={ICONN_STORE_MODERN} style={{height: 24, width: 24}} />
               }
              </Container>
            
               {
                delivery == 'delivery' ? <TextContainer text="Envío a domicilio" marginTop={16} marginLeft={8} fontBold/> : <TextContainer text="Pickup en tienda" fontBold marginTop={16} marginLeft={8} />
               }
               {
              <Container style = {(status == 'waiting-for-sellers-confirmation' || status == 'payment-pending' || status == 'payment-approved' || status == 'ready-for-handling' || status == 'window-to-cancel' || status == 'handling') ?  styles.contInTransit : styles.contDelivered}>
                    {
                      (status == 'waiting-for-sellers-confirmation' || status == 'payment-pending' || status == 'payment-approved' || status == 'ready-for-handling' || status == 'window-to-cancel' ) ? 
                      <TextContainer text="Preparando Pedido" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12}/> 
                      : (status == 'handling') ? <TextContainer text="Pedido enviado" marginHorizontal={16} marginVertical={8} textColor={theme.fontColor.white} fontSize={12}/> 
                      : (status == 'invoiced') ? <TextContainer text="Entregado" marginHorizontal={16} marginVertical={8} fontSize={12}/> 
                      : <TextContainer text="Cancelado" marginHorizontal={16} marginVertical={8} fontSize={12}/>
                    }
                    
              </Container>
               }
            </Container> 
            <TextContainer text={newDate(creationDate)} marginLeft={40} marginTop={8} fontSize={14} />
            <TextContainer text= {"Núm. de pedido: " + orderId} marginLeft={40} marginTop={8} fontSize={12} />
            <Container row>
              <TextContainer text= {totalItems + " artículos" } marginLeft={40} marginTop={8} fontSize={12} />
              <Icon name="dot-single" size={10} style={{marginTop: 10, marginLeft: 1.5}} > </Icon>
              <TextContainer text= {"Total $" + totalValue + '.00' } marginLeft={1} marginTop={8} fontSize={12} />
            </Container>
            {
              (status) ? <Container row alignment="end">
                          <Touchable onPress={() => {}}>
                            <Container row style={styles.contDetails}>
                             <TextContainer text="Ver detalles" textColor={theme.brandColor.iconn_green_original} fontBold marginTop={3} marginRight={0} underline/>
                             <Image source={ICONN_LEFT_ARROW}  style={{height: 24, width: 24}} />
                            </Container>
                          </Touchable>
                        </Container> :
                        <Container row space="between">
                        <Touchable  onPress={() => {}}>
                          <Container row style={styles.contShopAgain} >
                            <Image source={ICONN_ITEM_REFRESH} style={{height: 24, width: 24}} />
                            <TextContainer text="Volver a comprar" marginTop={3} marginLeft={4} textColor={theme.brandColor.iconn_green_original} fontBold underline />
                          </Container>
                        </Touchable>
                      <Touchable onPress={() => {}}>
                        <Container row style={styles.contDetails}>
                          <TextContainer text="Ver detalles" textColor={theme.brandColor.iconn_green_original} fontBold marginTop={3} marginRight={0} underline/>
                          <Image source={ICONN_LEFT_ARROW}  style={{height: 24, width: 24}} />
                        </Container>
                      </Touchable>
                      </Container>
            }
            
        </Container>
    );

};

const styles = StyleSheet.create({
    backgroundCard: {
      backgroundColor: theme.brandColor.iconn_white,
      padding: 10,
      marginTop: 16,
      borderRadius: 8,
    },
    iconDelivery: {
      marginTop: 12,
      marginLeft: 8,
    },
    contInTransit: {
      backgroundColor: theme.brandColor.iconn_green_original,
      borderRadius: 12,
      marginRight: 10,
      marginLeft: 30,
      marginTop: 12,
    },
    contDelivered: {
      backgroundColor: theme.brandColor.iconn_med_grey,
      borderRadius: 12,
      marginRight: 8,
      marginLeft: 75,
      marginTop: 12,
    },
    contShopAgain: {
      marginLeft: 8,
      marginTop: 19,
    },
    contDetails: {
        marginLeft: 8,
        marginTop: 19,
      }
  });

export default OrderCard;