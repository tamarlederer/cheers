import React from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'
export default function NoConnect(props) {
    const open = props.open


    return (
        <>

            <Modal style={{ width: '40%' }}
                onClose={() => props.setOpen(false)}
                open={open}
            >
                <Modal.Content image>
                    <Image size='medium' src='./public/images/general/userNoConnect.png' wrapped />
                    <Modal.Description>
                        <Header><h2>User no connect</h2></Header>
                        <br></br>
                        <br></br>
                        <h3>
                            You are not logged in to the site🤔,  <br></br> go to SignIn!
                        </h3>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="OK , I W'ill Sign-In"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => props.setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    )
}