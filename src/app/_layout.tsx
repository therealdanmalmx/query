import UseQueryFocus from "@/hooks/use-query-focus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const client = new QueryClient();

export default function RootLayout() {
  UseQueryFocus();
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ title: "Blog" }} />
    </QueryClientProvider>
  );
}
