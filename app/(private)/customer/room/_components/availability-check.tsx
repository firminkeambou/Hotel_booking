import { appLocale } from '@/app/_layout';
import CustomButton from '@/components/custom-button';
import FlexBox from '@/components/flexbox';
import { IRoom } from '@/interfaces';
import dayjs from 'dayjs';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';

import { useRoomCheckAvailability } from '@/hooks/react-query/bookings-hooks';
import CustomText from '@/components/custom-text';
import AlertModal from '@/components/modal-alert';
import LoadingModal from '@/components/modal-spinner';

type Props = {
  roomId: string;
  selectedDates: string[] | null;
  setIsRoomAvailable: Dispatch<SetStateAction<boolean>>; // 👈 Correct setter type
  setSelectedDates: Dispatch<SetStateAction<string[] | null>>;
};

const AvailabilityCheck = ({
  roomId,
  setIsRoomAvailable,
  setSelectedDates,
  selectedDates,
}: Props) => {
  const [openCheckInDate, setOpenCheckInDate] = useState(false);
  const [openCheckOutDate, setOpenCheckOutDate] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isCheckingAvalaibily, setIsCheckingAvalaibily] =
    useState<boolean>(false);

  //at the very first call on component mount, isPending=true,isLoading=false  while waiting for the selected dates
  const {
    data: bookings,
    isLoading: isBookingLoading,
    isPending,
    isSuccess,
    isError,
  } = useRoomCheckAvailability(selectedDates, roomId.toString());
  console.log(
    `bookings length===+${bookings?.length}+====status====isPending+${isPending}+====isLoading+${isBookingLoading}+=====isSuccess+${isSuccess}+= `,
  );

  useEffect(() => {
    if (bookings?.length === 0 && isSuccess) {
      setIsRoomAvailable(true);
    }
  }, [bookings, isSuccess]);
  // 1. Create your custom date picker theme adjustments
  /* const datePickerTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#6200EE', // Changes header text, active date bubble, and primary buttons
      primaryContainer: '#E8DEF8', // Changes active range backgrounds
      surface: '#FFFFFF', // Changes modal calendar container background
      onSurface: '#1C1B1F', // Changes number/date text colors
    },
  }; */
  //console.log('checkInDate', checkInDate);
  /*  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  ); */
  // Get current date with time zeroed out for precise comparison
  const today = new Date();
  /* const now = dayjs();n
  console.log('today dayjs', now);
  today.setHours(0, 0, 0, 0);
  console.log('today', today); */
  const onCheckAvailability = () => {
    let date = dayjs(checkInDate).startOf('day');
    if (!date.isBefore(dayjs(checkOutDate).startOf('day'))) {
      /*       Alert.alert(
        `check In date-${dayjs(checkInDate).format('DD/MM/YYYY')} should be before check Out date-${dayjs(checkOutDate).format('DD/MM/YYYY')} !!`,
      ); */
      setIsAlertVisible(true);
      return;
    }
    setIsCheckingAvalaibily(!isCheckingAvalaibily);
    const datesRequired: string[] = [];
    datesRequired.push(dayjs(date).format('YYYY-MM-DD'));
    datesRequired.push(dayjs(checkOutDate).format('YYYY-MM-DD'));
    console.log('datesRequired--------', datesRequired, ' ', roomId);
    setSelectedDates(datesRequired);
  };

  return (
    <FlexBox gap={20}>
      <View style={{ flex: 1 }}>
        <CustomButton
          onPress={() => setOpenCheckInDate(true)}
          uppercase={false}
          mode="outlined"
          buttonColor="transparent"
        >
          Check In date -{' '}
          {checkInDate ? dayjs(checkInDate).format('DD MMM YYYY') : 'Select'}
        </CustomButton>

        <DatePickerModal
          locale={appLocale}
          mode="single"
          visible={openCheckInDate}
          onDismiss={() => setOpenCheckInDate(false)}
          date={checkInDate!}
          onConfirm={({ date }: any) => {
            setCheckInDate(date);
            setOpenCheckInDate(false);
          }}
          validRange={{
            startDate: today,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          onPress={() => setOpenCheckOutDate(true)}
          uppercase={false}
          mode="outlined"
          buttonColor="transparent"
          disabled={!checkInDate ? true : false}
        >
          Check out date -{' '}
          {checkOutDate ? dayjs(checkOutDate).format('DD MMM YYYY') : 'Select'}
        </CustomButton>
        <DatePickerModal
          locale={appLocale}
          mode="single"
          visible={openCheckOutDate}
          onDismiss={() => setOpenCheckOutDate(false)}
          date={checkOutDate!}
          onConfirm={({ date }: any) => {
            setCheckOutDate(date);
            setOpenCheckOutDate(false);
          }}
          validRange={{
            startDate: !checkInDate
              ? today
              : (() => {
                  const nextDay = new Date(checkInDate);
                  nextDay.setDate(nextDay.getDate() + 1);
                  return nextDay;
                })(),
          }}
        />
      </View>
      {bookings?.length == 0 && isSuccess && (
        <FlexBox>
          <CustomText
            value="Room is available for the selected dates!"
            fontColor="green"
            textAlign="center"
          />
        </FlexBox>
      )}
      {bookings?.length !== 0 &&
        isSuccess &&
        (Alert.alert('no available room'), null)}

      <CustomButton
        onPress={onCheckAvailability}
        disabled={!checkInDate || !checkOutDate}
      >
        Check Availability
      </CustomButton>
      <AlertModal
        setIsAlertVisible={setIsAlertVisible}
        isAlertVisible={isAlertVisible}
        message={`Attention !!!  check In date ${dayjs(checkInDate).format('DD/MM/YYYY')} should be before check Out date ${dayjs(checkOutDate).format('DD/MM/YYYY')}.`}
      />
      <LoadingModal visible={isCheckingAvalaibily} />
    </FlexBox>
  );
};

export default AvailabilityCheck;
//<CustomButton onPress={() => {}}>Reset dates</CustomButton>

/* 
   {checkInDate && checkOutDate && (
        <CustomButton onPress={onCheckAvailability}>
          Check Availability
        </CustomButton>
      )}
*/
