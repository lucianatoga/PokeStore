import { auth } from "@/services/config/firebase";
import { Button, Input, Field, Flex } from "@chakra-ui/react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import './UserForms.css'

const SignUpForm=()=>{
    const [userForm, setUserForm]=useState();
    const [error, setError]=useState();
    const [success, setSuccess]=useState(null);

    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userForm.email, userForm.password)
        .then(()=>{
            setSuccess(true);
        })
        .catch((e)=>{
            setError(e.code.split('/')[[1]]);
            setSuccess(false)
        })
    }

    return(
        success===null ? 
        <form onSubmit={(e)=>handleSubmit(e)}>
            <Field.Root required>
                <Field.Label>
                Name <Field.RequiredIndicator />
                </Field.Label>
                <Input type="text" placeholder="full name" onChange={(e)=>setUserForm((prev)=>({...prev, name: e.target.value}))}/>
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                Email <Field.RequiredIndicator />
                </Field.Label>
                <Input type="email" placeholder="email" onChange={(e)=>setUserForm((prev)=>({...prev, email: e.target.value}))}/>
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                Password <Field.RequiredIndicator />
                </Field.Label>
                <Input type="password" placeholder="password" onChange={(e)=>setUserForm((prev)=>({...prev, password: e.target.value}))}/>
            </Field.Root>
            <Button variant={'subtle'} type="submit">Sign up</Button>
        </form>
        : success ? <LoadingCircle/> :
        <Flex className="btns-container">
            <p>Error: {error}</p>
            <Button className="red-btn" size={'xs'} onClick={()=>setSuccess(null)}>Try again</Button>
        </Flex>
    )
}

export default SignUpForm;