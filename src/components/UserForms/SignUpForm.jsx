import { auth } from "@/services/config/firebase";
import { Button, Input, Field, Flex, Heading } from "@chakra-ui/react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './UserForms.css'

const SignUpForm=({setNewUser})=>{
    const [userForm, setUserForm]=useState();
    const [error, setError]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userForm.email, userForm.password)
        .catch((e)=>{
            setError(e.code.split('/')[[1]]);
        })
    }

    return(
        <Flex className="form-container">
            <Heading size={'lg'}>Sign up:</Heading>
            <form className="user-form" onSubmit={(e)=>handleSubmit(e)}>
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
            <Flex className="btns-container">
                <p>Already have an account?</p>
                <Button variant={'subtle'} size={'xs'} onClick={()=>{setNewUser(false)}}>Log in</Button>
            </Flex>
            <span >{error}</span>
        </Flex>
    )
}

export default SignUpForm;