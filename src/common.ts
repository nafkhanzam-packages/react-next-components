import {ReactElement} from "react";
import _Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import $ from "jquery";
import {SingletonRouter} from "next/router";
import {formatToGql} from "@nafkhanzam/common-utils";
import Link from "next/link";
import NProgress from "nprogress";
import BlockUI from "react-block-ui";

const Swal = withReactContent(_Swal);

export {Swal, $, Link, BlockUI};

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
};
