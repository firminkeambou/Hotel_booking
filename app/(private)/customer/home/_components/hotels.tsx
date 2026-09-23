import FlexBox from '@/components/flexbox';
import CustomSafeArea from '@/components/safe-area-context';
import TabTitle from '@/components/tab-title';
import { useApprovedHotels } from '@/hooks/react-query/hotels-hooks';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import CustomText from '@/components/custom-text';
import HotelCard from './hotel-card';

type Props = {};

const Hotels = (props: Props) => {
  const { data: hotels, isLoading, isError } = useApprovedHotels();
  const theme = useTheme();

  //hotels && console.log('hotel data:', hotels);
  return (
    <CustomSafeArea>
      <FlexBox padding={20} flex={1}>
        <TabTitle
          title="Hotels"
          caption="Browse and book from a variety of hotels"
        />

        {isLoading && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}
        {!isLoading && hotels?.length === 0 && (
          <FlexBox paddingHorizontal={100}>
            <CustomText value="Sorry !! No hotels available at the moment." />
          </FlexBox>
        )}
        {!isLoading && hotels?.length !== 0 && (
          <FlatList
            data={hotels}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HotelCard hotel={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </FlexBox>
    </CustomSafeArea>
  );
};

export default Hotels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
