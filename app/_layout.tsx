import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Provider} from 'react-redux'; // Import Provider từ Redux
import store from '@/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51QpvILKa0s3UXoTKxUM1f3dKSpsyu14zVIMFSGvKY1sZacxdOlbwLsr9dRtKkPrsxjwxhySMUdfNfPK0wiw9wMJt00SZiShd2j';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      {/* Bao bọc toàn bộ ứng dụng với Redux provider */}
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* Các màn hình trong stack */}
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="entry" options={{headerShown: false}} />
            <Stack.Screen name="moreScreen" options={{headerShown: false}} />
          </Stack>
        </ThemeProvider>
      </StripeProvider>
      <StatusBar style="auto" />
    </Provider>
  );
}
