import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color="#fff" />
        </View>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="#0782F9" />
          <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    backgroundColor: "#0782F9",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  emailText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#0782F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProfileScreen;
