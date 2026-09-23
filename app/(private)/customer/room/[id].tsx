import FlexBox from '@/components/flexbox';
import { useRoomById } from '@/hooks/react-query/rooms-hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { Divider, Icon } from 'react-native-paper';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomText from '@/components/custom-text';
import CustomSafeArea from '@/components/safe-area-context';
import { capitalizeFirstLetter, normaliseUnit } from '@/helpers/helpers';
import { ProgressiveImage } from '@/components/image-progressive-loading';

type Props = {};

const RoomDetail = (props: Props) => {
  const params = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const roomId = params.id as string;
  const { data: room, isLoading: isRoomLoading } = useRoomById(roomId);
  let imageUrl = room?.images && room.images.length > 0 ? room.images[0] : null;
  // room && console.log('roommmmmm==========', room);
  const renderRoomProperty = (
    label: string,
    icon: string, // react-native-paper icon name
    value: string,
  ) => {
    return (
      <FlexBox gap={10} flexDirection="row" alignItems="center">
        <Icon source={icon} size={20} color={'#787878'} />
        {/* {label && (
          <CustomText value={`${label}`} fontSize={16} fontColor="#6f6f6f" />
        )} */}
        <CustomText
          value={value}
          fontSize={14}
          fontColor="#787878"
          fontWeight="bold"
        />
      </FlexBox>
    );
  };

  return (
    <CustomSafeArea>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isRoomLoading && (
          <FlexBox justifyContent="center" alignItems="center" flex={1}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </FlexBox>
        )}
        {!isRoomLoading && !room && (
          <FlexBox justifyContent="center" alignItems="center" flex={1}>
            <CustomText value="Sorry !! Room not found." />
          </FlexBox>
        )}
        {!isRoomLoading && room && (
          <FlexBox
            flex={1}
            style={{
              backgroundColor: '#fff',
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: normaliseUnit(25),
                left: normaliseUnit(15),
                zIndex: 10,
                backgroundColor: '#0c0c0c',
                padding: 5,
                borderRadius: 20,
              }}
              onPress={() => router.back()}
            >
              <View>
                <Icon
                  source="arrow-left"
                  size={normaliseUnit(30)}
                  color={'white'}
                />
              </View>
            </TouchableOpacity>
            <ProgressiveImage
              uri={imageUrl!}
              width={'100%'}
              height={normaliseUnit(250)}
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}
            />

            <FlexBox
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -30,
                backgroundColor: '#fff',
              }}
              padding={20}
              backgroundColor={'#fff'}
              gap={4}
            >
              <CustomText
                value={room.name!}
                fontSize={22}
                fontWeight="bold"
                fontColor={theme.colors.primary}
              />
              {renderRoomProperty(
                '',
                'map-marker',
                capitalizeFirstLetter(room?.room_type!),
              )}
            </FlexBox>

            <Divider style={{ marginVertical: 20 }} />

            <FlexBox paddingHorizontal={15} gap={10}>
              <CustomText
                value={room.description!}
                fontSize={14}
                fontColor="#6c6c6c"
                fontWeight="bold"
              />
            </FlexBox>

            <Divider style={{ marginVertical: 20 }} />

            <FlexBox
              paddingVertical={10}
              backgroundColor={'#cccccc87'}
              paddingHorizontal={15}
              style={{
                borderRadius: 5,
              }}
              marginHorizontal={15}
            >
              <CustomText value="Rent per day" />
              <CustomText
                value={`$ ${room.rent_per_day}`}
                fontSize={25}
                fontColor={theme.colors.primary}
                fontWeight="bold"
              />
            </FlexBox>

            <Divider style={{ marginVertical: 20 }} />

            <FlexBox paddingHorizontal={15} paddingVertical={15} gap={10}>
              <CustomText
                value="Amenities"
                fontSize={18}
                fontColor={theme.colors.primary}
                fontWeight="bold"
              />
            </FlexBox>
            <FlexBox
              flexWrap="wrap"
              flexDirection="row"
              paddingHorizontal={15}
              gap={10}
            >
              {room.amenities?.map((amenity, index) => (
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
                    value={`• ${capitalizeFirstLetter(amenity)}`}
                    fontSize={12}
                    fontColor={theme.colors.primary}
                  />
                </View>
              ))}
            </FlexBox>

            <FlexBox
              marginVertical={20}
              paddingHorizontal={15}
              paddingVertical={15}
              gap={10}
            >
              <CustomText
                value="Select Dates"
                fontSize={20}
                fontColor={theme.colors.primary}
                fontWeight="bold"
              />
            </FlexBox>
          </FlexBox>
        )}
      </ScrollView>
    </CustomSafeArea>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
