import theme, { Toast, ToastDescription } from "@gluestack-ui/themed";

export default function useToast() {
  const toast = theme.useToast();
  const showToast = () => {
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId}>
            <ToastDescription>
              Your account password was recently changed. If you did not
              authorize this change, please contact our support team
              immediately.
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  return { showToast };
}
