import React from "react"
import styled from "styled-components"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline"
import Phone from "@material-ui/icons/Phone"
import { navigate } from "gatsby"
import GithubIcon from "../icons/Github"

import './index.css'

const Nav = styled.div`
    display: flex;
    min-height: 7rem;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
`;

const links = [
    {
        icon: ChatBubbleOutline,
        label: "blog",
        to: "/blog"
    },
    {
        icon: GithubIcon,
        label: "projects",
        to: "/"
    },
    {
        icon: Phone,
        label: "contact",
        to: "/contact"
    }
];

const NavItem = styled.div`
    display: flex;
    width: 7rem;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    transition: all .2s;
`;

const NavItemText = styled.span`
    padding-top: .5rem;
`;

export const Layout = ({children}) => (
    <Paper className={"layout"} square >
        <Nav>
            {links.map(({icon: Icon, to, label}) => (
                <Button key={to} onClick={() => navigate(to)}>
                    <NavItem>
                        <Icon />
                        <NavItemText>{label}</NavItemText>
                    </NavItem>
                </Button>
            ))}
        </Nav>
        {children}
    </Paper>
)

export default Layout