import {
  CustomInfoToast,
  CustomErrorToast,
  CustomSuccessToast,
} from "@/components/other/CustomToast";
import Toast, { ToastConfig, BaseToastProps } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  // success: (props: BaseToastProps)=> <CustomInfoToast {...props} />,
  // error: (props: BaseToastProps)=> <CustomErrorToast {...props} />,
  success: CustomSuccessToast,
  info: CustomInfoToast,
  error: CustomErrorToast,
};
