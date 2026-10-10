import { View, TouchableOpacity, ScrollView } from 'react-native';
import CustomSafeArea from '@/components/safe-area-context';
import FlexBox from '@/components/flexbox';
import CustomText from '@/components/custom-text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants';
import { Divider, Icon } from 'react-native-paper';
import CustomButton from '@/components/custom-button';
import { useBookingStore } from '@/store-zustand/booking-store';
import { normaliseUnit, formatDate, getStatusColor } from '@/helpers/helpers';

const BookingDetailsScreen = () => {
  const params = useLocalSearchParams();
  const bookingId = params.id;
  const bookings = useBookingStore((state) => state.bookings);
  const booking =
    bookings[bookings.findIndex((booking) => booking.id === bookingId)];

  const router = useRouter();

  const renderPropertyRow = (label: string, icon: string, value: string) => {
    return (
      <FlexBox gap={10} flexDirection="row" alignItems="center">
        <Icon source={icon} size={20} color={PRIMARY_COLOR} />
        <FlexBox flex={1}>
          <CustomText
            value={label}
            fontSize={12}
            fontColor="#9a9a9a"
            fontWeight="600"
          />
          <CustomText
            value={value}
            fontSize={14}
            fontColor="#454444"
            fontWeight="bold"
          />
        </FlexBox>
      </FlexBox>
    );
  };

  return (
    <CustomSafeArea
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <FlexBox
          flex={1}
          style={{
            backgroundColor: '#fff',
            paddingBottom: 70,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',

              top: normaliseUnit(15),
              left: normaliseUnit(15),
              zIndex: 10,
              backgroundColor: '#bdb6b6',
              padding: 5,
              borderRadius: 20,
            }}
            onPress={() => router.back()}
          >
            <View>
              <Icon source="arrow-left" size={24} color={'white'} />
            </View>
          </TouchableOpacity>

          {/* Header Section with Status */}
          <FlexBox
            style={{
              backgroundColor: PRIMARY_COLOR,
              paddingVertical: 50,
            }}
            padding={20}
            gap={15}
          >
            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomText
                value="Booking Details"
                fontSize={22}
                fontWeight="bold"
                fontColor="white"
              />
              <FlexBox
                flexDirection="row"
                alignItems="center"
                gap={5}
                style={{
                  backgroundColor: getStatusColor(booking.status ?? ''),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
              >
                <Icon
                  source={
                    booking.status === 'confirmed'
                      ? 'check-circle'
                      : 'clock-outline'
                  }
                  size={14}
                  color="white"
                />
                <CustomText
                  value={
                    booking.status
                      ? booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)
                      : 'Pending'
                  }
                  fontSize={12}
                  fontWeight="bold"
                  fontColor="white"
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* Hotel & Room Info */}
          <FlexBox
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: -20,
              backgroundColor: '#fff',
            }}
            padding={20}
            gap={15}
          >
            <CustomText
              value={booking.hotel?.name || 'Hotel'}
              fontSize={20}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            {renderPropertyRow('Room', 'door', booking.room?.name || 'N/A')}

            {renderPropertyRow(
              'Room Type',
              'home-outline',
              booking.room?.room_type || 'N/A',
            )}
          </FlexBox>

          <Divider style={{ marginVertical: 20 }} />

          {/* Dates Section */}
          <FlexBox paddingHorizontal={20} gap={15}>
            <CustomText
              value="Booking Dates"
              fontSize={16}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            {renderPropertyRow(
              'Check-in',
              'calendar-check',
              formatDate(booking?.check_in_date!),
            )}

            {renderPropertyRow(
              'Check-out',
              'calendar-remove',
              formatDate(booking?.check_out_date!),
            )}

            {renderPropertyRow(
              'Number of Nights',
              'moon-waning-crescent',
              `${booking?.booked_dates?.length}${booking?.booked_dates?.length !== 1 ? 's' : ''}`,
            )}
          </FlexBox>

          <Divider style={{ marginVertical: 20 }} />

          {/* Pricing Section */}
          <FlexBox paddingHorizontal={20} gap={12}>
            <CustomText
              value="Pricing Details"
              fontSize={16}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical={8}
            >
              <CustomText
                value={`Per Night Rate`}
                fontSize={14}
                fontColor="#6c6c6c"
              />
              <CustomText
                value={`$${booking.room?.rent_per_day || 0}`}
                fontSize={14}
                fontWeight="bold"
                fontColor="#454444"
              />
            </FlexBox>

            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical={8}
            >
              <CustomText
                value={`Number of Nights`}
                fontSize={14}
                fontColor="#6c6c6c"
              />
              <CustomText
                value={`${booking?.booked_dates?.length}`}
                fontSize={14}
                fontWeight="bold"
                fontColor="#454444"
              />
            </FlexBox>

            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical={12}
              style={{
                borderTopWidth: 1,
                borderTopColor: '#e8e7e7',
                borderBottomWidth: 1,
                borderBottomColor: '#e8e7e7',
              }}
            >
              <CustomText
                value="Total Amount"
                fontSize={16}
                fontWeight="bold"
                fontColor="#454444"
              />
              <CustomText
                value={`$${booking.total_amount?.toFixed(2) || '0.00'}`}
                fontSize={18}
                fontWeight="bold"
                fontColor={PRIMARY_COLOR}
              />
            </FlexBox>
          </FlexBox>

          <Divider style={{ marginVertical: 20 }} />

          {/* Additional Info */}
          <FlexBox paddingHorizontal={20} gap={12}>
            <CustomText
              value="Additional Information"
              fontSize={16}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            {renderPropertyRow('Booking ID', 'identifier', `#${booking.id}`)}

            {renderPropertyRow(
              'Hotel Location',
              'map-marker',
              booking.hotel?.address || 'N/A',
            )}

            {booking.payment_id &&
              renderPropertyRow(
                'Payment ID',
                'credit-card',
                booking.payment_id,
              )}

            <CustomButton>Cancel Booking</CustomButton>
          </FlexBox>
        </FlexBox>
      </ScrollView>
    </CustomSafeArea>
  );
};

export default BookingDetailsScreen;
