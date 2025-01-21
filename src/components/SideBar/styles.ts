import styled from "styled-components";
import theme from "../../styles/styled-theme";

interface SidebarWrapperProps {
  isOpen: boolean;
}

export const SidebarWrapper = styled.div<SidebarWrapperProps>`
  position: fixed;
  width: 215px;
  height: 100%;
  border: 2px solid ${theme.color.black};
  /* box-shadow: ${(prop)=>(prop.isOpen ? '0px 0px 0px 0px rgba(0, 0, 0, 0.5)' : '0px 0px 0px 0px rgba(0, 0, 0, 0.5)' )}; */
  border-radius: 8px;
  background-color: ${theme.color.navyBlue};
  transition: transform 0.3s ease;
  left: ${(props) => (props.isOpen ? '0' : '-215px')};
  top: 110px;
  overflow-y: auto;
  color: ${theme.color.white};
  z-index: 100;
`;

export const ToggleButton = styled.button<SidebarWrapperProps>`
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  padding: 0 5px;
  align-items: center;
  height: 3%;
  width: 4%;
  left: ${(prop)=>(prop.isOpen ? '-4%': '0')};
  border: 0;
  font-size: ${theme.font.sizes.medium};
  color: ${theme.color.white};
  background: ${theme.color.navyBlue};
  border: 1px solid #000;
  border-radius: 8px;
`;

export const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const SidebarMenuItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${theme.color.black};
  cursor: pointer;
`;

export const SidebarCloseMenu = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid ${theme.color.black};
  cursor: pointer;
`
