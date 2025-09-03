import { AuthContext } from "@/context/AuthContext";
import { Button, CloseButton, Drawer, Flex, Heading, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import LogInForm from "../UserForm/UserForm";
import { signOut } from "firebase/auth";
import { auth } from "@/services/config/firebase";
import './UserAuth.css'

const UserAuth=({children})=>{
    const [open, setOpen]=useState();
    const {user}=useContext(AuthContext);
    const [newUser, setNewUser]=useState(false);
    const [success, setSuccess]=useState(null);

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
                      <Heading size='xl'>Hi {`${user.name!==undefined? user.name : user.email.split('@')[0]}!`}</Heading>
                      <Button variant={'subtle'} onClick={()=>{signOut(auth); setNewUser(false)}}>Sign out</Button>
                    </Flex> :
                    newUser ? 
                    <Flex className="form-container">
                      <Heading size={'lg'}>Sign up:</Heading>
                      <LogInForm newUser={newUser} success={success} setSuccess={setSuccess}/>
                      <Flex className="btns-container">
                        <p>Already have an account?</p>
                        <Button variant={'subtle'} size={'xs'} onClick={()=>{setNewUser(false);setSuccess(null)}}>Log in</Button>
                      </Flex>
                    </Flex>
                    :
                    <Flex className="form-container">
                      <Heading size={'lg'}>Log in:</Heading>
                      <LogInForm newUser={newUser} success={success} setSuccess={setSuccess}/>
                      <Flex className="btns-container">
                        <p>Don't have an account?</p>
                        <Button variant={'subtle'} size={'xs'} onClick={()=>{setNewUser(true);setSuccess(null)}}>Sign up</Button>
                      </Flex>
                    </Flex>}
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