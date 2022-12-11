import React, {useEffect} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

import Toast from 'react-native-toast-message';

import {connect} from 'react-redux';
import {loginUserWithFB, setApp} from '../../redux/actions';

import {useForm, Controller} from 'react-hook-form';

import styles from './styles';

const mapStateToProps = states => ({app: states.app});

const mapDispatchToProps = dispatch => ({dispatch});

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  const {navigate} = props.navigation;
  const {dispatch, app} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    dispatch(setApp('username', data.email));
    dispatch(setApp('password', data.password));
    dispatch(loginUserWithFB());
  };

  useEffect(() => {
    if (!app.loginLoading) {
      if (app.error.state) {
        Toast.show({
          type: 'error',
          text1: app.error.message,
        });
      }
    }
  }, [app.error.message, app.error.state, app.loginLoading]);

  return (
    <>
      <View style={styles.platform} />
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/keepbuy.png')}
          style={styles.image}
        />
        <Text style={styles.header}>KeepBuy(bye...)</Text>

        <Text style={styles.text}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.error}>Email is required.</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="password"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.error}>Password is required.</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text onPress={() => navigate('Register')} style={styles.signupButton}>
          New User
        </Text>
      </View>
    </>
  );
});

export {Login};
