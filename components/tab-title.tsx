import { View, Text } from 'react-native';
import React from 'react';
import FlexBox from './flexbox';
import CustomText from './custom-text';
import { PRIMARY_COLOR } from '@/constants';
import { normaliseUnit } from '@/helpers/helpers';
import type { ColorValue } from 'react-native';
interface TabTitleProps {
  title: string;
  caption?: string;
  size?: number;
  fontColor?: ColorValue;
}

const TabTitle = (props: TabTitleProps) => {
  return (
    <FlexBox gap={3} paddingVertical={10}>
      <CustomText
        value={props.title}
        fontSize={normaliseUnit(props.size) ?? normaliseUnit(25)}
        fontWeight="bold"
        fontColor={props.fontColor ?? PRIMARY_COLOR}
      />
      {props.caption && (
        <CustomText
          value={props.caption}
          fontSize={normaliseUnit(14)}
          fontWeight="bold"
          fontColor="#545454"
        />
      )}
    </FlexBox>
  );
};

export default TabTitle;
