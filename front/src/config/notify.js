import { ToastContainer, toast } from 'react-toastify';

const notify = (msg, type = 'ERROR', toastId) => {
  /*
  type:
  DARK: "dark"
  DEFAULT: "default"
  ERROR: "error"
  INFO: "info"
  SUCCESS: "success"
  WARNING: "warning"
  */
  if (!msg) msg = 'NO_MESSAGE';
  if(! toast.isActive(toastId)) {
    toast(msg, {
      toastId: 'error',
      autoClose: 5000,
      type: toast.TYPE[type],
      hideProgressBar: false,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: false,
      // className: "rounded"
    });
  } else {
    toast.dismiss(toastId);
  }
}

export {
  notify,
  ToastContainer
}