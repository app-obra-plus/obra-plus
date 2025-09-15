import { Axios, AxiosResponse } from "axios";
import { PaginatedResponse } from "../api/ModeloBase";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { addressMdl } from "../api/address/addressMdl";

interface InfiniteScrollProps<T> {
  fetchFn: (page: number, limit: number, ...params: any[]) => Promise<AxiosResponse<PaginatedResponse<T>>>;
  params: any[];
  pageSize?: number;
  children: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
}

const InfiniteScrollList = <T,>({ 
  fetchFn,
  params,
  pageSize = 3,
  children,
  keyExtractor,
}: InfiniteScrollProps<T>) => {

  const stableParams = useMemo(() => params, [JSON.stringify(params)]);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['addresses', stableParams],
    queryFn: ({ pageParam }) => fetchFn(pageParam, pageSize, ...params),
    getNextPageParam: (lastPage, allPages) => {
      const atualPage = allPages.length;
      const nextPage = atualPage + 1;
      const totalPages = lastPage.data.pagination.totalPages;

      return atualPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    
  });

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



  return (
    <FlatList
      data={flatData}
      renderItem={({ item }) => children(item)}
      keyExtractor={keyExtractor}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null}
      // ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
      // ListHeaderComponent={<Text>Topo da lista</Text>}
    />
  );
}

export default InfiniteScrollList;