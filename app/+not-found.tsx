import { Link, Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="flex-1 items-center justify-center px-5">
        <ThemedText type="title" className="text-2xl text-center font-bold">
          This screen doesn't exist.
        </ThemedText>
        <Link href="/home" className="mt-12">
          <ThemedText type="link" className="text-blue-600 text-lg">
            Go Back
          </ThemedText>
        </Link>
        <Link href="/" className="mt-8">
          <ThemedText type="link" className="text-red-600 text-lg">
            Exit to Homescreen
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
