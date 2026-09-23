import React, { useEffect } from 'react';
import CustomSafeArea from '@/components/safe-area-context';
import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { BackHandler, Alert, NativeEventSubscription } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Hotels from './_components/hotels';
import Bookings from './_components/bookings';
import Report from './_components/report';
import Profile from './_components/profile';
import { useTheme } from 'react-native-paper';
// material icons   focusedIcon: 'format-list-bulleted',     unfocusedIcon: 'format-list-bulleted-type',
const tabsData = [
  {
    key: 'hotels',
    title: 'Hotels',
    focusedIcon: 'home-city',
    unfocusedIcon: 'home-city-outline',
  },
  {
    key: 'bookings',
    title: 'Bookings',
    focusedIcon: 'book-open-page-variant',
    unfocusedIcon: 'book-open-page-variant-outline',
  },
  {
    key: 'report',
    title: 'Report',
    focusedIcon: 'chart-box',
    unfocusedIcon: 'chart-box-outline',
  },
  {
    key: 'profile',
    title: 'Profile',
    focusedIcon: 'account-circle',
    unfocusedIcon: 'account-circle-outline',
  },
];
type Props = {};

const CustomerHomeScreen = (props: Props) => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabsData);
  const theme = useTheme();
  //below is the matching between routes and components
  const renderScene = BottomNavigation.SceneMap({
    hotels: Hotels,
    bookings: Bookings,
    report: Report,
    profile: Profile,
  });
  useEffect(() => {
    // Check if navigation is focused to prevent unexpected triggers on other screens

    const handleBackPress = (): boolean => {
      if (navigation.isFocused()) {
        Alert.alert('Are you sure you want to exit the app?', '', [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevents the default back action
      }
      return false; // Allows normal back navigation on other screens
    };

    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [navigation]); // Added navigation to dependency array to prevent stale closures

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: '#e9e9e9',
        //backgroundColor: theme.colors.primary,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,

        zIndex: 100,
      }}
      shifting={true}
      activeColor={theme.colors.primary}
      activeIndicatorStyle={{ backgroundColor: 'transparent' }}
    />
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
