import { CircleCheck, LogOut } from "lucide-preact"
import { useAuth } from "../../../hooks/auth/use-auth"
import { useEffect, useState } from "preact/hooks";


export function TaskHeader() {

    const [profile, setProfile] = useState('');
    const { getProfile, logout } = useAuth();

    useEffect(() => {

        const fetchProfile = async () => {
            const response = await getProfile();
            setProfile(response.name)
        }

        fetchProfile()

    }, [])

    return (
        <header className="bg-white border-b border-gray-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-19">
                    <div className="flex items-center justify center space-x-4">
                        <span className="size-8 bg-blue-600 rounded-md flex justify-center items-center">
                            <CircleCheck className="size-5 text-white" />
                        </span>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Task Flow</h1>
                            <p className="text-sm text-gray-500">Welcome back, {profile}</p>
                        </div>

                    </div>
                    <button className="inline-flex font-semibold items-center hover:bg-gray-200 gap-3 px-3 py-1.5"
                        onClick={() => logout()}
                    >
                        <LogOut className="size-4" />
                        Sign out
                    </button>
                </div>
            </div>
        </header>
    )
}
