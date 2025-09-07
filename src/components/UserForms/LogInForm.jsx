import { auth } from "@/services/config/firebase";
import { Button, Input, Field, Flex, Heading } from "@chakra-ui/react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './UserForms.css';

const LogInForm=({ setNewUser})=>{
    const [userForm, setUserForm]=useState();
    const [error, setError]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, userForm.email, userForm.password)
        .catch((e)=>{
            setError(e.code.split('/')[[1]]);
        })
    }

     return(
        <Flex className="form-container">
            <Heading size={'lg'}>Log in:</Heading>
            <form className="user-form"  onSubmit={(e)=>handleSubmit(e)}>
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
                <Button variant={'subtle'} type="submit">Log in</Button>
            </form>
            <Flex className="btns-container">
                <p>Don't have an account?</p>
                <Button variant={'subtle'} size={'xs'} onClick={()=>{setNewUser(true)}}>Sign up</Button>
            </Flex>
            <span >{error}</span>
        </Flex>
    )
}

export default LogInForm;