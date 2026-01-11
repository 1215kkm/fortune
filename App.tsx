import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import {
  HomeScreen,
  UserInputScreen,
  SajuResultScreen,
  TarotReadingScreen,
  TarotResultScreen,
  QuestionTestScreen,
  TestResultScreen,
  SituationFortuneScreen,
  SituationResultScreen,
  SettingsScreen,
} from './src/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#1E1E2E',
  },
  headerTintColor: '#7C4DFF',
  headerTitleStyle: {
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  contentStyle: {
    backgroundColor: '#121220',
  },
  // 화면 전환 애니메이션 설정
  animation: 'slide_from_right' as const,
  animationDuration: 300,
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{
            title: '운명의 거울',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserInput"
          component={UserInputScreen}
          options={{
            title: '사주 분석',
            headerBackTitle: '뒤로',
          }}
        />
        <Stack.Screen
          name="SajuResult"
          component={SajuResultScreen}
          options={{
            title: '분석 결과',
            headerBackTitle: '뒤로',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="TarotReading"
          component={TarotReadingScreen}
          options={{
            title: '타로 리딩',
            headerBackTitle: '뒤로',
          }}
        />
        <Stack.Screen
          name="TarotResult"
          component={TarotResultScreen}
          options={{
            title: '리딩 결과',
            headerBackTitle: '뒤로',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="QuestionTest"
          component={QuestionTestScreen}
          options={{
            title: '질문형 운세',
            headerBackTitle: '뒤로',
          }}
        />
        <Stack.Screen
          name="TestResult"
          component={TestResultScreen}
          options={{
            title: '테스트 결과',
            headerBackTitle: '뒤로',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="SituationFortune"
          component={SituationFortuneScreen}
          options={{
            title: '상황별 운세',
            headerBackTitle: '뒤로',
          }}
        />
        <Stack.Screen
          name="SituationResult"
          component={SituationResultScreen}
          options={{
            title: '운세 결과',
            headerBackTitle: '뒤로',
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: '설정',
            headerBackTitle: '뒤로',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
