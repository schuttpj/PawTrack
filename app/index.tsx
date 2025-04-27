import { View, Text } from "react-native";
import DogProfile from "./components/DogProfile";
import SocialFeed from "./components/SocialFeed";
import Leaderboards from "./components/Leaderboards";
import MapInterface from "./components/MapInterface";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Map, User, Users, Trophy } from "lucide-react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <View className="w-full h-full bg-white">
      {/* Content area */}
      <View className="flex-1">
        {activeTab === "map" && <MapInterface />}
        {activeTab === "profile" && <DogProfile />}
        {activeTab === "social" && <SocialFeed />}
        {activeTab === "leaderboards" && <Leaderboards />}
      </View>

      {/* Bottom navigation */}
      <View className="flex-row border-t border-gray-200 bg-white">
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "map" ? "bg-blue-50" : ""}`}
          onPress={() => setActiveTab("map")}
        >
          <Map size={20} color={activeTab === "map" ? "#3b82f6" : "#6b7280"} />
          <Text
            className={`text-xs mt-1 ${activeTab === "map" ? "text-blue-500" : "text-gray-500"}`}
          >
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "profile" ? "bg-blue-50" : ""}`}
          onPress={() => setActiveTab("profile")}
        >
          <User
            size={20}
            color={activeTab === "profile" ? "#3b82f6" : "#6b7280"}
          />
          <Text
            className={`text-xs mt-1 ${activeTab === "profile" ? "text-blue-500" : "text-gray-500"}`}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "social" ? "bg-blue-50" : ""}`}
          onPress={() => setActiveTab("social")}
        >
          <Users
            size={20}
            color={activeTab === "social" ? "#3b82f6" : "#6b7280"}
          />
          <Text
            className={`text-xs mt-1 ${activeTab === "social" ? "text-blue-500" : "text-gray-500"}`}
          >
            Social
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "leaderboards" ? "bg-blue-50" : ""}`}
          onPress={() => setActiveTab("leaderboards")}
        >
          <Trophy
            size={20}
            color={activeTab === "leaderboards" ? "#3b82f6" : "#6b7280"}
          />
          <Text
            className={`text-xs mt-1 ${activeTab === "leaderboards" ? "text-blue-500" : "text-gray-500"}`}
          >
            Ranks
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
