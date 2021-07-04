import {ReactElement} from "react";
import _Swal from "sweetalert2";
import withReactContent, {ReactSweetAlertOptions} from "sweetalert2-react-content";
import $ from "jquery";
import {SingletonRouter} from "next/router";
import {formatToGql} from "@nafkhanzam/common-utils";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import BlockUI from "react-block-ui";

const Swal = withReactContent(_Swal);

export {Swal, $, Link, Router, BlockUI};

export const initNProgress = (nextRouter: SingletonRouter) => {
  nextRouter.events.on("routeChangeStart", () => NProgress.start());
  nextRouter.events.on("routeChangeComplete", () => NProgress.done());
  nextRouter.events.on("routeChangeError", () => NProgress.done());
};

const formatError = (err: unknown) => {
  let title = "Error!";
  let msg = "Unexpected error.";
  const {status, message} = formatToGql.toError(err);
  if (status) {
    title = status;
  }
  if (err instanceof Error) {
    msg = message ?? err.message;
  }
  if (message) {
    msg = message;
  }
  return {title, msg};
};

export const alerts = {
  error: (err: unknown, opts?: ReactSweetAlertOptions) => {
    console.error(err);
    const {title, msg} = formatError(err);
    Swal.fire({
      title,
      text: msg,
      icon: "error",
      ...opts,
    });
  },
  errorMsg: (title: string, message: string, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      title,
      text: message,
      icon: "error",
      ...opts,
    });
  },
  info: (title: string, message: string, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      title,
      text: message,
      icon: "info",
      ...opts,
    });
  },
  html: (title: string, component: ReactElement, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      title,
      html: component,
      ...opts,
    });
  },
  raw: (component: ReactElement, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      html: component,
      showConfirmButton: false,
      ...opts,
    });
  },
  comp: (component: ReactElement, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      html: component,
      padding: 0,
      background: "transparent",
      showConfirmButton: false,
      ...opts,
    });
  },
};
