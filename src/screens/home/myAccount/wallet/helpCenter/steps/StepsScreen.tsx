import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TextContainer, Container, Touchable } from 'components';
import theme from 'components/theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  stepsData: [];
  qualify: () => void;
}

const StepsScreen: React.FC<Props> = ({ stepsData, qualify }) => {
  const [qualificationStatus, setQualificationStatus] = useState([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '82%' }} height={Dimensions.get('window').height * 0.75}>
        <Container center style={{ width: '97%', marginTop: 25 }}>
          {stepsData.length > 0 ? (
            stepsData.map((step, index) => {
              return (
                <Container style={{ width: '90%' }}>
                  <Container row>
                    <TextContainer text={index + 1 + '.  '} fontBold></TextContainer>
                    <TextContainer text={step.description} marginBottom={18}></TextContainer>
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
                        paddingVertical: 15
                      }}
                    >
                      <Container row style={{ marginLeft: 7 }}>
                        <Container center space="around" style={{ marginLeft: 7, width: '10%' }}>
                          <Octicons name="info" size={24} color={theme.fontColor.dark} />
                        </Container>
                        <Container style={{ width: '90%' }}>
                          <Container style={{ width: '90%', marginLeft: 8 }}>
                            <TextContainer text={'Importante: ' + step.importantMessage} fontSize={12} numberOfLines={3} marginRight={4}></TextContainer>
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
            <></>
          )}
        </Container>
      </Container>
      <Container style={{ height: '.5%', backgroundColor: theme.brandColor.iconn_background }}></Container>
      <Container center style={{ backgroundColor: theme.brandColor.iconn_white, height: '17.5%' }}>
        <TextContainer text="¿Te resultó útil esta información?" fontBold marginTop={6}></TextContainer>
        <Container row space="evenly" style={{ width: '100%', marginTop:15 }}>
          <Touchable onPress={() => qualify('baja')}>
            <MaterialIcons name="tag-faces" size={40} color={theme.brandColor.iconn_med_grey} />
          </Touchable>
          <Touchable onPress={() => qualify('medium')}>
            <MaterialIcons name="tag-faces" size={40} color={theme.brandColor.iconn_med_grey} />
          </Touchable>
          <Touchable onPress={() => qualify('heigth')}>
            <MaterialIcons name="tag-faces" size={40} color={theme.brandColor.iconn_green_original} />
          </Touchable>
        </Container>
      </Container>
    </Container>
  );
};

export default StepsScreen;
