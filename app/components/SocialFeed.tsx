import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import {
  Heart,
  MessageCircle,
  Share2,
  Camera,
  MapPin,
  Plus,
  Filter,
} from "lucide-react-native";

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  dogName: string;
  location: string;
  timestamp: string;
  text: string;
  image?: string;
  likes: number;
  comments: Comment[];
  walkStats?: {
    distance: string;
    duration: string;
    route?: string;
  };
}

interface SocialFeedProps {
  posts?: Post[];
  currentFilter?: "all" | "friends" | "nearby" | "popular";
  onFilterChange?: (filter: "all" | "friends" | "nearby" | "popular") => void;
  onLikePost?: (postId: string) => void;
  onCommentPost?: (postId: string, comment: string) => void;
  onSharePost?: (postId: string) => void;
  onCreatePost?: () => void;
}

const SocialFeed = ({
  posts = defaultPosts,
  currentFilter = "all",
  onFilterChange = () => {},
  onLikePost = () => {},
  onCommentPost = () => {},
  onSharePost = () => {},
  onCreatePost = () => {},
}: SocialFeedProps) => {
  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const handleCommentSubmit = (postId: string) => {
    if (newComment.trim()) {
      onCommentPost(postId, newComment);
      setNewComment("");
      setActiveCommentId(null);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold">Social Feed</Text>
      </View>

      {/* Filter tabs */}
      <View className="flex-row px-2 py-2 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterTab
            label="All"
            isActive={currentFilter === "all"}
            onPress={() => onFilterChange("all")}
          />
          <FilterTab
            label="Friends"
            isActive={currentFilter === "friends"}
            onPress={() => onFilterChange("friends")}
          />
          <FilterTab
            label="Nearby"
            isActive={currentFilter === "nearby"}
            onPress={() => onFilterChange("nearby")}
          />
          <FilterTab
            label="Popular"
            isActive={currentFilter === "popular"}
            onPress={() => onFilterChange("popular")}
          />
        </ScrollView>
        <TouchableOpacity className="ml-2 justify-center">
          <Filter size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Posts feed */}
      <ScrollView className="flex-1">
        {posts.map((post) => (
          <View key={post.id} className="border-b border-gray-200 p-4">
            {/* Post header */}
            <View className="flex-row items-center mb-3">
              <Image
                source={{ uri: post.userAvatar }}
                className="w-10 h-10 rounded-full"
                contentFit="cover"
              />
              <View className="ml-3">
                <Text className="font-bold">{post.username}</Text>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-xs">
                    {post.timestamp}
                  </Text>
                  {post.location && (
                    <View className="flex-row items-center ml-2">
                      <MapPin size={12} color="#6b7280" />
                      <Text className="text-gray-500 text-xs ml-1">
                        {post.location}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Post content */}
            <View className="mb-3">
              <Text className="mb-2">{post.text}</Text>
              {post.dogName && (
                <Text className="text-blue-500 mb-2">with {post.dogName}</Text>
              )}
              {post.walkStats && (
                <View className="bg-gray-100 p-3 rounded-lg mb-3">
                  <Text className="font-medium">Walk Summary</Text>
                  <View className="flex-row mt-1">
                    <Text className="text-gray-600">
                      Distance: {post.walkStats.distance}
                    </Text>
                    <Text className="text-gray-600 ml-4">
                      Duration: {post.walkStats.duration}
                    </Text>
                  </View>
                </View>
              )}
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  className="w-full h-64 rounded-lg"
                  contentFit="cover"
                />
              )}
            </View>

            {/* Post actions */}
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => onLikePost(post.id)}
              >
                <Heart size={20} color="#6b7280" />
                <Text className="ml-1 text-gray-600">{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                  setActiveCommentId(
                    activeCommentId === post.id ? null : post.id,
                  )
                }
              >
                <MessageCircle size={20} color="#6b7280" />
                <Text className="ml-1 text-gray-600">
                  {post.comments.length}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => onSharePost(post.id)}
              >
                <Share2 size={20} color="#6b7280" />
                <Text className="ml-1 text-gray-600">Share</Text>
              </TouchableOpacity>
            </View>

            {/* Comments section */}
            {activeCommentId === post.id && (
              <View className="mt-3">
                {post.comments.length > 0 && (
                  <View className="mb-3">
                    {post.comments.map((comment) => (
                      <View
                        key={comment.id}
                        className="bg-gray-50 p-2 rounded-lg mb-2"
                      >
                        <Text className="font-bold">{comment.username}</Text>
                        <Text>{comment.text}</Text>
                        <Text className="text-gray-500 text-xs">
                          {comment.timestamp}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View className="flex-row items-center">
                  <TextInput
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                  />
                  <TouchableOpacity
                    className="bg-blue-500 rounded-full p-2"
                    onPress={() => handleCommentSubmit(post.id)}
                  >
                    <Text className="text-white font-bold">Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Create post button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={onCreatePost}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const FilterTab = ({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className={`px-4 py-2 mr-2 rounded-full ${isActive ? "bg-blue-500" : "bg-gray-200"}`}
    onPress={onPress}
  >
    <Text
      className={`${isActive ? "text-white" : "text-gray-800"} font-medium`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const defaultPosts: Post[] = [
  {
    id: "1",
    username: "JaneDoe",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    dogName: "Max",
    location: "Central Park",
    timestamp: "2 hours ago",
    text: "Morning walk with Max! He loved chasing squirrels today.",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
    likes: 24,
    comments: [
      {
        id: "c1",
        username: "DogLover42",
        text: "Max looks so happy! What a beautiful day for a walk.",
        timestamp: "1 hour ago",
      },
    ],
    walkStats: {
      distance: "2.4 miles",
      duration: "45 min",
    },
  },
  {
    id: "2",
    username: "JohnSmith",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    dogName: "Bella",
    location: "Riverside Park",
    timestamp: "5 hours ago",
    text: "Bella made a new friend at the dog park today!",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    likes: 36,
    comments: [
      {
        id: "c2",
        username: "PuppyParent",
        text: "So cute! What breed is the other dog?",
        timestamp: "4 hours ago",
      },
      {
        id: "c3",
        username: "JohnSmith",
        text: "It's a Golden Retriever! They got along so well.",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: "3",
    username: "SarahWilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    dogName: "Cooper",
    location: "Highland Trail",
    timestamp: "Yesterday",
    text: "Cooper completed his longest hike yet! So proud of this little guy.",
    likes: 42,
    comments: [],
    walkStats: {
      distance: "5.2 miles",
      duration: "1h 30min",
    },
  },
];

export default SocialFeed;
