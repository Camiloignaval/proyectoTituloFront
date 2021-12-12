import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-dark '>
				<a className='navbar-brand' href='#'>
					<i className='fas fa-dumbbell'></i>
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarText'
					aria-controls='navbarText'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarText'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<NavLink
								to='/'
								className={({ isActive }) =>
									isActive ? "links -active" : "links"
								}
							>
								Home
							</NavLink>
						</li>
						<li className='nav-item  mx-2'>
							<NavLink
								to='login'
								className={({ isActive }) => (isActive ? "nav-active" : "")}
							>
								Iniciar sesión
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to='register'
								className={({ isActive }) => (isActive ? "nav-active" : "")}
							>
								Registrar
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};
