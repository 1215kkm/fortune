import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, UserInfo } from '../types';
import { analyzeSaju } from '../services/sajuService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const UserInputScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLunar, setIsLunar] = useState(false);
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);

  const handleAnalyze = () => {
    // 기본 검증
    if (!name.trim()) {
      Alert.alert('알림', '이름을 입력해주세요');
      return;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (!year || !month || !day || isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
      Alert.alert('알림', '생년월일을 올바르게 입력해주세요');
      return;
    }

    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      Alert.alert('알림', '올바른 연도를 입력해주세요');
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      Alert.alert('알림', '올바른 월을 입력해주세요 (1-12)');
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      Alert.alert('알림', '올바른 일을 입력해주세요 (1-31)');
      return;
    }

    let birthTime = 'unknown';
    if (!isTimeUnknown) {
      const hourNum = parseInt(hour) || 0;
      const minuteNum = parseInt(minute) || 0;
      if (hourNum >= 0 && hourNum < 24 && minuteNum >= 0 && minuteNum < 60) {
        birthTime = `${hourNum.toString().padStart(2, '0')}:${minuteNum.toString().padStart(2, '0')}`;
      }
    }

    const userInfo: UserInfo = {
      name: name.trim(),
      birthDate: new Date(yearNum, monthNum - 1, dayNum),
      birthTime,
      gender,
      isLunar,
    };

    const result = analyzeSaju(userInfo);
    navigation.navigate('SajuResult', { userInfo, result });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>사주 분석</Text>
          <Text style={styles.subtitle}>
            생년월일시 정보를 입력해주세요
          </Text>
        </View>

        {/* 이름 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#5A5A7A"
          />
        </View>

        {/* 생년월일 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>생년월일</Text>
          <View style={styles.dateRow}>
            <TextInput
              style={[styles.textInput, styles.dateInput]}
              value={year}
              onChangeText={setYear}
              placeholder="년도"
              placeholderTextColor="#5A5A7A"
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={[styles.textInput, styles.dateInput, styles.dateInputSmall]}
              value={month}
              onChangeText={setMonth}
              placeholder="월"
              placeholderTextColor="#5A5A7A"
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              style={[styles.textInput, styles.dateInput, styles.dateInputSmall]}
              value={day}
              onChangeText={setDay}
              placeholder="일"
              placeholderTextColor="#5A5A7A"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </View>

        {/* 음력/양력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>달력 종류</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleButton, !isLunar && styles.toggleButtonActive]}
              onPress={() => setIsLunar(false)}
            >
              <Text style={[styles.toggleText, !isLunar && styles.toggleTextActive]}>
                양력 ☀️
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, isLunar && styles.toggleButtonActive]}
              onPress={() => setIsLunar(true)}
            >
              <Text style={[styles.toggleText, isLunar && styles.toggleTextActive]}>
                음력 🌙
              </Text>
            </TouchableOpacity>
          </View>
          {isLunar && (
            <Text style={styles.warningText}>
              ⚠️ 음력 변환은 간이 계산입니다. 정확한 분석은 양력 권장
            </Text>
          )}
        </View>

        {/* 태어난 시간 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>태어난 시간</Text>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsTimeUnknown(!isTimeUnknown)}
          >
            <View style={[styles.checkbox, isTimeUnknown && styles.checkboxChecked]}>
              {isTimeUnknown && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>시간 모름</Text>
          </TouchableOpacity>

          {!isTimeUnknown && (
            <View style={styles.timeRow}>
              <TextInput
                style={[styles.textInput, styles.timeInput]}
                value={hour}
                onChangeText={setHour}
                placeholder="시"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                style={[styles.textInput, styles.timeInput]}
                value={minute}
                onChangeText={setMinute}
                placeholder="분"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          )}

          {isTimeUnknown && (
            <Text style={styles.infoText}>
              💡 시간을 모르면 시주(時柱) 없이 분석합니다.{'\n'}
              80% 정도의 정보로 해석되며, 이것도 충분히 의미 있습니다.
            </Text>
          )}
        </View>

        {/* 성별 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleButton, gender === 'male' && styles.toggleButtonActive]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.toggleText, gender === 'male' && styles.toggleTextActive]}>
                남성 ♂
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, gender === 'female' && styles.toggleButtonActive]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.toggleText, gender === 'female' && styles.toggleTextActive]}>
                여성 ♀
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>
            💡 전통 사주에서 성별은 대운 흐름 방향에 영향을 줍니다.{'\n'}
            하지만 이 앱에서는 환경 반응 분석에는 큰 차이 없습니다.
          </Text>
        </View>

        <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
          <Text style={styles.analyzeButtonText}>분석하기</Text>
        </TouchableOpacity>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            📌 입력된 정보는 분석에만 사용되며 저장되지 않습니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121220',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8888AA',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E0E0FF',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    textAlign: 'center',
  },
  dateInputSmall: {
    flex: 0.5,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeInput: {
    width: 80,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  toggleButtonActive: {
    backgroundColor: '#3D3D6E',
    borderColor: '#6366F1',
  },
  toggleText: {
    fontSize: 15,
    color: '#8888AA',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#5A5A7A',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#B0B0CC',
  },
  warningText: {
    marginTop: 10,
    fontSize: 12,
    color: '#FFA726',
    lineHeight: 18,
  },
  infoText: {
    marginTop: 10,
    fontSize: 12,
    color: '#8888AA',
    lineHeight: 18,
  },
  analyzeButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  analyzeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disclaimer: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#1E1E2E',
    borderRadius: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#8888AA',
    textAlign: 'center',
  },
});
