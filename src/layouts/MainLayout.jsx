import { Outlet } from 'react-router';
import './MainLayout.css'
import Footer from '@/components/Footer/Footer';
import SideBar from '@/components/SideBar/SideBar';
import { Flex, Heading } from '@chakra-ui/react';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect } from 'react';

const MainLayout=()=>{
    useEffect(()=>{
        showAlert();
    },[])
    const showAlert=()=>{
        withReactContent(Swal).fire({
            title:'Note:',
            titleText: 'Note',
            theme:'dark',
            text:'Some images can temporarily have problem loading due to too many API requests (not from this app)',
            icon: 'info',
            iconColor: 'rgb(236, 62, 31)',
            width:'20rem',
            showConfirmButton:false,
            showCloseButton:true
        })
    }

    return(
        <div>
            <SideBar/>
            <Flex className="body">
                <Outlet/>
            </Flex>
            <Footer/>
        </div>
    )
}

export default MainLayout;