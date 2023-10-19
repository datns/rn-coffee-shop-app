import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Box from './Box';
import CustomIcon from './CustomIcon';
import { Image, StyleSheet } from "react-native";
import {useTheme} from '@shopify/restyle';
import { BORDER_RADIUS, SPACING, Theme } from "../theme";

const Header = () => {
  const theme = useTheme<Theme>();
  const {colors, spacing, fontSize} = theme;
  return (
    <Box
      flexDirection={'row'}
      justifyContent="space-between"
      paddingHorizontal="spacing_24"
    >
      <LinearGradient
        colors={[colors.primaryBlack, colors.darkGrey]}
        style={styles.gradientBg}
        end={{x: 0, y: 0}}
        start={{x: 1, y: 1}}>
        <CustomIcon
          name="menu"
          size={fontSize.size_16}
          color={theme.colors.mediumGrey}
        />
      </LinearGradient>
      <Box
        width={30}
        height={30}
        borderRadius="radius_8"
        borderWidth={1}
        borderColor="primaryBlack">
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRzHHirDMQU_v0RHsILVKVt2O2RzpYR_EA_wiH5XaZQiOO_SBqb_8clGzD2cNXMTFoB0&usqp=CAU',
          }}
          style={styles.profileImage}
          borderRadius={8}
        />
      </Box>
    </Box>
  );
};

export default Header;

const styles = StyleSheet.create({
  gradientBg: {
    padding: SPACING.spacing_8,
    borderRadius: BORDER_RADIUS.radius_10,
    borderWidth: 1,
    borderColor: '#21262E',
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
  }
})

