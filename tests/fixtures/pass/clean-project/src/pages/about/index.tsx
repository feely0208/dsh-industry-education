import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>家校通</Text>
      <Text style={styles.version}>版本 3.1.2</Text>
      <Text style={styles.line}>教育移动应用备案号：教APP备1100849号</Text>
      <Text style={styles.line}>适龄范围：8 周岁以上</Text>
      <Text style={styles.line}>开发者：示例教育科技有限公司</Text>
      <Text style={styles.line}>联系邮箱：support@example.edu.cn</Text>
      <Text style={styles.footer}>© 2026 示例教育科技有限公司</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' },
  version: { fontSize: 14, color: '#666', marginTop: 4 },
  line: { fontSize: 14, color: '#333', marginTop: 12 },
  footer: { fontSize: 12, color: '#999', marginTop: 32 },
});
