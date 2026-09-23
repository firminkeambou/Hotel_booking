import React from 'react';
import { IHotel } from '@/interfaces/index';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import FlexBox from '@/components/flexbox';
import CustomText from '@/components/custom-text';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { capitalizeFirstLetter } from '@/helpers/helpers';
import ReadOnlyRating from '@/components/stars-read-only';
import { ProgressiveImage } from '@/components/image-progressive-loading';
import { useRouter } from 'expo-router';
type Props = {};

const HotelCard = ({ hotel }: { hotel: IHotel }) => {
  const theme = useTheme();
  const router = useRouter();
  const first3Amenities = hotel.amenities ? hotel.amenities.slice(0, 3) : [];
  let imageUrl =
    hotel.images && hotel.images.length > 0 ? hotel.images[0] : null;
  return (
    <TouchableOpacity
      onPress={() =>
        // ✅ Type-safe approach
        router.push({
          pathname: '/(private)/customer/hotel/[id]', // match your exact file path under app/
          params: { id: hotel.id },
        })
      }
    >
      <FlexBox
        style={{
          borderRadius: 5,
          borderTopRightRadius: 50,
          borderWidth: 1,
          borderColor: '#a0a0a0',
          marginBottom: 30,
        }}
      >
        <ProgressiveImage
          uri={imageUrl!}
          width={'100%'}
          height={200}
          borderRadius={5}
          borderTopRightRadius={50}
        />
        {/*   <Image
          source={{ uri: imageUrl! }}
          style={{ width: '100%', height: 200, borderRadius: 5 }}
          borderTopRightRadius={50}
          resizeMode="cover"
        /> */}

        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          paddingTop={15}
        >
          <CustomText
            value={hotel.name!}
            fontSize={18}
            fontWeight="bold"
            fontColor={theme.colors.primary}
          />
          <CustomText
            value={`$${hotel.starting_rent}/night`}
            fontSize={18}
            fontWeight="bold"
            fontColor={theme.colors.primary}
          />
        </FlexBox>

        <FlexBox paddingVertical={5} paddingHorizontal={15}>
          <ReadOnlyRating score={hotel.star_class} />
        </FlexBox>
        <FlexBox paddingHorizontal={15}>
          <CustomText
            value={hotel.address!}
            fontSize={16}
            fontColor="#454444"
            fontWeight="500"
          />
        </FlexBox>
        <FlexBox flexWrap="wrap" flexDirection="row" gap={8} margin={10}>
          {first3Amenities?.map((amenity, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#e8e7e7',
                borderWidth: 0.5,
                borderColor: theme.colors.primary,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <CustomText
                key={index}
                value={`${capitalizeFirstLetter(amenity)}`}
                fontSize={12}
                fontColor={theme.colors.primary}
              />
            </View>
          ))}
          <CustomText value="..." />
        </FlexBox>
      </FlexBox>
    </TouchableOpacity>
  );
};

export default HotelCard;
