import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import {
  Play,
  Pause,
  StopCircle,
  MapPin,
  Timer,
  Footprints,
  Flame,
} from "lucide-react-native";

type MapInterfaceProps = {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
  onWalkComplete?: (walkData: {
    distance: number;
    duration: number;
    route: string;
    calories: number;
  }) => void;
};

const MapInterface = ({
  initialLocation,
  onWalkComplete = () => {},
}: MapInterfaceProps) => {
  const [isWalking, setIsWalking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [walkTime, setWalkTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [walkHistory, setWalkHistory] = useState<
    Array<{
      id: string;
      image: string;
      distance: string;
      duration: string;
      date: string;
    }>
  >([
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
      distance: "2.4 km",
      duration: "32 min",
      date: "Today, 8:30 AM",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1587573578112-7154a5de1b2a?w=400&q=80",
      distance: "3.1 km",
      duration: "45 min",
      date: "Yesterday, 4:15 PM",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400&q=80",
      distance: "1.8 km",
      duration: "25 min",
      date: "Apr 25, 9:00 AM",
    },
  ]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isWalking && !isPaused) {
      interval = setInterval(() => {
        setWalkTime((prevTime) => prevTime + 1);
        // Simulate distance increase (would be GPS-based in real app)
        setDistance((prevDistance) => prevDistance + 0.005);
        // Simulate calorie burn
        setCalories((prevCalories) => prevDistance * 60);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWalking, isPaused]);

  const startWalk = () => {
    setIsWalking(true);
    setIsPaused(false);
  };

  const pauseWalk = () => {
    setIsPaused(true);
  };

  const resumeWalk = () => {
    setIsPaused(false);
  };

  const stopWalk = () => {
    // Save walk data
    const walkData = {
      distance: distance,
      duration: walkTime,
      route: "Custom Route",
      calories: calories,
    };

    onWalkComplete(walkData);

    // Reset state
    setIsWalking(false);
    setIsPaused(false);
    setWalkTime(0);
    setDistance(0);
    setCalories(0);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 bg-white">
      {/* Map area (placeholder) */}
      <View className="relative w-full h-3/5 bg-gray-200">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
          }}
          className="w-full h-full"
          contentFit="cover"
        />

        {/* Current location marker */}
        <View className="absolute top-1/2 left-1/2 -mt-8 -ml-4">
          <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
            <MapPin size={20} color="white" />
          </View>
          <View className="w-4 h-4 rounded-full bg-blue-200 absolute -bottom-1 left-2" />
        </View>

        {/* Walk stats overlay */}
        {isWalking && (
          <View className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-lg p-3 flex-row justify-between">
            <View className="items-center">
              <Timer size={18} color="#3b82f6" />
              <Text className="text-sm font-medium mt-1">
                {formatTime(walkTime)}
              </Text>
              <Text className="text-xs text-gray-500">Time</Text>
            </View>

            <View className="items-center">
              <Footprints size={18} color="#3b82f6" />
              <Text className="text-sm font-medium mt-1">
                {distance.toFixed(2)} km
              </Text>
              <Text className="text-xs text-gray-500">Distance</Text>
            </View>

            <View className="items-center">
              <Flame size={18} color="#3b82f6" />
              <Text className="text-sm font-medium mt-1">
                {Math.round(calories)}
              </Text>
              <Text className="text-xs text-gray-500">Calories</Text>
            </View>
          </View>
        )}
      </View>

      {/* Controls and stats */}
      <View className="flex-1 p-4">
        {!isWalking ? (
          <View>
            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-full items-center mb-6"
              onPress={startWalk}
            >
              <View className="flex-row items-center">
                <Play size={20} color="white" fill="white" />
                <Text className="text-white font-bold ml-2">Start Walk</Text>
              </View>
            </TouchableOpacity>

            <Text className="font-bold text-lg mb-3">Recent Walks</Text>
            <ScrollView className="flex-1">
              {walkHistory.map((walk) => (
                <View
                  key={walk.id}
                  className="flex-row items-center mb-4 bg-gray-50 p-3 rounded-lg"
                >
                  <Image
                    source={{ uri: walk.image }}
                    className="w-16 h-16 rounded-lg mr-3"
                    contentFit="cover"
                  />
                  <View className="flex-1">
                    <Text className="font-medium">{walk.date}</Text>
                    <View className="flex-row mt-1">
                      <Text className="text-gray-500 mr-3">
                        {walk.distance}
                      </Text>
                      <Text className="text-gray-500">{walk.duration}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <MapPin size={20} color="#3b82f6" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View className="items-center">
            <Text className="text-lg font-bold mb-6">
              {isPaused ? "Walk Paused" : "Walk in Progress"}
            </Text>

            <View className="flex-row justify-center space-x-6">
              {isPaused ? (
                <TouchableOpacity
                  className="bg-blue-500 w-16 h-16 rounded-full items-center justify-center"
                  onPress={resumeWalk}
                >
                  <Play size={28} color="white" fill="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-amber-500 w-16 h-16 rounded-full items-center justify-center"
                  onPress={pauseWalk}
                >
                  <Pause size={28} color="white" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                className="bg-red-500 w-16 h-16 rounded-full items-center justify-center"
                onPress={stopWalk}
              >
                <StopCircle size={28} color="white" fill="white" />
              </TouchableOpacity>
            </View>

            <View className="mt-8 w-full bg-gray-100 p-4 rounded-lg">
              <Text className="font-medium mb-2">Current Walk Stats</Text>
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-gray-500 text-sm">Distance</Text>
                  <Text className="text-lg font-bold">
                    {distance.toFixed(2)} km
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">Duration</Text>
                  <Text className="text-lg font-bold">
                    {formatTime(walkTime)}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">Calories</Text>
                  <Text className="text-lg font-bold">
                    {Math.round(calories)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MapInterface;
