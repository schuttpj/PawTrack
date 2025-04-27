import { supabase } from "./supabase";
import { Database } from "../types/database.types";

// Dog Profile APIs
export async function getDogProfile(dogId: string) {
  const { data, error } = await supabase
    .from("dogs")
    .select("*")
    .eq("id", dogId)
    .single();

  if (error) throw error;
  return data;
}

export async function getDogWalks(dogId: string) {
  const { data, error } = await supabase
    .from("walks")
    .select("*")
    .eq("dog_id", dogId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getDogAchievements(dogId: string) {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("dog_id", dogId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

// Walk APIs
export async function saveWalk(
  walkData: Database["public"]["Tables"]["walks"]["Insert"],
) {
  const { data, error } = await supabase
    .from("walks")
    .insert(walkData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Social Feed APIs
export async function getPosts(
  filter: "all" | "friends" | "nearby" | "popular" = "all",
) {
  let query = supabase.from("posts").select(`
      *,
      users:user_id(*),
      dogs:dog_id(*),
      comments:comments(*)
    `);

  // Apply filters
  if (filter === "popular") {
    // Sort by most comments/likes
    query = query.order("created_at", { ascending: false });
  } else if (filter === "nearby") {
    // In a real app, would filter by geolocation
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createPost(
  postData: Database["public"]["Tables"]["posts"]["Insert"],
) {
  const { data, error } = await supabase
    .from("posts")
    .insert(postData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addComment(
  commentData: Database["public"]["Tables"]["comments"]["Insert"],
) {
  const { data, error } = await supabase
    .from("comments")
    .insert(commentData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Leaderboard APIs
export async function getTopDogs() {
  // This would be a more complex query in a real app
  // Calculating total distance walked by each dog
  const { data, error } = await supabase.from("dogs").select(`
      *,
      users:owner_id(*),
      walks:walks(*)
    `);

  if (error) throw error;
  return data;
}

export async function getPopularRoutes() {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("popularity", { ascending: false });

  if (error) throw error;
  return data;
}
