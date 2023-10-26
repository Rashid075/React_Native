import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigation from './src/Navigations';
import { apiCall } from './src/api/OpenAI';

const App = () => {
  return <AppNavigation />;
};

export default App;

const styles = StyleSheet.create({});
