import {
  CloseIcon,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast as useToast_,
} from "@gluestack-ui/themed";

type Props = {
  action?: "success" | "error" | "warning" | "info" | "attention";
  title: string;
  description: string;
};
export default function useToast() {
  const toast = useToast_();
  const showToast = ({ action = "error", title, description }: Props) => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} variant="accent" action={action}>
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return { showToast };
}
