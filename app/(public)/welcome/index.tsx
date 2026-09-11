import FlexBox from '@/components/flexbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants';
import CustomText from '@/components/custom-text';
import { normaliseUnit } from '@/helpers/helpers';
import CustomButton from '@/components/custom-button';
type Props = {};

const WelcomeScreen = (props: Props) => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlexBox
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal={40}
        gap={30}
      >
        <Image
          source={require('../../../assets/images/welcome_icon-512.png')}
          style={{ width: normaliseUnit(150), height: normaliseUnit(150) }}
          resizeMode="contain"
        />
        <CustomText
          value="HOTEL BOOKING"
          fontSize={25}
          fontColor={PRIMARY_COLOR}
          fontWeight="bold"
          textAlign="center"
        />
        <CustomText
          value="what are you waiting for? Book your stay with ease."
          fontSize={16}
          fontColor="#555"
          fontWeight="bold"
          textAlign="center"
        />
        <CustomButton
          onPress={() => {
            router.push('/(public)/register');
          }}
          mode="contained"
        >
          <CustomText fontColor="#fff" value="Get Started" fontSize={16} />
        </CustomButton>
      </FlexBox>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
