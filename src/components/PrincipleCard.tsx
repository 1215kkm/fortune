import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface PrincipleCardProps {
  title: string;
  content: string;
  icon?: string;
}

export const PrincipleCard: React.FC<PrincipleCardProps> = ({ title, content, icon = '📖' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <ScrollView style={styles.content} nestedScrollEnabled>
          <Text style={styles.contentText}>{content}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3D3D5C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0FF',
    flex: 1,
  },
  expandIcon: {
    fontSize: 12,
    color: '#8888AA',
  },
  content: {
    maxHeight: 300,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#B0B0CC',
  },
});
