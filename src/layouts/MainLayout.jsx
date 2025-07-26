import { Outlet } from 'react-router';
import './MainLayout.css'
import Footer from '@/components/Footer/Footer';
import SideBar from '@/components/SideBar/SideBar';
import { Flex } from '@chakra-ui/react';

const MainLayout=()=>{
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