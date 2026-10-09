import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
}

export default function Index() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/v1/api/posts");
      return (await res.json()) as Promise<Post[]>;
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
