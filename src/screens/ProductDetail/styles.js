import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  scroolView: {
    width: '100%',
    backgroundColor: '#F0F0F3',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  imagesContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  images: {
    width: '16%',
    height: 2.4,
    backgroundColor: '#000000',
    marginHorizontal: 4,
    borderRadius: 100,
  },
  singleImageContainer: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  upperInfo: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: '#000000',
    maxWidth: '84%',
  },
  description: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    maxWidth: '85%',
    maxHeight: 44,
    marginBottom: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '85%',
    color: '#000000',
    marginBottom: 4,
  },
  buttonContainer: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00AC76',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    fontSize: 30,
  },
});

export default styles;
