import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
  dailyAlarmEnabled: boolean;
  alarmHour: number;
  alarmMinute: number;
}

const STORAGE_KEY = '@fortune_settings';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    dailyAlarmEnabled: false,
    alarmHour: 8,
    alarmMinute: 0,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.log('설정 불러오기 실패');
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (e) {
      console.log('설정 저장 실패');
    }
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
                {/* 시간 */}
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

                {/* 분 */}
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

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>개발</Text>
            <Text style={styles.infoValue}>운명의 거울</Text>
          </View>
        </View>

        {/* 솔직한 안내 */}
        <View style={styles.honestBox}>
          <Text style={styles.honestTitle}>💬 솔직한 안내</Text>
          <Text style={styles.honestText}>
            이 앱은 재미와 자기 성찰을 위한 것입니다.{'\n\n'}
            • 운세로 중요한 결정을 하지 마세요{'\n'}
            • 사주는 "운명"이 아닌 "경향성"입니다{'\n'}
            • 당신의 선택이 운세보다 중요합니다{'\n\n'}
            운세가 좋으면 참고하고,{'\n'}
            나쁘면 무시하셔도 됩니다. 😊
          </Text>
        </View>

        {/* 웹 알림 안내 */}
        {Platform.OS === 'web' && (
          <View style={styles.webNotice}>
            <Text style={styles.webNoticeText}>
              ⚠️ 웹 버전에서는 푸시 알림이 제한됩니다.{'\n'}
              앱 설치 시 정상적으로 알림을 받을 수 있습니다.
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
    marginBottom: 16,
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
