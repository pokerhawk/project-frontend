import { useState } from 'react';
import * as S from './styles'
import SidebarArrowLeft from '../../assets/images/icons/SidebarArrowLeft';
import SidebarArrowRight from '../../assets/images/icons/SidebarArrowRight';
import theme from '../../styles/styled-theme';
// import { useNavigate, useParams } from 'react-router-dom';

type SidebarProps = {
  sidebarItems: Array<ItemsProps>
  defaultOpen:boolean
}

type ItemsProps = {
  itemName: string;
  itemRef: any;
}

const Sidebar = ({
  defaultOpen, sidebarItems
}:SidebarProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // const {id, type} = useParams();
  // const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref:any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    ref.current.style.backgroundColor = theme.color.lightBlue;
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.backgroundColor = 'transparent';
      }
    }, 750);
  };
  
  return (
    <S.SidebarWrapper isOpen={isOpen}>
      <S.ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
        Expandir
        {isOpen? '':<SidebarArrowRight/>}
      </S.ToggleButton>
      <S.SidebarMenu>
          <S.SidebarCloseMenu onClick={toggleSidebar}>
            <SidebarArrowLeft color='#ffffff'/>
          </S.SidebarCloseMenu>
          {sidebarItems.map((prop:ItemsProps)=>{
              // return(<S.SidebarMenuItem onClick={()=>{navigate(`/${type}/${id}/${prop.itemRef}`)}}>
              return(<S.SidebarMenuItem onClick={()=>{scrollToSection(prop.itemRef)}}>
                  {prop.itemName}
              </S.SidebarMenuItem>)
          })}
      </S.SidebarMenu>
    </S.SidebarWrapper>
  );
};

export default Sidebar;
