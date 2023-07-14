import { toastConfig } from "@/toast/toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import Link from "next/link";
import { getRandomPicture } from "@/data/pictures";
import axios from "axios";

const Register = () => {
  const { data: clientSession }: any = useSession();

  if (clientSession) {
    redirect(`/${clientSession.user.username}`);
  }

  const [picture, setPicture] = useState(getRandomPicture());
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("Hey there! I'm here! Let's discuss something 🚀");

  const [seePassword, setSeePassword] = useState(false);

  const toggleSeePassword = () => {
    setSeePassword(seePassword ? false : true);
  };

  const styles = {
    formGroup: "flex flex-col gap-3",
  };

  const handleSubmit = async (e: any) => {
    0;
    e.preventDefault();

    const userObject = {
      picture: picture,
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      bio: bio,
    };

    const { data: res } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/user/create`,
      userObject
    );

    if (res.success) {
      const res = await signIn("credentials", {
        username: userObject.username,
        password: userObject.password,
        redirect: true,
        callbackUrl: `/${userObject.username}`,
      });
    } else {
      toast.error(res.message, toastConfig);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl m-auto border border-black lg:w-[400px] w-[300px] flex flex-col gap-5"
    >
      <div className="m-auto">
        <img src={picture} className="w-36 h-36 rounded-full" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          autoComplete="off"
          className="outline-black p-2 text-base border border-black rounded-2xl bg-transparent"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="surname">Surname</label>
        <input
          required
          type="text"
          name="surname"
          id="surname"
          placeholder="Enter your surname"
          autoComplete="off"
          className="outline-black p-2 text-base border border-black rounded-2xl bg-transparent"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
      </div>
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
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="off"
          className="outline-black p-2 text-base border border-black rounded-2xl bg-transparent"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
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
      <div className="m-auto">
        <button className="p-3 border border-black rounded-2xl ease-in-out duration-300 hover:bg-black hover:text-white">
          Sign up
        </button>
      </div>
      <div className="text-center">
        Have account?{" "}
        <Link href="/login" className="underline">
          Login now!
        </Link>
      </div>
    </form>
  );
};

export default Register;
