import { LogOutIcon } from "lucide-react";
import { useLogoutMutation } from "../auth/authApi";
import { useGetCurrentUserQuery } from "../employees/employeesApi";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/DropdownMenu";

const UserAvatar = () => {
    const { data: user } = useGetCurrentUserQuery();
    const [logout] = useLogoutMutation();

    return (
        <DropdownMenu>
            <div className="flex items-center gap-4">
                <DropdownMenuTrigger asChild>
                    <img
                        className="rounded-full size-10 cursor-pointer"
                        src={user?.profilePhoto || "/avatar-placeholder.png"}
                        alt={`${user.name} user avatar`}
                    />
                </DropdownMenuTrigger>
                <div className="capitalize font-medium">
                    {user.name}
                </div>
            </div>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem variant="destructive" onClick={logout}>
                    <LogOutIcon/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;