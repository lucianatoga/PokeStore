import { auth } from "@/services/config/firebase";
import { Button, Input, Field, Flex } from "@chakra-ui/react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './UserForm.css';

const LogInForm=({newUser, success, setSuccess})=>{
    const [userForm, setUserForm]=useState();
    const [error, setError]=useState();
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(newUser){
            createUserWithEmailAndPassword(auth, userForm.email, userForm.password)
            .then(()=>setSuccess(true))
            .catch((e)=>{
                setError(e.code.split('/')[[1]]);
                setSuccess(false)
            })
        }
        else{
            signInWithEmailAndPassword(auth, userForm.email, userForm.password)
            .then(()=>setSuccess(true))
            .catch((e)=>{
                setError(e.code.split('/')[[1]]);
                setSuccess(false)
            })
        }
    }

     return(
        success===null ?
        <form onSubmit={(e)=>handleSubmit(e)}>
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
            <Button variant={'subtle'} type="submit">{newUser ? 'Sign up' : 'Log in'}</Button>
        </form>
        : success===true ? <p>Log in succesful</p> : 
        <Flex className="btns-container">
            <p>Error: {error}</p>
            <Button className="red-btn" size={'xs'} onClick={()=>setSuccess(null)}>Try again</Button>
        </Flex>
    )
}

export default LogInForm;