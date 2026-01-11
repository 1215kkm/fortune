import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
  dailyAlarmEnabled: boolean;
  alarmHour: number;
  alarmMinute: number;
}

export interface MyProfile {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  birthMinute: string;
  gender: 'male' | 'female';
  isLunar: boolean;
}

const SETTINGS_KEY = '@fortune_settings';
export const PROFILE_KEY = '@fortune_profile';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    dailyAlarmEnabled: false,
    alarmHour: 8,
    alarmMinute: 0,
  });

  const [profile, setProfile] = useState<MyProfile>({
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '',
    birthMinute: '',
    gender: 'male',
    isLunar: false,
  });

  const [isProfileSaved, setIsProfileSaved] = useState(false);

  useEffect(() => {
    loadSettings();
    loadProfile();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.log('설정 불러오기 실패');
    }
  };

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
        setIsProfileSaved(true);
      }
    } catch (e) {
      console.log('프로필 불러오기 실패');
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (e) {
      console.log('설정 저장 실패');
    }
  };

  const saveProfile = async () => {
    if (!profile.name || !profile.birthYear || !profile.birthMonth || !profile.birthDay) {
      Alert.alert('알림', '이름과 생년월일을 입력해주세요');
      return;
    }

    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setIsProfileSaved(true);
      Alert.alert('저장 완료', '내 사주 정보가 저장되었습니다.\n오늘의 운세가 내 사주를 기반으로 계산됩니다.');
    } catch (e) {
      Alert.alert('오류', '저장에 실패했습니다');
    }
  };

  const clearProfile = async () => {
    Alert.alert(
      '프로필 삭제',
      '저장된 사주 정보를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem(PROFILE_KEY);
            setProfile({
              name: '',
              birthYear: '',
              birthMonth: '',
              birthDay: '',
              birthHour: '',
              birthMinute: '',
              gender: 'male',
              isLunar: false,
            });
            setIsProfileSaved(false);
          },
        },
      ]
    );
  };

  const toggleAlarm = () => {
    const newSettings = {
      ...settings,
      dailyAlarmEnabled: !settings.dailyAlarmEnabled,
    };
    saveSettings(newSettings);

    if (!settings.dailyAlarmEnabled) {
      Alert.alert(
        '알림 설정',
        `매일 ${settings.alarmHour}:${settings.alarmMinute.toString().padStart(2, '0')}에 오늘의 운세를 알려드릴게요.\n\n※ 웹에서는 알림이 제한될 수 있습니다.`,
        [{ text: '확인' }]
      );
    }
  };

  const changeTime = (type: 'hour' | 'minute', delta: number) => {
    let newHour = settings.alarmHour;
    let newMinute = settings.alarmMinute;

    if (type === 'hour') {
      newHour = (settings.alarmHour + delta + 24) % 24;
    } else {
      newMinute = (settings.alarmMinute + delta + 60) % 60;
    }

    saveSettings({
      ...settings,
      alarmHour: newHour,
      alarmMinute: newMinute,
    });
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>설정</Text>
        </View>

        {/* 내 사주 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌳 내 사주 정보</Text>
          <Text style={styles.sectionDesc}>
            저장하면 오늘의 운세가 내 사주를 기반으로 계산됩니다
          </Text>

          {/* 이름 */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>이름</Text>
            <TextInput
              style={styles.textInput}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholder="이름"
              placeholderTextColor="#5A5A7A"
            />
          </View>

          {/* 생년월일 */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>생년월일</Text>
            <View style={styles.dateInputRow}>
              <TextInput
                style={[styles.textInput, styles.dateInput]}
                value={profile.birthYear}
                onChangeText={(text) => setProfile({ ...profile, birthYear: text })}
                placeholder="년"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={4}
              />
              <TextInput
                style={[styles.textInput, styles.dateInputSmall]}
                value={profile.birthMonth}
                onChangeText={(text) => setProfile({ ...profile, birthMonth: text })}
                placeholder="월"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                style={[styles.textInput, styles.dateInputSmall]}
                value={profile.birthDay}
                onChangeText={(text) => setProfile({ ...profile, birthDay: text })}
                placeholder="일"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>

          {/* 태어난 시간 */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>태어난 시간 (선택)</Text>
            <View style={styles.timeInputRow}>
              <TextInput
                style={[styles.textInput, styles.timeInput]}
                value={profile.birthHour}
                onChangeText={(text) => setProfile({ ...profile, birthHour: text })}
                placeholder="시"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparatorSmall}>:</Text>
              <TextInput
                style={[styles.textInput, styles.timeInput]}
                value={profile.birthMinute}
                onChangeText={(text) => setProfile({ ...profile, birthMinute: text })}
                placeholder="분"
                placeholderTextColor="#5A5A7A"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>

          {/* 성별 */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>성별</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleButton, profile.gender === 'male' && styles.toggleButtonActive]}
                onPress={() => setProfile({ ...profile, gender: 'male' })}
              >
                <Text style={[styles.toggleText, profile.gender === 'male' && styles.toggleTextActive]}>
                  남성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, profile.gender === 'female' && styles.toggleButtonActive]}
                onPress={() => setProfile({ ...profile, gender: 'female' })}
              >
                <Text style={[styles.toggleText, profile.gender === 'female' && styles.toggleTextActive]}>
                  여성
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 음력/양력 */}
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>달력</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleButton, !profile.isLunar && styles.toggleButtonActive]}
                onPress={() => setProfile({ ...profile, isLunar: false })}
              >
                <Text style={[styles.toggleText, !profile.isLunar && styles.toggleTextActive]}>
                  양력
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, profile.isLunar && styles.toggleButtonActive]}
                onPress={() => setProfile({ ...profile, isLunar: true })}
              >
                <Text style={[styles.toggleText, profile.isLunar && styles.toggleTextActive]}>
                  음력
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 저장/삭제 버튼 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>
                {isProfileSaved ? '수정하기' : '저장하기'}
              </Text>
            </TouchableOpacity>
            {isProfileSaved && (
              <TouchableOpacity style={styles.deleteButton} onPress={clearProfile}>
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            )}
          </View>

          {isProfileSaved && (
            <View style={styles.savedBadge}>
              <Text style={styles.savedBadgeText}>✓ 저장됨</Text>
            </View>
          )}
        </View>

        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 오늘의 운세 알림</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>매일 알림 받기</Text>
              <Text style={styles.settingDesc}>
                설정한 시간에 오늘의 운세를 알려드려요
              </Text>
            </View>
            <Switch
              value={settings.dailyAlarmEnabled}
              onValueChange={toggleAlarm}
              trackColor={{ false: '#3D3D5C', true: '#7C4DFF' }}
              thumbColor={settings.dailyAlarmEnabled ? '#FFFFFF' : '#888'}
            />
          </View>

          {settings.dailyAlarmEnabled && (
            <View style={styles.timePickerContainer}>
              <Text style={styles.timeLabel}>알림 시간</Text>
              <View style={styles.timePicker}>
                <View style={styles.timeColumn}>
                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => changeTime('hour', 1)}
                  >
                    <Text style={styles.timeButtonText}>▲</Text>
                  </TouchableOpacity>
                  <Text style={styles.timeValue}>
                    {settings.alarmHour.toString().padStart(2, '0')}
                  </Text>
                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => changeTime('hour', -1)}
                  >
                    <Text style={styles.timeButtonText}>▼</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.timeSeparator}>:</Text>

                <View style={styles.timeColumn}>
                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => changeTime('minute', 10)}
                  >
                    <Text style={styles.timeButtonText}>▲</Text>
                  </TouchableOpacity>
                  <Text style={styles.timeValue}>
                    {settings.alarmMinute.toString().padStart(2, '0')}
                  </Text>
                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => changeTime('minute', -10)}
                  >
                    <Text style={styles.timeButtonText}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.timeDisplay}>
                {formatTime(settings.alarmHour, settings.alarmMinute)}
              </Text>
            </View>
          )}
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ 앱 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>버전</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </View>

        {/* 솔직한 안내 */}
        <View style={styles.honestBox}>
          <Text style={styles.honestTitle}>💬 솔직한 안내</Text>
          <Text style={styles.honestText}>
            저장된 사주 정보를 기반으로 오늘의 운세가 계산되지만,{'\n'}
            이것은 전통적 해석 체계일 뿐 과학적 예측이 아닙니다.{'\n\n'}
            재미로 참고하고, 중요한 결정은 스스로 내리세요.
          </Text>
        </View>

        {Platform.OS === 'web' && (
          <View style={styles.webNotice}>
            <Text style={styles.webNoticeText}>
              ⚠️ 웹 버전에서는 푸시 알림이 제한됩니다.
            </Text>
          </View>
        )}
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
  },
  section: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E0E0FF',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#8888AA',
    marginBottom: 16,
  },
  inputRow: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#B0B0CC',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#252540',
    borderRadius: 10,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  dateInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 2,
    textAlign: 'center',
  },
  dateInputSmall: {
    flex: 1,
    textAlign: 'center',
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeInput: {
    width: 60,
    textAlign: 'center',
  },
  timeSeparatorSmall: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#252540',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  toggleButtonActive: {
    backgroundColor: '#3D3D6E',
    borderColor: '#7C4DFF',
  },
  toggleText: {
    fontSize: 14,
    color: '#8888AA',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#7C4DFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#3D3D5C',
    borderRadius: 12,
    padding: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  savedBadge: {
    marginTop: 12,
    alignItems: 'center',
  },
  savedBadgeText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 13,
    color: '#8888AA',
  },
  timePickerContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 14,
    color: '#8888AA',
    marginBottom: 12,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeButton: {
    width: 50,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A4A',
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  timeValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginVertical: 8,
    width: 60,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  timeDisplay: {
    fontSize: 16,
    color: '#7C4DFF',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  infoLabel: {
    fontSize: 15,
    color: '#B0B0CC',
  },
  infoValue: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  honestBox: {
    backgroundColor: '#2A2A3E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7C4DFF30',
  },
  honestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7C4DFF',
    marginBottom: 12,
  },
  honestText: {
    fontSize: 13,
    color: '#B0B0CC',
    lineHeight: 22,
  },
  webNotice: {
    backgroundColor: '#3D2A2A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FF6B6B30',
  },
  webNoticeText: {
    fontSize: 12,
    color: '#FF8A8A',
    textAlign: 'center',
    lineHeight: 18,
  },
});
