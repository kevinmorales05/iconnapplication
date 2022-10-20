import React, { useState, useEffect, useCallback } from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import PromotionsScreen from './PromotionsScreen';
import { vtexPromotionsServices } from 'services/vtexPromotions.services';

const PromotionsController: React.FC = () => {
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    console.log('fetchData...');
    //solo este tiene promociones con productos 34012fc8-f2d5-40ad-929e-b6c348b16791
    //let productVsPromotions = [Object];
    let productVsPromotions = new Map();
    await vtexPromotionsServices.getAllPromotions().then(promotionsResponse => {
      if (promotionsResponse) {
        const { items } = promotionsResponse;
        console.log('tams items: ' + items.length);
        if (items.length > 0) {
          items.map((item) => {
            if (item.isActive) {
              console.log('::::', item.idCalculatorConfiguration);
              vtexPromotionsServices.getPromotionById(item.idCalculatorConfiguration).then(promotionResponse => {
/*                console.log('*********************************************** ini ' + item.idCalculatorConfiguration);
                console.log(promotionResponse);
                console.log('*********************************************** fin ' + item.idCalculatorConfiguration);*/
                if(promotionResponse){
                  if(promotionResponse.skusGift){
                    const { gifts } = promotionResponse.skusGift;
                    console.log(item.idCalculatorConfiguration+' longitud:   '+gifts.length);
                    if(gifts){
                      if(gifts.length>0){
                      gifts.map((gift) => {
                        productVsPromotions.set(gift.id,{productId: gift.id, name: gift.name, quantity: gift.quantity, promotionType: promotionResponse.type, promotionName: promotionResponse.name, percentualDiscountValue: promotionResponse.percentualDiscountValue});
                        });
                      }
                    }
                  }
                }
                console.log(productVsPromotions);
              }).catch(error => console.log(error));
            }
          });
        }
      }
    }).catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onPressOut = () => {
    setHelpVisible(true);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PromotionsScreen onPressClose={onPressOut}
        visible={helpVisible} />
    </SafeArea>
  );
};

export default PromotionsController;
