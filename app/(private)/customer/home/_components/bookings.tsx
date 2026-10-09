import React from 'react';
import FlexBox from '@/components/flexbox';
import TabTitle from '@/components/tab-title';
import { useRoomBookings } from '@/hooks/react-query/bookings-hooks';
import { useUsersStore } from '@/store-zustand/users-store';
import { Divider, Icon } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BookingCard from './booking-card';
import CustomText from '@/components/custom-text';
type Props = {};

const Bookings = (props: Props) => {
  const router = useRouter();
  const { user } = useUsersStore();
  const {
    data: bookings,
    isLoading: isBookingLoading,
    isPending,
    isSuccess,
    isError,
  } = useRoomBookings(user?.id ?? 100000000000); // Use the actual userId or a default value
  bookings && console.log('===bookings===', bookings.length);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <FlexBox>
        <TabTitle
          title="My Bookings"
          caption="View and manage your hotel room bookings"
        />

        {isBookingLoading && (
          <FlexBox
            alignItems="center"
            justifyContent="center"
            paddingVertical={100}
          >
            <Text>Loading bookings...</Text>
          </FlexBox>
        )}
        {isError && <Text>Error loading bookings. Please try again.</Text>}
        {isSuccess && bookings && bookings.length === 0 && (
          <FlexBox
            alignItems="center"
            justifyContent="center"
            paddingVertical={100}
          >
            <CustomText value="No bookings found." />
          </FlexBox>
        )}

        {isSuccess && bookings && bookings.length > 0 && (
          <FlexBox
            flex={1}
            style={{
              backgroundColor: '#fff',
              paddingBottom: 70,
            }}
            gap={25}
          >
            {/* Back Button */}
            {/*             <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 10,
                backgroundColor: '#a9a9a9',
                padding: 5,
                borderRadius: 20,
              }}
              onPress={() => router.back()}
            >
              <View>
                <Icon source="arrow-left" size={24} color={'white'} />
              </View>
            </TouchableOpacity> */}
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </FlexBox>
        )}
      </FlexBox>
    </ScrollView>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
