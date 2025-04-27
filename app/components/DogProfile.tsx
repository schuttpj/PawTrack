import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  MapPin,
  Calendar,
  Award,
  Edit,
  Plus,
  ChevronRight,
  Paw,
} from "lucide-react-native";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
};

type Walk = {
  id: string;
  date: string;
  distance: number;
  duration: number;
  route: string;
  calories: number;
};

type DogProfileProps = {
  dog?: {
    id: string;
    name: string;
    breed: string;
    age: number;
    photo: string;
    stats: {
      totalWalks: number;
      totalDistance: number;
      caloriesBurned: number;
      activityMinutes: number;
    };
    achievements: Achievement[];
    walkHistory: Walk[];
  };
};

const DogProfile = ({ dog }: DogProfileProps) => {
  const [activeTab, setActiveTab] = useState("stats");

  // Default dog data if none provided
  const defaultDog = {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: 3,
    photo:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
    stats: {
      totalWalks: 124,
      totalDistance: 347.5,
      caloriesBurned: 15420,
      activityMinutes: 3240,
    },
    achievements: [
      {
        id: "1",
        title: "Marathon Runner",
        description: "Completed 26.2 miles in a single week",
        icon: "award",
        date: "2023-10-15",
      },
      {
        id: "2",
        title: "Early Bird",
        description: "Completed 10 walks before 7am",
        icon: "sunrise",
        date: "2023-09-22",
      },
      {
        id: "3",
        title: "Explorer",
        description: "Visited 15 different parks",
        icon: "map",
        date: "2023-11-05",
      },
    ],
    walkHistory: [
      {
        id: "1",
        date: "2023-11-10",
        distance: 3.2,
        duration: 45,
        route: "Central Park Loop",
        calories: 320,
      },
      {
        id: "2",
        date: "2023-11-08",
        distance: 2.5,
        duration: 35,
        route: "Riverside Trail",
        calories: 250,
      },
      {
        id: "3",
        date: "2023-11-06",
        distance: 4.1,
        duration: 60,
        route: "Mountain View Path",
        calories: 410,
      },
      {
        id: "4",
        date: "2023-11-04",
        distance: 1.8,
        duration: 25,
        route: "Neighborhood Loop",
        calories: 180,
      },
      {
        id: "5",
        date: "2023-11-02",
        distance: 3.5,
        duration: 50,
        route: "Beach Boardwalk",
        calories: 350,
      },
    ],
  };

  const displayDog = dog || defaultDog;

  const renderTabContent = () => {
    switch (activeTab) {
      case "stats":
        return (
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-bold mb-4">Stats Dashboard</Text>

            <View className="flex-row flex-wrap justify-between">
              <View className="w-[48%] bg-blue-50 p-3 rounded-lg mb-3">
                <Text className="text-gray-600 text-sm">Total Walks</Text>
                <Text className="text-2xl font-bold text-blue-600">
                  {displayDog.stats.totalWalks}
                </Text>
              </View>

              <View className="w-[48%] bg-green-50 p-3 rounded-lg mb-3">
                <Text className="text-gray-600 text-sm">Total Distance</Text>
                <Text className="text-2xl font-bold text-green-600">
                  {displayDog.stats.totalDistance} mi
                </Text>
              </View>

              <View className="w-[48%] bg-orange-50 p-3 rounded-lg">
                <Text className="text-gray-600 text-sm">Calories Burned</Text>
                <Text className="text-2xl font-bold text-orange-600">
                  {displayDog.stats.caloriesBurned}
                </Text>
              </View>

              <View className="w-[48%] bg-purple-50 p-3 rounded-lg">
                <Text className="text-gray-600 text-sm">Activity Minutes</Text>
                <Text className="text-2xl font-bold text-purple-600">
                  {displayDog.stats.activityMinutes}
                </Text>
              </View>
            </View>
          </View>
        );

      case "achievements":
        return (
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-bold mb-4">
              Achievements & Badges
            </Text>

            {displayDog.achievements.map((achievement) => (
              <View
                key={achievement.id}
                className="flex-row items-center p-3 mb-3 bg-yellow-50 rounded-lg"
              >
                <View className="w-12 h-12 bg-yellow-200 rounded-full items-center justify-center mr-3">
                  <Award size={24} color="#f59e0b" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-base">
                    {achievement.title}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {achievement.description}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {achievement.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );

      case "history":
        return (
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-bold mb-4">Walk History</Text>

            {displayDog.walkHistory.map((walk) => (
              <Pressable
                key={walk.id}
                className="flex-row items-center p-3 mb-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Paw size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-base">{walk.route}</Text>
                    <ChevronRight size={16} color="#9ca3af" />
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Calendar size={12} color="#6b7280" className="mr-1" />
                    <Text className="text-gray-500 text-xs mr-3">
                      {walk.date}
                    </Text>
                    <MapPin size={12} color="#6b7280" className="mr-1" />
                    <Text className="text-gray-500 text-xs">
                      {walk.distance} mi
                    </Text>
                  </View>
                  <View className="flex-row mt-1">
                    <Text className="text-gray-600 text-xs">
                      {walk.duration} min • {walk.calories} cal
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with dog info */}
      <View className="bg-white p-4 shadow-sm">
        <View className="flex-row items-center">
          <Image
            source={{ uri: displayDog.photo }}
            className="w-24 h-24 rounded-full mr-4"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-bold">{displayDog.name}</Text>
              <TouchableOpacity className="p-2">
                <Edit size={18} color="#4b5563" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600">{displayDog.breed}</Text>
            <Text className="text-gray-500">{displayDog.age} years old</Text>
          </View>
        </View>
      </View>

      {/* Tab navigation */}
      <View className="flex-row bg-white mt-2 border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "stats" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("stats")}
        >
          <Text
            className={`font-medium ${activeTab === "stats" ? "text-blue-500" : "text-gray-600"}`}
          >
            Stats
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "achievements" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("achievements")}
        >
          <Text
            className={`font-medium ${activeTab === "achievements" ? "text-blue-500" : "text-gray-600"}`}
          >
            Achievements
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 items-center ${activeTab === "history" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("history")}
        >
          <Text
            className={`font-medium ${activeTab === "history" ? "text-blue-500" : "text-gray-600"}`}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab content */}
      <ScrollView className="flex-1 p-4">{renderTabContent()}</ScrollView>

      {/* Add new dog button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg">
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DogProfile;
