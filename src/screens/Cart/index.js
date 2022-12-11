import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DeleteButton} from '../../components/DeleteButton';

import {connect} from 'react-redux';

import {
  firebaseProductsListener,
  requestRemoveProductFromFirebase,
  requestUpdateProductToFirebase,
} from '../../redux/actions/app';

import styles from './styles';

const mapStateToProps = states => ({app: states.app});
const mapDispatchToProps = dispatch => ({dispatch});

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  const {app, dispatch} = props;

  const [total, setTotal] = useState(null);

  useEffect(() => {
    dispatch(firebaseProductsListener());
    return () => {
      if (global.firebaseProductsListenerOff) {
        global.firebaseProductsListenerOff();
      }
    };
  }, []);

  const getTotal = app.cart
    ?.map(item => {
      return item.price * item.quantity;
    })
    .reduce((a, b) => a + b, 0);

  const checkOut = async () => {
    try {
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    props.navigation.navigate('Home');
  };

  const renderProducts = ({item}) => {
    return (
      <View style={styles.productContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            props.navigation.navigate('ProductDetail', {productId: item.id})
          }>
          <Image source={{uri: item.thumbnail}} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.productInfo}>
          <View>
            <Text style={styles.productTitle}>{item.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </View>

          <View style={styles.productButtons}>
            <View style={styles.numberOfProducts}>
              <TouchableOpacity
                style={item.quantity === 1 ? styles.isOne : styles.minusButton}
                disabled={item.quantity === 1 ? true : false}
                onPress={() => {
                  dispatch(
                    requestUpdateProductToFirebase(
                      item.value,
                      item.quantity - 1,
                    ),
                  );
                  dispatch(firebaseProductsListener());
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={styles.materialIcon}
                />
              </TouchableOpacity>

              <Text>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => {
                  dispatch(
                    requestUpdateProductToFirebase(
                      item.value,
                      item.quantity + 1,
                    ),
                  );
                  dispatch(firebaseProductsListener());
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={styles.materialIcon}
                />
              </TouchableOpacity>
            </View>
            <DeleteButton
              handlePress={() =>
                dispatch(requestRemoveProductFromFirebase(item.key, item.value))
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.secondaryTitle}>My Cart</Text>
          {app.cart?.length > 0 ? (
            <TouchableOpacity
              onPress={() => dispatch(requestRemoveProductFromFirebase())}>
              <Text style={styles.removeTitle}>Clear Cart</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={app.cart}
          ListEmptyComponent={<Text>There is no product in your cart</Text>}
          renderItem={renderProducts}
          keyExtractor={item => item.id}
          paddingHorizontal={16}
        />
      </View>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          onPress={() => (total !== 0 ? checkOut() : null)}
          style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECKOUT (${getTotal})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export {Cart};
