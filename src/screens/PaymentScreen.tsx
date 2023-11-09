import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns';

import Container from '../components/Container';
import Text from '../components/Text';
import GradientIcon from '../components/GradientIcon';
import Box from '../components/Box';
import CustomIcon from '../components/CustomIcon';
import Footer from '../components/Footer';

import {MainParamList, TabParamList} from '../navigators/types';
import {BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_SIZE, SPACING} from '../theme';
import useStore from '../store';
import LottieView from 'lottie-react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type PaymentScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainParamList, 'Payment'>,
  BottomTabScreenProps<TabParamList>
>;

const E_WALLET = [
  {
    name: 'Google Pay',
    image: require('../assets/images/gpay.png'),
  },
  {
    name: 'Apple Pay',
    image: require('../assets/images/applepay.png'),
  },
  {
    name: 'Amazon Pay',
    image: require('../assets/images/amazonpay.png'),
  },
];

const PaymentScreen: React.FC<PaymentScreenProps> = ({route, navigation}) => {
  const {price} = route.params;
  const {cart, addOrder} = useStore();
  const [method, setMethod] = useState<string>('Credit Card');
  const [loading, setLoading] = useState<boolean>(false);

  const onPay = () => {
    setLoading(true);
    addOrder({
      cart,
      total: price,
      date: format(new Date(), 'do LLLL yyyy HH:mm'),
    });
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('History');
    }, 3000);
  };

  const renderCreditCard = () => {
    return (
      <TouchableOpacity onPress={() => setMethod('Credit Card')}>
        <Box
          px="spacing_16"
          pt="spacing_12"
          pb="spacing_16"
          borderWidth={2}
          borderColor={
            method === 'Credit Card' ? 'primaryOrange' : 'primaryBlack'
          }
          borderRadius="radius_24">
          <Text
            fontFamily={FONT_FAMILY.semiBold}
            fontSize={FONT_SIZE.font_14}
            mb="spacing_12">
            Credit card
          </Text>
          <LinearGradient
            colors={[COLORS.primaryBlack, COLORS.darkGrey]}
            end={{x: 0, y: 0}}
            start={{x: 1, y: 1}}
            style={styles.creditCard}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb="spacing_36">
              <CustomIcon name="chip" size={24} color={COLORS.primaryOrange} />
              <CustomIcon name="visa" size={20} color={COLORS.primaryWhite} />
            </Box>
            <Text
              fontFamily={FONT_FAMILY.semiBold}
              fontSize={FONT_SIZE.font_14}
              letterSpacing={6}>
              3897 8923 6745 4638
            </Text>
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end">
              <Box>
                <Text
                  fontFamily={FONT_FAMILY.regular}
                  fontSize={FONT_SIZE.font_10}
                  color="lightGrey">
                  Card Holder Name
                </Text>
                <Text
                  fontFamily={FONT_FAMILY.medium}
                  fontSize={FONT_SIZE.font_16}>
                  THIEN KIM
                </Text>
              </Box>
              <Box alignItems={'flex-end'}>
                <Text
                  fontFamily={FONT_FAMILY.regular}
                  fontSize={FONT_SIZE.font_10}
                  color="lightGrey">
                  Expiry Date
                </Text>
                <Text
                  fontFamily={FONT_FAMILY.medium}
                  fontSize={FONT_SIZE.font_14}>
                  03/30
                </Text>
              </Box>
            </Box>
          </LinearGradient>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Box px="spacing_20" flex={1} style={{paddingBottom: 44}}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <GradientIcon name="back" onPress={navigation.goBack} />
          <Text fontFamily={FONT_FAMILY.semiBold} fontSize={FONT_SIZE.font_20}>
            Payment
          </Text>
          <Box width={30} aspectRatio={1} />
        </Box>
        <ScrollView
          contentContainerStyle={{
            paddingTop: SPACING.spacing_24,
            flexGrow: 1,
          }}>
          {renderCreditCard()}
          <TouchableOpacity onPress={() => setMethod('Wallet')}>
            <Box
              borderWidth={2}
              borderColor={
                method === 'Wallet' ? 'primaryOrange' : 'primaryBlack'
              }
              mt="spacing_12"
              borderRadius="radius_24">
              <LinearGradient
                colors={[COLORS.primaryBlack, COLORS.darkGrey]}
                end={{x: 0, y: 0}}
                start={{x: 1, y: 1}}
                style={styles.wallet}>
                <Box flexDirection="row">
                  <CustomIcon
                    name="wallet"
                    color={COLORS.primaryOrange}
                    size={20}
                  />
                  <Text
                    fontFamily={FONT_FAMILY.semiBold}
                    fontSize={FONT_SIZE.font_14}
                    ml="spacing_16">
                    Wallet
                  </Text>
                </Box>

                <Text fontSize={FONT_SIZE.font_14} textAlign="right">
                  $ 100.50
                </Text>
              </LinearGradient>
            </Box>
          </TouchableOpacity>

          {E_WALLET.map(item => (
            <TouchableOpacity
              onPress={() => setMethod(item.name)}
              key={item.name}>
              <Box
                borderWidth={2}
                borderColor={
                  method === item.name ? 'primaryOrange' : 'primaryBlack'
                }
                mt="spacing_12"
                borderRadius="radius_24">
                <LinearGradient
                  colors={[COLORS.primaryBlack, COLORS.darkGrey]}
                  end={{x: 0, y: 0}}
                  start={{x: 1, y: 1}}
                  style={styles.eWallet}>
                  <Image source={item.image} style={styles.eWalletImage} />
                  <Text
                    fontFamily={FONT_FAMILY.semiBold}
                    fontSize={FONT_SIZE.font_14}
                    ml="spacing_16">
                    {item.name}
                  </Text>
                </LinearGradient>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Footer
          label={'Price'}
          buttonLabel={`Pay from ${method}`}
          price={price}
          onPress={onPay}
        />
      </Box>
      {loading && (
        <Box style={styles.animation}>
          <LottieView
            source={require('../assets/lotties/successful.json')}
            style={{flex: 1}}
            autoPlay
            loop={false}
          />
        </Box>
      )}
    </Container>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  creditCard: {
    width: '100%',
    aspectRatio: 320 / 186,
    borderRadius: BORDER_RADIUS.radius_16,
    paddingTop: SPACING.spacing_16,
    paddingHorizontal: SPACING.spacing_12,
    paddingBottom: SPACING.spacing_12,
  },
  wallet: {
    borderRadius: BORDER_RADIUS.radius_24,
    paddingHorizontal: SPACING.spacing_18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  eWallet: {
    height: 50,
    borderRadius: BORDER_RADIUS.radius_24,
    paddingHorizontal: SPACING.spacing_18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  eWalletImage: {
    width: SPACING.spacing_30,
    height: SPACING.spacing_30,
  },
  animation: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primaryBlack,
  },
});
