import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../hooks/useAuth";

export default function UserHome() {
  const { getUser, signOut } = useAuth();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  console.log("UserHome", user);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.container}
    >
      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcm5WldpI23UcsikhxKoz_ZpcyDS19ryItSw&s" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    shadowColor: "#000",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#e53935",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
