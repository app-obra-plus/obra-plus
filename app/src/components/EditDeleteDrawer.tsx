import { Text, View } from "react-native";
import BottomDrawer from "./BottomDrawer";
import Button from "./Button";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface EditDeleteDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  refreshQueryKey?: string[];
  disableDelete?: boolean;
}

export default function EditDeleteDrawer({
  isVisible,
  onClose,
  onEdit,
  onDelete,
  refreshQueryKey,
  disableDelete = false
}: EditDeleteDrawerProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const queryClient = useQueryClient()

  const refreshList = () => {
    queryClient.invalidateQueries({ queryKey: refreshQueryKey })
  }

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    onDelete()
      .then(() => {
        refreshList();
        onClose();
      })
      .finally(() => setIsLoadingDelete(false))
  }

  return (
    <BottomDrawer isVisible={isVisible} onClose={onClose}>
      <View className="gap-4">
        <Button text="Editar" type="outline" onPress={onEdit} />
        {
          !disableDelete && (
            <Button text="Deletar" type="outline" onPress={handleDelete} isLoading={isLoadingDelete} />
          )
        }
      </View>
    </BottomDrawer>
  )
}