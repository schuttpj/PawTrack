import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  ChevronRight,
  Play,
} from "lucide-react-native";

type TimeFilter = "daily" | "weekly" | "monthly";
type LeaderboardTab = "dogs" | "routes";

interface DogRanking {
  id: string;
  name: string;
  breed: string;
  avatar: string;
  distance: number;
  rank: number;
  owner: string;
}

interface RouteRanking {
  id: string;
  name: string;
  distance: number;
  popularity: number;
  image: string;
  rank: number;
}

interface LeaderboardsProps {
  dogRankings?: DogRanking[];
  routeRankings?: RouteRanking[];
  onRouteSelect?: (routeId: string) => void;
  onStartRoute?: (routeId: string) => void;
}

const defaultDogRankings: DogRanking[] = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    distance: 12.5,
    rank: 1,
    owner: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Bella",
    breed: "Labrador",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
    distance: 10.8,
    rank: 2,
    owner: "Mike Thompson",
  },
  {
    id: "3",
    name: "Charlie",
    breed: "Beagle",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    distance: 9.3,
    rank: 3,
    owner: "Emma Wilson",
  },
  {
    id: "4",
    name: "Luna",
    breed: "Husky",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    distance: 8.7,
    rank: 4,
    owner: "David Brown",
  },
  {
    id: "5",
    name: "Cooper",
    breed: "German Shepherd",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cooper",
    distance: 7.9,
    rank: 5,
    owner: "Jessica Miller",
  },
];

const defaultRouteRankings: RouteRanking[] = [
  {
    id: "1",
    name: "Riverside Park Loop",
    distance: 3.2,
    popularity: 156,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    rank: 1,
  },
  {
    id: "2",
    name: "Downtown Trail",
    distance: 2.5,
    popularity: 132,
    image:
      "https://images.unsplash.com/photo-1587573578112-7154a5de1b2a?w=400&q=80",
    rank: 2,
  },
  {
    id: "3",
    name: "Mountain View Path",
    distance: 4.1,
    popularity: 98,
    image:
      "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400&q=80",
    rank: 3,
  },
  {
    id: "4",
    name: "Lakeside Walk",
    distance: 2.8,
    popularity: 87,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&q=80",
    rank: 4,
  },
  {
    id: "5",
    name: "Forest Trail",
    distance: 5.3,
    popularity: 76,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    rank: 5,
  },
];

const Leaderboards = ({
  dogRankings = defaultDogRankings,
  routeRankings = defaultRouteRankings,
  onRouteSelect = () => {},
  onStartRoute = () => {},
}: LeaderboardsProps) => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("dogs");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId === selectedRoute ? null : routeId);
    onRouteSelect(routeId);
  };

  const handleStartRoute = (routeId: string) => {
    onStartRoute(routeId);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800">Leaderboards</Text>
        <Text className="text-gray-500 mt-1">See who's leading the pack!</Text>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "dogs" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("dogs")}
        >
          <View className="flex-row justify-center items-center">
            <Award
              size={18}
              color={activeTab === "dogs" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={`ml-1 font-medium ${activeTab === "dogs" ? "text-blue-500" : "text-gray-500"}`}
            >
              Top Dogs
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "routes" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("routes")}
        >
          <View className="flex-row justify-center items-center">
            <MapPin
              size={18}
              color={activeTab === "routes" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={`ml-1 font-medium ${activeTab === "routes" ? "text-blue-500" : "text-gray-500"}`}
            >
              Popular Routes
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Time Filter */}
      <View className="flex-row justify-center py-3 bg-gray-50">
        <TouchableOpacity
          className={`px-4 py-1 rounded-full mx-1 ${timeFilter === "daily" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setTimeFilter("daily")}
        >
          <Text
            className={timeFilter === "daily" ? "text-white" : "text-gray-700"}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-1 rounded-full mx-1 ${timeFilter === "weekly" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setTimeFilter("weekly")}
        >
          <Text
            className={timeFilter === "weekly" ? "text-white" : "text-gray-700"}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-1 rounded-full mx-1 ${timeFilter === "monthly" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setTimeFilter("monthly")}
        >
          <Text
            className={
              timeFilter === "monthly" ? "text-white" : "text-gray-700"
            }
          >
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      <ScrollView className="flex-1">
        {activeTab === "dogs" ? (
          <View className="p-4">
            {dogRankings.map((dog) => (
              <View
                key={dog.id}
                className="flex-row items-center bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-100"
              >
                <View className="w-8 h-8 justify-center items-center">
                  <Text
                    className={`font-bold ${dog.rank <= 3 ? "text-blue-500" : "text-gray-500"}`}
                  >
                    {dog.rank}
                  </Text>
                </View>
                <Image
                  source={{ uri: dog.avatar }}
                  className="w-12 h-12 rounded-full bg-gray-200"
                />
                <View className="flex-1 ml-3">
                  <Text className="font-bold text-gray-800">{dog.name}</Text>
                  <Text className="text-gray-500 text-sm">
                    {dog.breed} • {dog.owner}
                  </Text>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center">
                    <TrendingUp size={14} color="#3b82f6" />
                    <Text className="ml-1 font-bold text-blue-500">
                      {dog.distance} km
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-400 mt-1">
                    {timeFilter} distance
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="p-4">
            {routeRankings.map((route) => (
              <View key={route.id}>
                <TouchableOpacity
                  className="bg-white rounded-lg mb-3 shadow-sm border border-gray-100 overflow-hidden"
                  onPress={() => handleRouteSelect(route.id)}
                >
                  <Image
                    source={{ uri: route.image }}
                    className="w-full h-32"
                  />
                  <View className="p-3">
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <View className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center mr-2">
                          <Text className="text-white font-bold text-xs">
                            {route.rank}
                          </Text>
                        </View>
                        <Text className="font-bold text-gray-800">
                          {route.name}
                        </Text>
                      </View>
                      <ChevronRight size={18} color="#9ca3af" />
                    </View>
                    <View className="flex-row mt-2">
                      <View className="flex-row items-center mr-4">
                        <MapPin size={14} color="#6b7280" />
                        <Text className="ml-1 text-gray-500 text-sm">
                          {route.distance} km
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Calendar size={14} color="#6b7280" />
                        <Text className="ml-1 text-gray-500 text-sm">
                          {route.popularity} walks
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {selectedRoute === route.id && (
                  <View className="bg-gray-50 p-4 rounded-lg mb-4 -mt-2 border border-gray-200">
                    <Text className="text-gray-700 mb-3">
                      This popular {route.distance} km route has been completed
                      by {route.popularity} dog walkers this{" "}
                      {timeFilter === "daily"
                        ? "day"
                        : timeFilter === "weekly"
                          ? "week"
                          : "month"}
                      .
                    </Text>
                    <TouchableOpacity
                      className="bg-blue-500 py-2 px-4 rounded-full flex-row justify-center items-center"
                      onPress={() => handleStartRoute(route.id)}
                    >
                      <Play size={16} color="#ffffff" fill="#ffffff" />
                      <Text className="text-white font-medium ml-2">
                        Start This Route
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Leaderboards;
