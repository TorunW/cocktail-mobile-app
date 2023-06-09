import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebaseConfig';
import { COLORS } from '../constants';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useStoreActions } from 'easy-peasy';

const ImageUploader = () => {
  const action = useStoreActions((actions) => actions);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
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
        height: 100,
        backgroundColor: COLORS.grad3,
        borderRadius: 5,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <TouchableOpacity
        style={{
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          height: 30,
          backgroundColor: COLORS.grad2,
          borderRadius: 5,
          elevation: 1,
        }}
        onPress={pickImage}
      >
        <Text>Pick an Image {isUploading && 'im uploading'}</Text>
      </TouchableOpacity>
      <View>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 250, height: 50, marginBottom: 20 }}
          />
        )}
        <TouchableOpacity
          style={{
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            backgroundColor: COLORS.grad2,
            borderRadius: 5,
            elevation: 1,
          }}
          onPress={uploadImage}
        >
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageUploader;
