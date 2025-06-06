import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "preact/hooks"
import { useForm } from "../../hooks/form/use-form"

export default function SignIn() {

    const [isPwdVisible, setIsPwdVisible] = useState(false);

    const { formData, handleChange } = useForm({
        "email": "",
        "password": ""
    })

    const handleShowPassword = () => setIsPwdVisible(x => !x);


    return <>

        <div className="">
            <form class="">
                <h1>Sign In</h1>
                <p>Enter your credentials to access your account</p>
                <div className="">
                    <label htmlFor="email">Email</label>
                    <div className="">
                        <Mail />
                        <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                    </div>
                </div>

                <div className="">
                    <label htmlFor=""></label>
                    <div>
                        <Lock />
                        <input type="password" placeholder="Your password" value={formData.password} onChange={handleChange} />
                        <button onClick={handleShowPassword}>
                            {
                                isPwdVisible ? <EyeOff /> : <Eye />
                            }
                        </button>

                    </div>
                </div>

                <button type="submit">
                    Sign In
                </button>

            </form>

        </div>


    </>
}