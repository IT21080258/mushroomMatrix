import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import axios from 'axios';

type ImageType = {
  uri: string;
  type: string;
  fileName: string;
};

const App: React.FC = () => {
  const [image, setImage] = useState<ImageType | null>(null);

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response: ImagePickerResponse) => {
        console.log('ImagePicker Response:', response); // Log the response to understand its structure

        if (response.didCancel) {
          Alert.alert('User cancelled image picker');
        } else if (response.errorCode) { // Changed response.error to response.errorCode
          Alert.alert('ImagePicker Error: ', response.errorMessage || response.errorCode); // Use errorMessage if available
        } else if (response.assets && response.assets.length > 0) { // Ensure assets exist and have at least one item
          const selectedImage: Asset = response.assets[0];
          if (selectedImage.uri) { // Check if uri exists
            setImage({
              uri: selectedImage.uri,
              type: selectedImage.type || 'image/jpeg', // Provide a default type if necessary
              fileName: selectedImage.fileName || 'image.jpg', // Provide a default fileName if necessary
            });
          } else {
            Alert.alert('ImagePicker Error: URI not found');
          }
        } else {
          Alert.alert('ImagePicker Error: No assets found');
        }
      }
    );
  };

  // Uncomment this function to enable image upload
  /*
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    try {
      const res = await axios.post('http://your-server-url/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  */

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImage} />
      {image && image.uri && ( // Ensure image.uri exists before rendering
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}
      {/* Uncomment the button below to enable image upload */}
      {/* <Button title="Upload Image" onPress={uploadImage} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default App;
