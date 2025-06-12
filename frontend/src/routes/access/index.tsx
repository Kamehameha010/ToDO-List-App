import { createFileRoute } from "@tanstack/react-router";
import Tab from "../../components/access/tabs/tab";
import type { JSX } from "preact/jsx-runtime";
import SignIn from "../../components/access/sign-in";
import SignUp from "../../components/access/sign-up";
import type {
  TabItem as TTabItem,
  TabKeys,
} from "../../components/access/tabs/types";
import TabItem from "../../components/access/tabs/tab-item";
import { useState } from "preact/hooks";

//@ts-ignore
export const AccsessRoute = createFileRoute("/access/")({
  component: Index,
});

const tabs: TTabItem[] = [
  {
    id: "tab1",
    label: "Sign In",
  },
  {
    id: "tab2",
    label: "Sign Up",
  },
];

const tabElement: Record<TabKeys, JSX.Element> = {
  tab1: <SignIn />,
  tab2: <SignUp />,
};

function Index() {
  const [active, setActive] = useState<TabKeys>("tab1");
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-semibold ">Welcome</h1>
            <p className="text-xs color-gray-500">
              Sign in your account or create new one
            </p>
          </div>

          <div className="w-full space-y-1.5">
            <Tab>
              {tabs.map((item) => (
                <TabItem
                  id={item.id}
                  key={item.id}
                  active={active === item.id}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </TabItem>
              ))}
            </Tab>
            {tabElement[active]}
          </div>
        </div>
      </div>
    </>
  );
}
