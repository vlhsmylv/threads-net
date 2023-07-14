import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const serverSession: any = await getServerSession(authOptions);
  const user: any = serverSession
    ? await prisma.user.findFirst({
        where: {
          id: serverSession.user.id,
        },
      })
    : null;

  let picture = user.picture;

  const saveChanges = async (data: FormData) => {
    "use server";

    const changes: any = {
      name: data.get("name"),
      surname: data.get("surname"),
      bio: data.get("bio"),
    };

    if(changes.bio.length > 200) {
      return false;
    }

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: changes.name,
        surname: changes.surname,
        bio: changes.bio,
      },
    });

    if (updateUser) {
      redirect(`/${user.username}`);
    }
  };

  if (user) {
    const styles = {
      preferenceGroup: "flex lg:flex-nowrap flex-wrap lg:gap-10 gap-3 items-center",
      leftSideImgBox: "w-28",
      leftSideTextBox: "w-28 text-lg",
      input:
        "px-3 py-2 border border-black bg-transparent outline-black rounded-2xl",
      disabled: "bg-gray-300 text-gray-500 select-none",
    };

    return (
      <form action={saveChanges} className="flex flex-col gap-10">
        <div className={`${styles.preferenceGroup} lg:justify-start justify-center`}>
          <div className={styles.leftSideImgBox}>
            <img src={picture} className="rounded-full w-28 h-28" />
          </div>
          <div>
            <div className={`${styles.input} ${styles.disabled}`}>
              {picture.slice(0, 30)}...
            </div>
          </div>
        </div>
        <div className={styles.preferenceGroup}>
          <div className={styles.leftSideTextBox}>Name</div>
          <div>
            <input
              className={styles.input}
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Your name"
              defaultValue={user.name}
            />
          </div>
        </div>
        <div className={styles.preferenceGroup}>
          <div className={styles.leftSideTextBox}>Surname</div>
          <div>
            <input
              className={styles.input}
              autoComplete="off"
              type="text"
              name="surname"
              placeholder="Your surname"
              defaultValue={user.surname}
            />
          </div>
        </div>
        <div className={styles.preferenceGroup}>
          <div className={styles.leftSideTextBox}>Username</div>
          <div>
            <div className={`${styles.input} ${styles.disabled}`}>
              @{user.username}
            </div>
          </div>
        </div>
        <div className={styles.preferenceGroup}>
          <div className={styles.leftSideTextBox}>Email</div>
          <div>
            <div className={`${styles.input} ${styles.disabled}`}>
              {user.email}
            </div>
          </div>
        </div>
        <div className={styles.preferenceGroup}>
          <div className={styles.leftSideTextBox}>Bio</div>
          <div>
            <textarea
              name="bio"
              className={`${styles.input} resize-none`}
              cols={30}
              rows={5}
              defaultValue={user.bio}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="hover:bg-black hover:text-white p-3 border border-black rounded-2xl ease-in-out duration-200 text-black hover:scale-110"
          >
            Save changes
          </button>
        </div>
      </form>
    );
  }
};

export default Page;
