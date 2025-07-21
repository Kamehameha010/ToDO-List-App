import { Eye, EyeOff, Lock, Mail } from "lucide-preact";
import type { TargetedEvent } from "preact/compat";
import { useState } from "preact/hooks";
import { useForm } from "../../hooks/form/use-form";
import { useAuth } from "../../hooks/auth/use-auth";
import type { AuthRequest } from "../../services/auth/types";

export default function SignIn() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);



  const { formData, error, handleChange, isSuccess } = useForm({
    email: "",
    password: ""
  });

  const { login } = useAuth();

  const handleShowPassword = () => setIsPwdVisible((x) => !x);
  const handleSumbmit = async (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const { error } = await login(formData as unknown as AuthRequest);
    if (error) {
      alert(error)
    }

  }

  return (
    <>
      <div className="space-y-2 px-3 rounded-xs outline-2 outline-gray-200">
        <form className="space-y-5 p-3" onSubmit={handleSumbmit}>
          <div className="space-y-2">
            <h1 className="text-xl">Sign In</h1>
            <p class="text-xs">Enter your credentials to access your account</p>
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
                aria-required
                value={formData.email}
                role="textbox"
                onChange={handleChange}
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
                aria-required
                value={formData.password}
                role="textbox"
                onChange={handleChange}
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
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
