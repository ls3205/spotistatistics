import { UserIcon } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/Avatar";

interface UserInfoPanelProps {
    user: Pick<User, "name" | "image" | "email" | "sub">;
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
    return (
        <div className="m-2 h-auto w-[95%] rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
            <h1 className="mb-2 ml-7 text-5xl font-semibold text-black dark:text-white">
                Stats for...
            </h1>
            <div className="ml-7 flex flex-row">
                <Avatar className="h-28 w-28">
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
                <div className="ml-7 flex flex-col justify-center text-black dark:text-white">
                    <h1 className="flex flex-row items-center text-4xl font-medium">
                        {user.name}
                    </h1>
                    <h3 className="text-2xl">{user.email}</h3>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPanel;
