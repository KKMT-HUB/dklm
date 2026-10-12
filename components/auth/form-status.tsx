import { AlertCircle, CheckCircle2 } from "lucide-react";

export type FormStatusState =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

export function FormStatus({ status }: { status: FormStatusState }) {
  if (status.kind === "idle") return null;
  const isError = status.kind === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={
        isError
          ? "flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          : "flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800"
      }
    >
      {isError ? <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
      <p>{status.message}</p>
    </div>
  );
}
