import { prisma } from "@/prisma/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { picture, name, surname, username, email, password, bio } =
    await req.json();

  if (
    picture.length === 0 ||
    name.length === 0 ||
    surname.length === 0 ||
    username.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    bio.length === 0
  ) {
    return NextResponse.json({
      success: false,
      message: "You little hacker 😉 You cannot pass empty ",
    });
  }

  if (name.length >= 20) {
    return NextResponse.json({
      success: false,
      message: "Name cannot be more than 20 characters",
    });
  }

  if (surname.length >= 30) {
    return NextResponse.json({
      success: false,
      message: "Surname cannot be more than 30 characters",
    });
  }

  if (username.length >= 20 || username.length <= 5) {
    return NextResponse.json({
      success: false,
      message:
        "Username cannot be less than 5 characters or more than 20 characters",
    });
  }

  if (!!!/^[a-z0-9_\.]+$/.exec(username)) {
    return NextResponse.json({
      success: false,
      message:
        "Username can only have lowercase letters, numbers from 0 to 9, dots (.), and underscores (_)",
    });
  }

  if (password.length <= 8) {
    return NextResponse.json({
      success: false,
      message: "Password should be more than 8 characters",
    });
  }

  const hashPassword = await hash(password, 12);

  if (bio.length >= 200) {
    return NextResponse.json({
      success: false,
      message: "Bio cannot be more than 200 characters",
    });
  }

  const createdUser = await prisma.user.create({
    data: {
      picture: picture,
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: hashPassword,
      bio: bio,
    },
  });

  if (!createdUser) {
    return NextResponse.json({
      success: false,
      message: "Error occured while trying to register",
    });
  }

  return NextResponse.json({
    success: true,
  });
};
