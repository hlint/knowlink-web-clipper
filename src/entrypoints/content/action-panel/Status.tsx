import { AlertCircleIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
import { useValue } from "../context";
import styles from "./style.module.css";

export default function Status() {
  const { status } = useValue();
  return (
    <div className={styles.status}>
      {status === "pending" && <StatusPending />}
      {status === "existing" && <StatusSuccess />}
      {status === "new" && <StatusEmpty />}
      {status === "error" && <StatusAlert />}
    </div>
  );
}

export function StatusEmpty() {
  return null;
}

export function StatusAlert() {
  return <AlertCircleIcon className="text-white bg-orange-400" />;
}

export function StatusSuccess() {
  return <CheckCircleIcon className="text-white bg-green-400" />;
}

export function StatusPending() {
  return <Loader2Icon className="text-blue-400 bg-background animate-spin" />;
}
