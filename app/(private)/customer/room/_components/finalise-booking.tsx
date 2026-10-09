import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useUsersStore } from '@/store-zustand/users-store';
import { View, StyleSheet, Text } from 'react-native';
import { IRoom } from '@/interfaces';
import FlexBox from '@/components/flexbox';
import CustomButton from '@/components/custom-button';
import dayjs from 'dayjs';
import CustomText from '@/components/custom-text';
import { callStripeBackend } from '@/services/stripe/payments';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useStripe } from '@stripe/stripe-react-native';
import { saveBooking } from '@/services/bookings';

type Props = {
  room: IRoom;
  isRoomAvailable: boolean;
  selectedDates: string[] | null;
  setIsRoomAvailable: Dispatch<SetStateAction<boolean>>; // 👈 Correct setter type
  setSelectedDates: Dispatch<SetStateAction<string[] | null>>;
};
const formatter = new Intl.NumberFormat('fr-FR');
const FinaliseBooking = ({
  room,
  setIsRoomAvailable,
  setSelectedDates,
  selectedDates,
  isRoomAvailable,
}: Props) => {
  const [makingPayment, setMakingPayment] = React.useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); // using stripe
  const { user } = useUsersStore();
  const router = useRouter();
  const onReset = () => {
    setSelectedDates(null);
    setIsRoomAvailable(false);
  };
  const roomBillDetail = React.useMemo(() => {
    if (selectedDates?.length === 2) {
      const days =
        dayjs(selectedDates[1])
          .startOf('day')
          .diff(dayjs(selectedDates[0]).startOf('day'), 'day') || 1;
      const totalAmount = (room.rent_per_day || 0) * days;
      return {
        nbDays: days,
        totalAmount,
      };
    }
    return {
      nbDays: 0,
      totalAmount: 0,
    };
  }, [selectedDates, room.rent_per_day]);
  const onMakePayment = async () => {
    try {
      setMakingPayment(true);
      console.log('hellojj');
      const response: any = await callStripeBackend(roomBillDetail.totalAmount); // this is usually convert intoo cent except you did the conversion in the backend
      if (!response.success) {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: response.error,
        });
        return;
      }
      //console.log(response);
      const data = response.data;
      //before presenting the payment sheet, we need to initialize it with the client secret and other details
      const initResponse = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'Booking Hotel App',
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
      });
      if (initResponse.error) {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: initResponse.error.message,
        });
        return;
      }
      // Now present the payment sheet to the user
      const presentResponse = await presentPaymentSheet();

      if (presentResponse.error) {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: presentResponse.error.message,
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'Payment Successful',
        text2: 'Your room has been booked successfully!',
      });
      //handle save booking
      const bookingDates = [];
      for (
        let dat = dayjs(selectedDates![0]);
        dat.isBefore(dayjs(selectedDates![1]));
        dat = dat.add(1, 'day')
      ) {
        bookingDates.push(dayjs(dat).format('YYYY-MM-DD'));
      }
      const saveBookingResponse = await saveBooking({
        room_id: room.id,
        hotel_id: room.hotel_id,
        booked_dates: bookingDates,
        check_in_date: dayjs(selectedDates![0]).format('YYYY-MM-DD'),
        check_out_date: dayjs(selectedDates![1]).format('YYYY-MM-DD'),
        status: 'confirmed',
        total_amount: roomBillDetail.totalAmount,
        payment_id: data.paymentIntentId,
        customer_id: user?.id, // Assuming you have a user object with an id property
        owner_id: room.owner_id,
      });
      if (!saveBookingResponse.success) {
        Toast.show({
          type: 'error',
          text1: 'Booking Failed',
          text2: saveBookingResponse.error,
        });
        router.push('/(private)/customer/home');
        return;
      }
      console.log('Booking saved successfully:', saveBookingResponse.data);
      Toast.show({
        type: 'success',
        text1: 'Booking confirmed',
        text2: 'Your room has been booked successfully!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
        text2:
          'An error occured while processig your payment. please try again',
      });
      setMakingPayment(false);
    } finally {
      setMakingPayment(false);
    }
  };
  return (
    <FlexBox gap={20}>
      <View style={{ flex: 1 }}>
        <CustomButton
          uppercase={false}
          mode="outlined"
          buttonColor="transparent"
          disabled
        >
          Check In date - {dayjs(selectedDates![0]).format('DD MMM YYYY')}
        </CustomButton>
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          uppercase={false}
          mode="outlined"
          buttonColor="transparent"
          disabled
        >
          Check out date - {dayjs(selectedDates![1]).format('DD MMM YYYY')}
        </CustomButton>
      </View>

      <FlexBox
        style={{
          backgroundColor: '#cfe0d3',
          padding: 10,
          borderRadius: 5,
        }}
        gap={10}
      >
        <CustomText
          value="Room is available for the selected dates!"
          fontColor="green"
          textAlign="center"
        />
        <FlexBox flexDirection="row">
          <CustomText value={`Number of nights: `} />
          <CustomText
            value={` ${formatter.format(roomBillDetail.nbDays)}`}
            fontWeight="bold"
          />
        </FlexBox>
        <FlexBox flexDirection="row">
          <CustomText value={`Total Amount: `} />
          <CustomText
            value={`   $ ${formatter.format(roomBillDetail.totalAmount)}`}
            fontWeight="bold"
          />
        </FlexBox>
      </FlexBox>
      <CustomButton onPress={onMakePayment} buttonColor={'#cc582a'}>
        Make Payment & Book
      </CustomButton>
      <CustomButton onPress={onReset} buttonColor="transparent" mode="outlined">
        Reset Dates
      </CustomButton>
    </FlexBox>
  );
};

export default FinaliseBooking;
