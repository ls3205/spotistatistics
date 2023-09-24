import { UserIcon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/Avatar";

interface UserInfoPanelProps {
    user: Pick<User, "name" | "image" | "email"> | null;
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
    return user ? (
        <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
            <h1 className="text-5xl ml-7 font-semibold text-black dark:text-white mb-2">
                Stats for...
            </h1>
            <div className="flex flex-row ml-7">
                <Avatar className="w-28 h-28">
                    {user.image ? (
                        <Image
                            src={user.image}
                            fill
                            alt="profile-picture"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <AvatarFallback className="bg-white dark:bg-black">
                            <UserIcon className="text-black dark:text-white" />
                        </AvatarFallback>
                    )}
                </Avatar>
                <div className="flex flex-col ml-7 justify-center text-black dark:text-white">
                    <h1 className="text-4xl font-medium">{user.name}</h1>
                    <h3 className="text-2xl">{user.email}</h3>
                </div>
            </div>
        </div>
    ) : (
        <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900"></div>
    );
};

export default UserInfoPanel;
