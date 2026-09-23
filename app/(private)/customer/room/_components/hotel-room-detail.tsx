import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { capitalizeFirstLetter } from '@/helpers/helpers';
import { IRoom } from '@/interfaces';
import { useRouter, Href } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

type Props = {
  room: IRoom;
};

const HotelRoomDetail = ({ room }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <TouchableOpacity
      key={room.id}
      onPress={() => router.push(`/customer/room/${room.id}` as Href)}
    >
      <FlexBox
        style={{
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#7c7c7c',
        }}
        backgroundColor={'#f4f4f4d8'}
        padding={15}
        key={room.id}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FlexBox>
          <CustomText value={room.name!} fontSize={14} fontWeight="bold" />
          <CustomText
            value={
              (room?.room_type && capitalizeFirstLetter(room.room_type!)) ||
              undefined
            }
          />
        </FlexBox>

        <FlexBox
          backgroundColor={theme.colors.primary}
          padding={5}
          style={{
            borderRadius: 5,
          }}
          alignItems="center"
        >
          <CustomText
            value={`$${room.rent_per_day}`}
            fontColor="#fff"
            fontWeight="bold"
          />
        </FlexBox>
      </FlexBox>
    </TouchableOpacity>
  );
};

export default HotelRoomDetail;
