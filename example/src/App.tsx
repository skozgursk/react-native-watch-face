import * as React from 'react';
import RNFS from 'react-native-fs';

import { StyleSheet, View, Text, Button } from 'react-native';
import { addWatchFace } from 'react-native-watch-face';

export default function App() {
  const [result, setResult] = React.useState<boolean | undefined>();
  async function handlePress() {
    try {
      const fileUrl = 'http://localhost/Astronomy.watchface';
      const tempDir = RNFS.TemporaryDirectoryPath;
      const tempFilePath = `${tempDir}/Astronomy.watchface`;

      const download = RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: tempFilePath,
      });

      download.promise
        .then((response) => {
          if (response.statusCode === 200) {
            addWatchFace(tempFilePath).then((r) => {
              setResult(r);
            });
          } else {
            console.error(response.statusCode);
          }
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    } catch (error) {
      console.error('Error adding watch face:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button onPress={handlePress} title="add Watch Face"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
