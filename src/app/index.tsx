import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
}
type PostCreate = Omit<Post, "id">;

export default function Index() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/v1/api/posts");
      return (await res.json()) as Promise<Post[]>;
    },
  });

  const { mutate: createPost } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/v1/api/posts", {
        method: "POST",
        headers: {
          "content-typ": "application/json",
        },
        body: JSON.stringify({
          title: "Express no more ",
          body: "Don't use expressjs any longer. Hono is king",
          author: "Hono Team",
          publishedAt: new Date(),
        } satisfies PostCreate),
      });

      return res.json();
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>{`Error: ${error.message}`}</Text>;
  }
  return (
    <View style={styles.container}>
      {data?.map((post) => {
        return (
          <Link href={`/post/${post.id}` as any} key={post.id}>
            <View style={styles.post}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.author}>{post.body}</Text>
            </View>
          </Link>
        );
      })}
      <Button title='Skapa inlägg' onPress={() => createPost()}></Button>
    </View>
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
