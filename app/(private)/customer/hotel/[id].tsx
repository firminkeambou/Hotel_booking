import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import CustomSafeArea from '@/components/safe-area-context';
import { useApprovedHotelById } from '@/hooks/react-query/hotels-hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import { ProgressiveImage } from '@/components/image-progressive-loading';
import { Divider, Icon } from 'react-native-paper';
import { capitalizeFirstLetter, normaliseUnit } from '@/helpers/helpers';
import ReadOnlyRating from '@/components/stars-read-only';
import { useHotelRooms } from '@/hooks/react-query/rooms-hooks';
import { IRoom } from '@/interfaces';
import HotelRoomDetail from '../room/_components/hotel-room-detail';

type Props = {};

const HotelDetailsScreen = (props: Props) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();
  //console.log('params........', params.id);
  const hotelId = params.id as string;
  const {
    data: hotel,
    isLoading: isHotelLoading,
    isError,
  } = useApprovedHotelById(hotelId);
  const { data: rooms, isLoading: isRoomsLoading } = useHotelRooms(hotelId);
  let imageUrl =
    hotel?.images && hotel.images.length > 0 ? hotel.images[0] : null;
  // !isLoading && console.log('hotel........', hotel);
  //isRoomsLoading && console.log('rooms=======:', rooms);
  const renderHotelProperty = (
    label: string,
    icon: string, // react-native-paper icon name
    value: string,
  ) => {
    return (
      <FlexBox gap={10} flexDirection="row" alignItems="center">
        <Icon source={icon} size={20} color={theme.colors.primary} />
        {/* {label && (
          <CustomText value={`${label}`} fontSize={16} fontColor="#6f6f6f" />
        )} */}
        <CustomText
          value={value}
          fontSize={14}
          fontColor="#3d3d3d"
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
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
      >
        {isHotelLoading && (
          <FlexBox justifyContent="center" alignItems="center" flex={1}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </FlexBox>
        )}
        {!isHotelLoading && !hotel && (
          <FlexBox justifyContent="center" alignItems="center" flex={1}>
            <CustomText value="Sorry !! Hotel not found." />
          </FlexBox>
        )}
        {!isHotelLoading && hotel && (
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
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                marginTop: normaliseUnit(-25),
                backgroundColor: '#fff',
              }}
              padding={15}
              backgroundColor={'#fff'}
              gap={4}
            >
              <CustomText
                value={hotel.name!}
                fontSize={22}
                fontWeight="bold"
                fontColor={theme.colors.primary}
              />
              <FlexBox paddingVertical={5} paddingHorizontal={5}>
                <ReadOnlyRating score={hotel.star_class} />
              </FlexBox>
              {renderHotelProperty(
                '',
                'map-marker',
                hotel.city?.toUpperCase()!,
              )}

              <Divider style={{ marginVertical: 15, borderWidth: 0.1 }} />
              <FlexBox paddingHorizontal={15} gap={5}>
                {renderHotelProperty(
                  'Email: ',
                  'email',
                  hotel.email ? hotel.email : 'N/A',
                )}
                {renderHotelProperty(
                  'Phone: ',
                  'phone',
                  hotel.phone ? hotel.phone : 'N/A',
                )}
                {renderHotelProperty(
                  'Location: ',
                  'map-marker',
                  hotel.address ? hotel.address : 'N/A',
                )}
              </FlexBox>
              <Divider style={{ marginVertical: 15, borderWidth: 0.1 }} />

              <FlexBox paddingHorizontal={15} gap={10}>
                <CustomText
                  value={hotel.description!}
                  fontSize={14}
                  fontColor="#6c6c6c"
                  fontWeight="bold"
                  textAlign="justify"
                />
              </FlexBox>
              <Divider style={{ marginVertical: 5, borderWidth: 0.1 }} />
              <FlexBox paddingHorizontal={15} paddingVertical={5} gap={5}>
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
                {hotel.amenities?.map((amenity, index) => (
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
              <FlexBox paddingHorizontal={15} paddingVertical={25} gap={10}>
                <CustomText
                  value="Select Room"
                  fontSize={18}
                  fontColor={theme.colors.primary}
                  fontWeight="bold"
                />
                {!isRoomsLoading && rooms?.length && rooms.length > 0 ? (
                  rooms.map((room: IRoom) => (
                    <HotelRoomDetail key={room.id} room={room} />
                  ))
                ) : (
                  <CustomText
                    value="No rooms available for this hotel."
                    fontSize={14}
                    fontColor="#6c6c6c"
                  />
                )}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        )}
      </ScrollView>
    </CustomSafeArea>
  );
};

export default HotelDetailsScreen;
