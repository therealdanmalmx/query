import { getPostById } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PostItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.body}>{data?.body}</Text>
      <Text style={styles.body}>{data?.author}</Text>
      <Text style={styles.body}>{data?.publishedAt.split("T")[0]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  post: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
  },
  body: {
    fontSize: 16,
    fontWeight: 500,
  },
});
