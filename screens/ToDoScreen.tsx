import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Ionicons } from "@expo/vector-icons";

export type Task = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

const TodoScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { tasks, setTasks } = useTasks();

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setIsEditing(true);
  };

  const addTask = () => {
    if (isEditing && editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title,
                description,
                priority,
                dateTime: new Date().toISOString(),
              }
            : task
        )
      );
      setIsEditing(false);
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        dateTime: new Date().toISOString(),
        priority,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={[styles.taskItem, styles[`${item.priority}Priority`]]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTaskCompletion(item.id)}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text
          style={[styles.taskTitle, item.completed && styles.completedTask]}
        >
          {item.title}
        </Text>
        <Text style={item.completed ? styles.completedTask : undefined}>
          {item.description}
        </Text>
        <Text>Created: {new Date(item.dateTime).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => startEditing(item)}
      >
        <Ionicons name="create" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.priorityContainer}>
          {["low", "medium", "high"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityButton,
                priority === p && styles.selectedPriority,
              ]}
              onPress={() => setPriority(p as Task["priority"])}
            >
              <Text style={styles.priorityText}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>
            {isEditing ? "Update Task" : "Add Task"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateTimeButton: {
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0782F9",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#0782F9",
    fontSize: 16,
  },
  taskContent: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    flex: 1,
    marginHorizontal: 5,
  },
  selectedPriority: {
    backgroundColor: "#0782F9",
  },
  priorityText: {
    textAlign: "center",
    textTransform: "capitalize",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priorityBadge: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#0782F9",
    padding: 5,
    borderRadius: 5,
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default TodoScreen;
