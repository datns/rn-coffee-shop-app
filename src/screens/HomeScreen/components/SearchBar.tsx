import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from '../../../theme';
import Box from '../../../components/Box';
import CustomIcon from '../../../components/CustomIcon';

const SearchBar: React.FC = () => {
  const [text, setText] = React.useState<string>('');
  return (
    <Box
      backgroundColor="darkGrey"
      borderRadius={'radius_16'}
      paddingVertical="spacing_12"
      flexDirection="row">
      <CustomIcon
        name="search"
        style={styles.icon}
        size={FONT_SIZE.font_18}
        color={COLORS.mediumGrey}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Find Your Coffee..."
        placeholderTextColor={COLORS.mediumGrey}
      />
    </Box>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: SPACING.spacing_18,
  },
});
