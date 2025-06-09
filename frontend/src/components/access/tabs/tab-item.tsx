import type { PropsWithChildren } from "preact/compat";

interface TabItemProps extends PropsWithChildren {
  id: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export default function TabItem(props: TabItemProps) {
  return (
    <button
      className={`inline-flex h-10 w-55 items-center justify-center font-normal rounded-xs ${
        props.active ? "bg-gray-50" : "bg-gray-200 text-gray-500"
      }`}
      aria-selected={props.active}
      {...props}
    >
      {props.children}
    </button>
  );
}
