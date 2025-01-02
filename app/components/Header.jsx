import Link from "next/link";
import { logout } from "../controllers/formController";
import { verifyToken } from "@/lib/tokenVerfy";


export default async function Header(){


    const user = await verifyToken();
    return(
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                {!user && (<li>
                    <Link href='login'>Login</Link>
                </li>)}
                {user && (
                    <li>
                        <form action={logout} className="btn btn-neutral">
                            <button>Logout</button>
                        </form>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}