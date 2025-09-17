import { Axios, AxiosResponse } from "axios";
import { PaginatedResponse } from "../api/ModeloBase";
import React, { ComponentType, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

interface InfiniteScrollProps<T> {
  fetchFn: (page: number, limit: number, ...params: any[]) => Promise<AxiosResponse<PaginatedResponse<T>>>;
  params: any[];
  pageSize?: number;
  children: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
  queryKeyPrefix: string;
  ListHeaderComponent?: React.ComponentType;
  ListEmptyComponent?: React.ComponentType
}


const DefaultListEmptyComponent = () => (
  <View className="flex-1 justify-center items-center space-y-2">
    <Feather name="inbox" size={64} color="gray" />
    <Text className="font-bold text-gray-800 text-xl">Nenhum item encontrado</Text>
  </View>
);

const DefaultListHeaderComponent = () => <></>;

const InfiniteScrollList = <T,>({ 
  fetchFn,
  params,
  pageSize = 3,
  children,
  keyExtractor,
  queryKeyPrefix,
  ListHeaderComponent = DefaultListHeaderComponent,
  ListEmptyComponent = DefaultListEmptyComponent
}: InfiniteScrollProps<T>) => {

  const stableParams = useMemo(() => params, [JSON.stringify(params)]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKeyPrefix, fetchFn.name, ...stableParams],
    queryFn: ({ pageParam }) => fetchFn(pageParam, pageSize, ...params),
    getNextPageParam: (lastPage, allPages) => {
      const atualPage = allPages.length;
      const nextPage = atualPage + 1;
      const totalPages = lastPage.data.pagination.totalPages;

      return atualPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  )

  const flatData = data?.pages.flatMap(page => page.data.data) ?? [];

  useEffect(() => {
    const flatData = data?.pages.flatMap(page => page.data.data) ?? [];
    console.log(flatData.length);
  }, [data])

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ocorreu um erro ao carregar os dados.</Text>
      </View>
    );
  }

  if(flatData.length === 0) {
    return <ListEmptyComponent />;
  }

  return (
    <FlatList
      data={flatData}
      className="h-full"
      renderItem={({ item }) => children(item)}
      keyExtractor={keyExtractor}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      ListHeaderComponent={<ListHeaderComponent />}
    />
  );
}



export default InfiniteScrollList;