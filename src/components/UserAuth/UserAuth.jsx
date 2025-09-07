import { AuthContext } from "@/context/AuthContext";
import { Button, CloseButton, Drawer, Flex, Heading, Input, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { MdEdit, MdDone } from "react-icons/md";
import LogInForm from "../UserForms/LogInForm";
import SignUpForm from "../UserForms/SignUpForm";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "@/services/config/firebase";
import './UserAuth.css';

const UserAuth=({children})=>{
    const [open, setOpen]=useState();
    const {user}=useContext(AuthContext);
    const [newUser, setNewUser]=useState(false);
    const [newName, setNewName]=useState();
    const [edit, setEdit]=useState(false);
    const [error, setError]=useState();

    const editProfile=(e)=>{
      e.preventDefault();
      updateProfile(user,{displayName:newName}).then(()=>setEdit(false)).catch((e)=>setError(e.code))
    }

    return (
        <Drawer.Root placement={'end'} open={open} onPointerDownOutside={()=>setOpen(false)}>
          <Drawer.Trigger asChild onClick={()=>setOpen(true)}>
            {children}
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content className="auth-drawer" >
                <Drawer.Body>
                    {user ? 
                    <Flex className="form-container">
                      {edit ?
                      <form onSubmit={(e)=>editProfile(e)}>
                        <Input type="text" placeholder="enter your name" onChange={(e)=>setNewName(e.target.value)}/>
                        <Button type="submit" className="blue-btn"><MdDone/></Button>
                        <span>{error}</span>
                      </form> :
                      <Flex className="btns-container">
                        <Heading size='xl'>Hi {`${user.displayName!==undefined&&user.displayName!==null? user.displayName : user.email.split('@')[0]}!`}</Heading>
                        <Button size={'sm'} variant={'plain'} onClick={()=>setEdit(true)}><MdEdit color="white"/></Button>
                      </Flex>}
                      <Button variant={'subtle'} onClick={()=>{signOut(auth); setNewUser(false)}}>Sign out</Button>
                    </Flex> :
                    newUser? <SignUpForm setNewUser={setNewUser}/>: <LogInForm setNewUser={setNewUser}/>}
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm"  onClick={()=>setOpen(false)}/>
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )
}

export default UserAuth;