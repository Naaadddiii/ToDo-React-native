import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTasks } from "../context/TaskContext";

type Task = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

const priorityCards = [
  { id: "1", title: "All", color: "#4A90E2" },
  { id: "2", title: "Low", color: "#4CAF50" },
  { id: "3", title: "Medium", color: "#FFA000" },
  { id: "4", title: "High", color: "#F44336" },
];

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

// Add interface for the card item
interface PriorityCard {
  id: string;
  title: string;
  color: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const { tasks } = useTasks();

  const renderPriorityCard = ({ item }: { item: PriorityCard }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => setSelectedPriority(item.title)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardCount}>{getTaskCount(item.title)}</Text>
    </TouchableOpacity>
  );

  const getTaskCount = (priority: string) => {
    if (priority === "All") return tasks.length;
    return tasks.filter(
      (task) => task.priority.toLowerCase() === priority.toLowerCase()
    ).length;
  };

  const filteredTasks = tasks.filter((task) =>
    selectedPriority === "All"
      ? true
      : task.priority.toLowerCase() === selectedPriority.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome {auth.currentUser?.email}
        </Text>
      </View>

      <View style={styles.cardsSection}>
        <FlatList
          scrollEnabled={false}
          data={priorityCards}
          renderItem={renderPriorityCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
        />
      </View>

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            {selectedPriority} Tasks ({filteredTasks.length})
          </Text>
        </View>

        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <View style={[styles.taskItem, styles[`${item.priority}Priority`]]}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsSection: {
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  cardRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardCount: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 2,
  },
  lowPriority: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
  },
  mediumPriority: {
    borderLeftWidth: 5,
    borderLeftColor: "#FFA000",
  },
  highPriority: {
    borderLeftWidth: 5,
    borderLeftColor: "#F44336",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listHeader: {
    paddingVertical: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
