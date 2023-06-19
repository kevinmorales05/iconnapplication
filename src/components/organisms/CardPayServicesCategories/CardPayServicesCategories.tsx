import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText } from 'components/atoms';

import theme from 'components/theme/theme';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { SearchServicesType } from 'navigation/types/HomeStackParams';

type Props = {
    name: string;
    icon: any;
    isVertical?: boolean,
    goTo: (type: SearchServicesType, navigateTo: string) => void;
    navigateTo?: string;
    type?: SearchServicesType;
}

const CardPayServicesCategories = ({name, icon, isVertical, goTo, navigateTo, type}: Props) => {
    return(
        <TouchableOpacity onPress={()=> type && goTo(type, navigateTo)} style={isVertical ? styles.cardVertical : styles.card}>
            <View style={styles.containerIcon}>
                {
                    icon ?
                        icon
                    :
                        null
                }
            </View>
            <CustomText fontSize={moderateScale(14)} text={name}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: moderateScale(156),
        height: verticalScale(75),
        borderRadius: moderateScale(10),
        backgroundColor: theme.brandColor.iconn_white,
        marginRight: moderateScale(8),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(8),
        marginTop: moderateScale(8)
    },
    cardVertical: {
        width: moderateScale(160),
        height: verticalScale(75),
        borderRadius: moderateScale(10),
        backgroundColor: theme.brandColor.iconn_white,
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(8),
        marginTop: moderateScale(8)
    },
    containerIcon: {
        marginBottom: verticalScale(10)
    }
})

export default CardPayServicesCategories;