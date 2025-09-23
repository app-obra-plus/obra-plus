import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ResponseAdvertisementDto } from "../../../../api/addvertisement/addvertisementSch";
import EditDeleteDrawer from "../../../../components/EditDeleteDrawer";
import { advertisementMdl } from "../../../../api/addvertisement/advertisementMdl";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../theme/colors";
import { useLocationStore } from "../../../../stores/useLocationStore";
import { calcularDistancia } from "../../../../utils/locationUtils";

interface IAdvertisementForm {
  item: ResponseAdvertisementDto;
  onClick?: () => void;
}

export default function AdvertisementItem({ item, onClick }: IAdvertisementForm) {

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.card}
        onPress={onClick}
      >

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.images[0]?.url || "" }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.contentInner}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              {item.isDonation ? (
                <Text style={styles.donationBadge}>Doação</Text>
              ) : (
                <Text style={styles.price}>
                  R$ {(item?.price / 100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    width: "50%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
  },
  imageContainer: {
    height: 128,
    width: "100%",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  image: {
    borderRadius: 4,
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 12,
  },
  contentInner: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF", // cor primária
  },
  donationBadge: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#6C63FF", // cor secundária
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
});
