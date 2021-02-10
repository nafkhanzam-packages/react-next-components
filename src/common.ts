import {ReactElement} from "react";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import $ from "jquery";

const Swal = withReactContent(_Swal);

export const alerts = {
  error: (err: unknown) => {
    console.error(err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let msg = (err as any)?.message ?? JSON.stringify(err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gqlError = (err as any)?.response?.errors?.[0];
    let title = "Error!";
    if (gqlError) {
      msg = gqlError.message;
      title = gqlError.status ?? title;
    }
    Swal.fire({
      title,
      text: msg,
      icon: "error",
    });
  },
  errorMsg: (title: string, message: string) => {
    Swal.fire({
      title,
      text: message,
      icon: "error",
    });
  },
  info: (title: string, message: string) => {
    Swal.fire({
      title,
      text: message,
      icon: "info",
    });
  },
  html: (title: string, component: ReactElement) => {
    Swal.fire({
      title,
      html: component,
    });
  },
  loading: (loading: boolean) => {
    if (loading) {
      $.blockUI?.({message: null});
    } else {
      $.unblockUI?.();
    }
  },
};
