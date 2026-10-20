import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchMyScore } from '../../api/score';

export default function HomeScreen() {
  const [myScore, setMyScore] = React.useState<number | null>(null);

  async function loadMyScore() {
    const data = await fetchMyScore('mid-term-2026');
    setMyScore(data.score);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的成绩</Text>
      <Text style={styles.hint}>成绩仅本人可见，不展示他人信息</Text>
      <Text onPress={loadMyScore}>查看我的成绩</Text>
      {myScore !== null && <Text>{`我的成绩：${myScore} 分`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  hint: { fontSize: 13, color: '#666', marginTop: 8 },
});
