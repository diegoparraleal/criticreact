import { AppBar, Toolbar } from "@material-ui/core"
import React from "react"
import styled from "styled-components"

const StyledAppFooter = styled.div`
    label {
        font-size: 12px;
        color: mat-color($critic-warn);
        text-align: center;
        width: 100%;
    }
`

export default function AppFooter({className}) {
    return (
        <StyledAppFooter>
            <AppBar position="relative" className={className}>
                <Toolbar color="primary" className="footer">
                    <label>Copyright diego.parra.leal@gmail.com - 2021</label>
                </Toolbar>
            </AppBar>
        </StyledAppFooter>
    )
}