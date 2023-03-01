import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Platform } from 'react-native';
import { TextContainer, Container, Touchable } from 'components';
import theme from 'components/theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

interface Props {
  stepsData: [];
  qualify: () => void;
  updateQualify: () => void;
  stepReceived: Object;
  qualificationState: [];
  isQualified: boolean;
  question: string;
}

const StepsScreen: React.FC<Props> = ({ stepsData, qualify, updateQualify, qualificationState, isQualified, question }) => {
  const [qualificationStatus, setQualificationStatus] = useState<any[]>(qualificationState);
  const [currentQualification, setCurrentQualification] = useState(1);
  const insets = useSafeAreaInsets();

  const qualifyAndChangeColor = async (qualification: number) => {
    const qualificationStatusTem = qualificationStatus.concat([]);
    if (isQualified) {
      updateQualify(qualification);
    } else {
      qualify(qualification);
    }

    for (let i = 0; i < qualificationStatus.length; i++) {
      if (qualificationStatusTem[i].qualificationValue == qualification) {
        qualificationStatusTem[i].isQualified = true;
      } else {
        qualificationStatusTem[i].isQualified = false;
      }
    }
    setCurrentQualification(qualification);
    setQualificationStatus(qualificationStatusTem);
  };

  useEffect(() => {}, [qualificationStatus, currentQualification]);

  return (
    <Container>
      <Container
        style={{
          backgroundColor: theme.brandColor.iconn_white,
          width: '100%',
          height: verticalScale(510),
          paddingLeft: moderateScale(13),
          paddingRight: moderateScale(23)
        }}
        height={Dimensions.get('window').height * 0.75}
      >
        <TextContainer text={question} fontBold fontSize={20} marginTop={23.5} marginLeft={moderateScale(10)} marginBottom={24} marginRight={16} />
        <ScrollView
          bounces={false}
          contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container center style={{ marginTop: 25, marginLeft: moderateScale(65), marginRight: moderateScale(40) }}>
            {stepsData.length > 0 ? (
              stepsData.map((step, index) => {
                return (
                  <Container key={index + 'erCon'} style={{ width: moderateScale(300), marginRight: moderateScale(30) }}>
                    <Container row key={index + 'erConRow'}>
                      <TextContainer text={index + 1 + '.  '} fontBold key={index + 'erText1'} />
                      <TextContainer
                        text={step.description}
                        fontSize={14}
                        marginBottom={18}
                        key={index + 'erConText2'}
                        textAlign={'justify'}
                        marginRight={moderateScale(10)}
                      />
                    </Container>
                    {step.importantMessage != null ? (
                      <Container
                        style={{
                          borderLeftColor: '#f3d449',
                          borderRightColor: '#f3d449',
                          borderBottomColor: '#f3d449',
                          borderTopColor: '#f3d449',
                          borderWidth: 1,
                          backgroundColor: '#fffaed',
                          borderRadius: 8,
                          paddingVertical: moderateScale(15),
                          marginBottom: 20,
                          marginLeft: moderateScale(15)
                        }}
                        key={index + 'erConSt'}
                      >
                        <Container row style={{ marginLeft: 7 }} key={index + 'erConIc'}>
                          <Container center space="around" style={{ marginLeft: 7, width: '10%' }} key={index + 'erConIcon'}>
                            <Octicons name="info" size={24} color={theme.fontColor.dark} />
                          </Container>
                          <Container style={{ width: '90%' }} key={index + 'erConSubT'}>
                            <Container style={{ width: '90%', marginLeft: 8 }} key={index + 'erContaImport'}>
                              <TextContainer
                                text={'Importante: ' + step.importantMessage}
                                fontSize={12}
                                numberOfLines={3}
                                marginRight={4}
                                key={index + 'erTextImport'}
                              />
                            </Container>
                          </Container>
                        </Container>
                      </Container>
                    ) : (
                      <></>
                    )}
                  </Container>
                );
              })
            ) : (
              <Container center>
                <Container center style={{ width: '90%', height: '100%', marginTop: 100 }}>
                  <MaterialCommunityIcons size={60} name="alert" color={theme.fontColor.grey} />
                  <TextContainer
                    text="Información no disponible por el momento. Disculpe las molestias"
                    textColor={theme.fontColor.grey}
                    textAlign={'center'}
                  />
                </Container>
              </Container>
            )}
          </Container>
        </ScrollView>
      </Container>
      <Container style={{ height: '.5%', backgroundColor: theme.brandColor.iconn_background }} />
      {stepsData.length > 0 ? (
        <Container center style={{ backgroundColor: theme.brandColor.iconn_white, height: '17.5%' }}>
          <TextContainer text="¿Te resultó útil esta información?" fontBold marginTop={6} />
          <Container row space="evenly" style={{ width: '100%', marginTop: 15 }}>
            {qualificationStatus.map((qualification, index) => {
              return (
                <Touchable onPress={() => qualifyAndChangeColor(qualification.qualificationValue)} key={index + 'erTouch'}>
                  <Image
                    source={qualification.img}
                    style={{ width: 40, height: 40, tintColor: qualification.isQualified ? qualification.color : theme.brandColor.iconn_grey_background }}
                    key={index + 'erImg'}
                  />
                </Touchable>
              );
            })}
          </Container>
        </Container>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default StepsScreen;
