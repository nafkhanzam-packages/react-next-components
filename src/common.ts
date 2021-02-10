import {ReactElement} from "react";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import $ from "jquery";
import {SingletonRouter} from "next/router";
import {formatToGql} from "@nafkhanzam/common-utils";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

const Swal = withReactContent(_Swal);

export {Swal, $};

export const initNProgress = (nextRouter: SingletonRouter) => {
  nextRouter.events.on("routeChangeStart", () => NProgress.start());
  nextRouter.events.on("routeChangeComplete", () => NProgress.done());
  nextRouter.events.on("routeChangeError", () => NProgress.done());
};

const formatError = (err: unknown) => {
  const {status: title = "Error!", message: msg} = formatToGql.toError(err);
  return {title, msg};
};

export const alerts = {
  error: (err: unknown) => {
    console.error(err);
    const {title, msg} = formatError(err);
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
