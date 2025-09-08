import React, { useState, useEffect } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { colors } from "../theme/colors";

interface RenderListProps<T> {
  data: T[];
  children: (item: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
  onLoadMore?: () => Promise<void>; // função chamada ao chegar no fim da lista
  loading?: boolean;
}

export function RenderList<T>({
  data,
  children,
  emptyMessage = "Nenhum item encontrado",
  pageSize = 10,
  onLoadMore,
  loading = false,
}: RenderListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState<T[]>([]);

  useEffect(() => {
    setDisplayData(data.slice(0, pageSize * currentPage));
  }, [data, currentPage, pageSize]);

  const handleLoadMore = async () => {
    if (onLoadMore) {
      setCurrentPage((prev) => prev + 1);
      await onLoadMore();
    } else if (displayData.length < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <View className="h-full justify-center items-center">
        <ActivityIndicator size="large" color={colors.support} />
      </View>
    );
  }

  if (!loading && displayData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={displayData}
      renderItem={({ item }) => <>{children(item)}</>}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator style={{ margin: 16 }} /> : null
      }
    />
  );
}
