import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { fetchScoreRank } from '../../api/score';

export default function HomeScreen() {
  const [rank, setRank] = React.useState<string[]>([]);

  async function loadRank() {
    const data = await fetchScoreRank('mid-term-2026');
    setRank(data.list.map((item: { name: string }) => item.name));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>本次期中考试成绩排名</Text>
      <Text style={styles.hint}>家长可查看孩子在班级中的名次</Text>
      <Button title="查看班级榜单" onPress={loadRank} />
      {rank.map((name, i) => (
        <Text key={name}>{`第 ${i + 1} 名 ${name}`}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  hint: { fontSize: 13, color: '#666', marginTop: 8 },
});
