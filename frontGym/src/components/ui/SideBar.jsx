//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./sideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { useDispatch } from "react-redux";

export const SideBar = ({ items }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//create initial menuCollapse state using useState hook
	const [menuCollapse, setMenuCollapse] = useState(true);

	//create a custom function that will change menucollapse state from false to true and true to false
	const menuIconClick = () => {
		//condition checking to change state from true to false and vice versa
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};

	const handleLogout = () => {
		dispatch(startLogout());
		navigate("/");
	};

	return (
		<div id='header'>
			{/* collapsed props to change menu size using menucollapse state */}
			<ProSidebar collapsed={menuCollapse}>
				<SidebarHeader>
					<div className='logotext'>
						{/* small and big change using menucollapse state */}
						<p>{menuCollapse ? "Logo" : "Logo Gimnasio"}</p>
					</div>
					<div className='closemenu' onClick={menuIconClick}>
						{/* changing menu collapse icon on click */}
						{menuCollapse ? (
							<i className='far fa-arrow-alt-circle-right'></i>
						) : (
							<i className='far fa-arrow-alt-circle-left'></i>
						)}
					</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape='square'>
						{items.map((item) => {
							return (
								<MenuItem
									key={item.to}
									className='menuItem'
									icon={<i className={item?.icon}></i>}
								>
									{item.nombre} <Link to={item.to}></Link>
								</MenuItem>
							);
						})}
					</Menu>
				</SidebarContent>
				<SidebarFooter>
					<Menu iconShape='square'>
						<MenuItem
							onClick={handleLogout}
							icon={<i className='fas fa-sign-out-alt'></i>}
						>
							Cerrar sesión<Link to='/'></Link>
						</MenuItem>
					</Menu>
				</SidebarFooter>
			</ProSidebar>
		</div>
	);
};
