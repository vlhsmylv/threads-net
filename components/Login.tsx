import { toastConfig } from "@/toast/toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const { data: clientSession }: any = useSession();

  if (clientSession) {
    redirect(`/${clientSession.user.username}`);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);

  const toggleSeePassword = () => {
    setSeePassword(seePassword ? false : true);
  };

  const styles = {
    formGroup: "flex flex-col gap-3",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has("error")) {
        toast.error("Error while trying to login", toastConfig);
      }
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: `/${username}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl m-auto border border-black lg:w-[400px] w-[300px] flex flex-col gap-5"
    >
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          required
          type="username"
          name="username"
          id="username"
          placeholder="Enter your username"
          autoComplete="off"
          className="outline-black p-2 text-base border border-black rounded-2xl bg-transparent"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="username">Password</label>
        <div className="flex w-full">
          <input
            required
            type={seePassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="off"
            className="w-full outline-black p-2 text-base border border-black rounded-l-2xl bg-transparent"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={toggleSeePassword}
            className="rounded-r-2xl bg-black text-white w-14 text-xl p-3 border border-black"
          >
            {seePassword ? <BsEye /> : <BsEyeSlash />}
          </button>
        </div>
      </div>
      <div className="text-center">
          <div>
          Demo: johndoe / john12345
          </div>
          <div className="mt-2 text-gray-600 text-base">You can try to <Link className="underline" href="/register">register</Link>. It won&apos;t require any personal data or confirmation 😌</div>
      </div>
      <div className="m-auto">
        <button className="p-3 border border-black rounded-2xl ease-in-out duration-300 hover:bg-black hover:text-white">
          Sign in
        </button>
      </div>
      <div className="text-center">
        Don&apos;t have account?{" "}
        <Link href="/register" className="underline">
          Create one!
        </Link>
      </div>
    </form>
  );
};

export default Login;
