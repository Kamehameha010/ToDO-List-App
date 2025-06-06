import { Mail, Lock, Eye, EyeOff,  } from "lucide-react"
import { useState } from "preact/hooks"
import { useForm } from "../../hooks/form/use-form"

export default function SignUp() {

    const [isPwdVisible, setIsPwdVisible] = useState(false);

    const { formData, handleChange } = useForm({
        "name": "",
        "email": "",
        "password": ""
    })

    const handleShowPassword = () => setIsPwdVisible(x => !x);


    return <>

        <div className="">
            <form class="">
                <h1>Create Account</h1>
                <p>Fill in the following details to create your account</p>

                <div className="">
                    <label htmlFor="name">Name</label>
                    <div className="">
                        <Mail />
                        <input name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} />
                    </div>
                </div>
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
                    Create Account
                </button>

            </form>

        </div>


    </>
}