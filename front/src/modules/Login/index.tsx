import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";

import FieldInput from "@/components/FieldInput";
import { login } from "@/services/auth";
import { authTokenAtom } from "@/store/auth.atom";
import LogoIcon from "@icons/logo.svg?react";

export function Component() {
  const navigate = useNavigate();
  const setToken = useSetAtom(authTokenAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: (response) => {
      if (!response) return;
      setToken(response.body.token);
      navigate("/", { replace: true });
    },
  });

  const HandleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-kAppDarkNavy">
      <form
        onSubmit={HandleSubmit}
        className="bg-kAppSlate p-8 rounded-lg w-full max-w-sm flex flex-col gap-4"
      >
        <LogoIcon className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-center mb-4">Sign in</h1>

        <FieldInput
          placeholder="Username"
          className="w-full py-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <FieldInput
          placeholder="Password"
          type="password"
          className="w-full py-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isError && (
          <p className="text-kAppRed text-sm">Invalid username or password.</p>
        )}

        <button
          type="submit"
          disabled={isPending || !username || !password}
          className="bg-kAppCoral font-bold text-sm rounded-md p-3 mt-2 hover:bg-kAppRed disabled:bg-kAppCoolGray"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
