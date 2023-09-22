import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebaseConfig';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useStoreActions } from 'easy-peasy';
import { ImageIcon } from '../assets/icons/Icon';

const ImageUploader = ({ setIsImageSubmitted }) => {
  const action = useStoreActions((actions) => actions);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri };
    setImage(source);
  };

  const uploadImage = async () => {
    setIsUploading(true);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image.uri, true);
      xhr.send(null);
    });
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    const fileType = filename.split('.')[filename.split('.').length - 1];
    var storageRef = ref(storage, `images/${filename}`);
    const metadata = {
      contentType: `image/${fileType}`,
    };
    uploadBytes(storageRef, blob, metadata)
      .then((snapshot) => {
        setIsUploading(false);
        setIsImageSubmitted(true);
        getUrl(filename);
      })
      .catch((err) => {
        console.log(err);
        setIsUploading(false);
      });
  };

  const getUrl = (filename) => {
    getDownloadURL(ref(storage, `images/${filename}`))
      .then((url) => {
        action.drinks.setImage(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error.message);
      });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.midPink,
        gap: SPACING.xs,
        height: Dimensions.get('window').height,
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.l,
      }}
    >
      <Text style={styles.title}>Image Upload</Text>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image
            source={{ uri: image.uri }}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <ImageIcon size={SIZES.iconL} />
        )}
      </View>
      {isUploading === false ? (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.font}>
            {image !== null ? '  Change Image' : 'Pick an Image'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.inactive}>Pick an Image</Text>
        </TouchableOpacity>
      )}

      {image !== null ? (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.font}>Upload Image</Text>
        </TouchableOpacity>
      ) : isUploading === true ? (
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator size='small' color={COLORS.black} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={(styles.font, styles.inactive)}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  button: {
    minWidth: '50%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.deepPink,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    marginVertical: SPACING.xs,
  },
  inactiveButton: {
    minWidth: '50%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.deepPink,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    marginVertical: SPACING.xs,
    opacity: 0.5,
  },
  inactive: {
    color: COLORS.grey,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  font: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
  imageContainer: {
    height: 500,
    backgroundColor: COLORS.pinkTransparent,
    width: '100%',
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageUploader;
