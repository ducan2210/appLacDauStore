import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import CustomGoogleSigninButton from './CustomGoogleSigninButton';
const BtnLoginGG = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // Khai báo đúng kiểu User hoặc null
  GoogleSignin.configure({
    webClientId:
      '629627177990-9ne7td287mpqrvqn34kkss8p8ljfdhr2.apps.googleusercontent.com',
  });
  // Somewhere in your code
  const signIn = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const response = await GoogleSignin.signIn();
      console.log('response', response.data);
      // Try the new style of google-sign in result, from v13+ of that module
      const idToken = response.data?.idToken;
      if (!idToken) {
        console.error('ID token is missing or invalid.');
        return;
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    // return <GoogleSigninButton onPress={signIn}></GoogleSigninButton>;
    return <CustomGoogleSigninButton onPress={signIn} />;
  }
  return (
    <View>
      <Text>
        Welcome {user?.email}, {user?.displayName}
      </Text>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>sign-out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BtnLoginGG;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function setState(arg0: {
  userInfo: import('@react-native-google-signin/google-signin').User;
}) {
  throw new Error('Function not implemented.');
}
