import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import TabTitle from '@/components/tab-title';
import { PRIMARY_COLOR } from '@/constants';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ScrollView } from 'react-native';
import type { ColorValue } from 'react-native';
import { useUSerReport } from '@/hooks/react-query/reports-hooks';
import { useUsersStore } from '@/store-zustand/users-store';
import dayjs from 'dayjs';

type Props = {};
interface KpiStructure {
  totalBooking: number;
  ongoingBooking: number;
  upcomingBooking: number;
  pastBooking: number;
  totSpent: number;
}

const Report = (props: Props) => {
  const { user } = useUsersStore();
  const { data: bookings, isLoading: isbookingLoading } = useUSerReport(
    user?.id!,
  );
  const kpiInit = {
    totalBooking: 0,
    ongoingBooking: 0,
    upcomingBooking: 0,
    pastBooking: 0,
    totSpent: 0,
  };
  let kpi = { ...kpiInit };
  if (bookings) {
    const specificDate = dayjs('2026-10-12'); // From an ISO string
    const nativeDate = dayjs(new Date());
    // Explicitly type the accumulator inside reduce
    kpi = bookings.reduce<KpiStructure>((acc, booking) => {
      // Use a valid string key that matches your interface, without quotes ('), it becomes a dynamic key
      acc['totalBooking'] = (acc['totalBooking'] || 0) + 1;
      acc['totSpent'] = (acc['totSpent'] || 0) + booking.total_amount;
      if (dayjs(booking.check_out_date).isBefore(nativeDate)) {
        acc['pastBooking'] = (acc['pastBooking'] || 0) + booking.total_amount;
      }
      if (dayjs(booking.check_in_date).isAfter(nativeDate)) {
        acc['upcomingBooking'] = (acc['upcomingBooking'] || 0) + 1;
      }
      if (
        dayjs(booking.check_in_date).isBefore(nativeDate) &&
        dayjs(booking.check_out_date).isAfter(nativeDate)
      ) {
        acc['ongoingBooking'] = (acc['ongoingBooking'] || 0) + 1;
      }
      return acc;
    }, kpiInit);
    console.log(
      'bookings....',
      bookings,
      '  yyyyy   ',
      typeof bookings[0].check_in_date,
    );

    console.log(`${specificDate}`);
    console.log(`${nativeDate}`);
    console.log(`${JSON.stringify(kpi)}`);
  }

  const renderPropertyRow = (
    title: string,
    caption: string,
    icon_name: string,
    fontColor: ColorValue,
    kpiB: string,
  ) => {
    return (
      <>
        <FlexBox
          style={{
            backgroundColor: '#fff',
            paddingVertical: 20,
            borderWidth: 0.25,
            borderRadius: 5,
            marginTop: 20,
          }}
          padding={10}
          gap={10}
        >
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            paddingTop={5}
            paddingHorizontal={8}
            alignItems="center"
          >
            <FlexBox>
              <TabTitle
                title={title}
                caption={caption}
                size={22}
                fontColor={'#000'}
              />
              <CustomText
                value={kpiB}
                fontSize={20}
                fontColor={fontColor}
                fontWeight="bold"
              />
            </FlexBox>
            <View>
              <Icon source={icon_name} size={50} color={fontColor as string} />
            </View>
          </FlexBox>
        </FlexBox>
      </>
    );
  };
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
          title="My Reports"
          caption="View your booking stitistics and spending overview"
          size={30}
        />

        {renderPropertyRow(
          'Total Bookings',
          'All booking made so far',
          'calendar-multiple',
          '#a33f10',
          kpi.totalBooking.toString(),
        )}
        {renderPropertyRow(
          'Ongoing Bookings',
          'Current Bookings',
          'calendar-sync',
          '#4CAF50',
          kpi.ongoingBooking.toString(),
        )}

        {renderPropertyRow(
          'Upcoming Bookings',
          'Bookings yet to come',
          'calendar-clock',
          '#FF9800',
          kpi.upcomingBooking.toString(),
        )}

        {renderPropertyRow(
          'Past Bookings',
          'Completed bookings',
          'calendar-remove',
          PRIMARY_COLOR,
          kpi.pastBooking.toString(),
        )}

        {renderPropertyRow(
          'Total Amount Spent',
          'Total expenditure on bookings',
          'cash-multiple',
          '#067fb8',
          `$ ${kpi.totSpent.toString()}`,
        )}
      </FlexBox>
    </ScrollView>
  );
};

export default Report;
