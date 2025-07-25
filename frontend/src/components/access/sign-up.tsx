import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-preact";
import type { TargetedEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { useAuth } from "../../hooks/auth/use-auth";
import { useForm } from "../../hooks/form/use-form";
import type { RegisterRequest } from "../../services/auth/types";

export default function SignUp() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const { formData, handleChange, error, isSuccess } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading, registerAccount } = useAuth();

  const handleShowPassword = () => setIsPwdVisible((x) => !x);

  const handleSumbmit = async (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const { error } = await registerAccount(formData as unknown as RegisterRequest);
    if (error) {
      alert(error)
      return;
    }

  }


  if (isLoading) {
    return <>Wait Moment...</>
  }

  return (
    <>
      <div className="space-y-2 px-3 rounded-xs outline-2 outline-gray-200">
        <form className="space-y-5 p-3" onSubmit={handleSumbmit}>
          <div className="space-y-2">
            <h1 className="text-xl">Create Account</h1>
            <p class="text-xs">
              Fill in the following details to create your account
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="full-name">Full Name</label>
            <div className="relative">
              <UserRound className="absolute h-4 top-3 left-2 text-gray-400" />
              <input
                id="full-name"
                className="inline-flex h-10 pl-9 items-center w-full outline-1 outline-gray-200 focus:outline-gray-400 focus:outline-2 disabled:cursor-not-allowed rounded-md"
                name="name"
                placeholder="Your Name"
                aria-required={true}
                value={formData.name}
                onChange={handleChange}
                role="textbox"
              />
              {error?.name && <span className="text-red-400">{error.name}</span>}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute h-4 top-3 left-2 text-gray-400" />
              <input
                id="email"
                className="inline-flex h-10 pl-9 items-center w-full outline-1 outline-gray-200 focus:outline-gray-400 focus:outline-2 disabled:cursor-not-allowed rounded-md"
                name="email"
                type="email"
                placeholder="your@email.com"
                aria-required={true}
                value={formData.email}
                onChange={handleChange}
                role="textbox"
              />
              {error?.email && <span className="text-red-400">{error.email}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <div className="relative place-content-center">
              <Lock className="absolute h-4 top-3 left-2 text-gray-400" />
              <input
                id="password"
                className="inline-flex h-10 px-9 items-center w-full outline-1 outline-gray-200 focus:outline-gray-400 focus:outline-2 disabled:cursor-not-allowed rounded-md"
                type={isPwdVisible ? "text" : "password"}
                name="password"
                placeholder="Your password"
                aria-required={true}
                value={formData.password}
                onChange={handleChange}
                role="textbox"
              />
              <button
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                type="button"
                onClick={handleShowPassword}
              >
                {isPwdVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {error?.password && <span className="text-red-400">{error.password}</span>}
            </div>
          </div>

          <button
            className={`inline-flex items-center justify-center whitespace-nowrap bg-black text-white text-md font-light rounded-xs hover:bg-neutral-800 cursor-pointer ${!isSuccess && "disabled:bg-neutral-500 disabled:cursor-auto"} px-4 py-2 h-10 w-full`}
            type="submit"
            disabled={!isSuccess}
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
