import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

function HomeScreen({ navigation }:any) {
    return (
      <SafeAreaView style={styles.sectionContainer}>
        <Button
          title="Lobby"
          onPress={() => navigation.navigate('Lobby')}
        />
      </SafeAreaView>
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
  });