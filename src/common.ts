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

const formatError = (err: unknown): {title: string; msg: string} => {
  const {status, message} = formatToGql.toError(err);
  return {title: status, msg: message};
};

const defaultOpts: ReactSweetAlertOptions = {};

export const alerts = {
  error: (err: unknown, opts?: ReactSweetAlertOptions) => {
    console.error(err);
    const {title, msg} = formatError(err);
    return Swal.fire({
      title,
      text: msg,
      icon: "error",
      ...defaultOpts,
      ...opts,
    });
  },
  errorMsg: (title: string, message: string, opts?: ReactSweetAlertOptions) => {
    return Swal.fire({
      title,
      text: message,
      icon: "error",
      ...defaultOpts,
      ...opts,
    });
  },
  confirm: async (
    mainOpt: {title: string; message?: string; confirm?: string; deny?: string},
    opts?: ReactSweetAlertOptions,
  ) => {
    const result = await Swal.fire({
      title: mainOpt.title,
      text: mainOpt.message,
      icon: "question",
      confirmButtonText: mainOpt.confirm,
      showConfirmButton: mainOpt.confirm !== undefined,
      denyButtonText: mainOpt.deny,
      showDenyButton: mainOpt.deny !== undefined,
      ...defaultOpts,
      ...opts,
    });
    return result.isConfirmed;
  },
  info: (title: string, message: string, opts?: ReactSweetAlertOptions) => {
    return Swal.fire({
      title,
      text: message,
      icon: "info",
      ...defaultOpts,
      ...opts,
    });
  },
  html: (title: string, component: ReactElement, opts?: ReactSweetAlertOptions) => {
    return Swal.fire({
      title,
      html: component,
      ...defaultOpts,
      ...opts,
    });
  },
  raw: (component: ReactElement, opts?: ReactSweetAlertOptions) => {
    Swal.fire({
      html: component,
      showConfirmButton: false,
      ...defaultOpts,
      ...opts,
    });
  },
  comp: (component: ReactElement, opts?: ReactSweetAlertOptions) => {
    return Swal.fire({
      html: component,
      background: "transparent",
      showConfirmButton: false,
      ...defaultOpts,
      ...opts,
    });
  },
  close: () => {
    Swal.close();
  },
};
