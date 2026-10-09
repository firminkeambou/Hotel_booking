import React from 'react';
import { PRIMARY_COLOR } from '@/constants';
import { View, StyleSheet, Text } from 'react-native';
import type { IBookingWithDetails } from '@/interfaces';
import FlexBox from '@/components/flexbox';
import dayjs from 'dayjs';
import { Divider, Icon } from 'react-native-paper';
import CustomText from '@/components/custom-text';
import CustomButton from '@/components/custom-button';

type Props = {
  booking: IBookingWithDetails;
};
const getStatusColor = (status?: string) => {
  switch (status) {
    case 'confirmed':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'cancelled':
      return '#F44336';
    default:
      return PRIMARY_COLOR;
  }
};
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  return dayjs(dateString).format('MMM DD, YYYY');
};

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

const BookingCard = ({ booking }: Props) => {
  return (
    <FlexBox
      style={{
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderWidth: 0.25,
        borderRadius: 5,
      }}
      padding={10}
      gap={10}
    >
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CustomText
          value={booking?.hotel?.name!}
          fontSize={20}
          fontWeight="bold"
          fontColor={PRIMARY_COLOR}
        />
        <FlexBox
          flexDirection="row"
          alignItems="center"
          gap={5}
          style={{
            backgroundColor: getStatusColor(booking.status ?? undefined),
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 5,
          }}
        >
          <Icon
            source={
              booking.status === 'confirmed' ? 'check-circle' : 'clock-outline'
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
      {/* Hotel & Room Info */}
      <FlexBox
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 5,
          backgroundColor: '#fff',
        }}
        padding={2}
        gap={10}
      >
        {renderPropertyRow('Room', 'door', booking.room?.name || 'N/A')}

        {renderPropertyRow(
          'Room Type',
          'home-outline',
          booking.room?.room_type || 'N/A',
        )}
      </FlexBox>

      <Divider style={{ marginVertical: 3 }} />
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
      <Divider style={{ marginVertical: 3 }} />
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

      <Divider style={{ marginVertical: 2 }} />
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
          renderPropertyRow('Payment ID', 'credit-card', booking.payment_id)}

        <CustomButton>Cancel Booking</CustomButton>
      </FlexBox>
    </FlexBox>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
