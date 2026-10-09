import { createPost, getPosts } from "@/api/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const client = useQueryClient();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>{`Error: ${error.message}`}</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      {data?.map((post) => {
        return (
          <Link style={styles.post} href={`/post/${post.id}`} key={post.id}>
            <View>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.author}>{post.body}</Text>
            </View>
          </Link>
        );
      })}
      <Button
        title='Skapa inlägg'
        onPress={() =>
          mutation.mutate({
            title: "ExpressJS is shit",
            body: "Hono is the best most amazing life force. Happy sky.",
            author: "Hono Team",
            publishedAt: "2026-03-04T00:00:00.000Z",
          })
        }></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    width: "100%",
  },
  post: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
  },
  author: {
    fontSize: 16,
    fontWeight: 500,
  },
});
