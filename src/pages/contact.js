import React from "react"
import Layout from "../layout/Layout"
import styled, { keyframes } from "styled-components"
import Typography from '@material-ui/core/Typography'
import MuiTextField from '@material-ui/core/TextField'
import { Button } from "@material-ui/core"
import { Link } from "gatsby"

const scaleLeft = keyframes`
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(2.1);
    }
`;

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Title = styled(Typography)`
    text-align: center;
    padding: .5rem;
    animation: ${fadeUp} 1s both;
`;

const Emoji = styled.span`
    padding: 0 .5rem;
`;

const Body = styled(Typography)`
    text-align: center;
    padding: 4rem;
    animation: ${fadeUp} 1s 3s both;
`;

const Strike = styled.span`
    position: relative;
    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 25%;
        border-bottom: 5px solid black;
        width: 50%;
        animation: ${scaleLeft} 1s 1s both;
    }
`;

const FadeUp = styled.span`
    display: inline-block;
    animation: ${fadeUp} 1s 2s both;
`;

const FormArea = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    #submit {
        margin-top: .5rem;
    }
    animation: ${fadeUp} 1s 4s both;
`;

const TextField = styled(MuiTextField)`
    display: block;
    width: 80%;
`;

const ContactWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;    
`;

const myEmail = "fgarcia.student04@gmail.com";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: ["😊", "😍", "👻", "❤️"],
            welcomeText: ["thanks", "wassup", "boo!", "love"],
        }
    }

    render() {
        const index = Math.round(Math.random() * 3);
        return (
            <Layout>
                <ContactWrapper>
                    <Title gutterBottom variant="h1" component="h1">
                    <FadeUp>{this.state.welcomeText[index]}<Emoji aria-label="emoji">{this.state.icons[index]}</Emoji></FadeUp><Strike>hello</Strike>, from Francisco Garcia
                    </Title>
                    <Body variant="h3" component="p">
                        I love writing about technology, projects I'm working on, and my family.
                        My wife has a blog and we both occasionally write about our dogs, Hazel and Knight, and our cat, Luna.
                        You can check those out here [<Link to="/blog">mine</Link>] and here [<a href="https://www.sanchezvisualarts.com/blog/" target="_blank" rel="noopener noreferrer">hers</a>], if you like reading about crazy pet stories and overall madness.
                    </Body>
                    <Body gutterBottom variant="h3" component="p">
                        If you would like to contact me for work or to collaborate please feel free to use
                        the form below, or email me directly at {myEmail}
                    </Body>
                    <FormArea method="POST" action="https://formspree.io/fgarcia.student04@gmail.com">
                        <TextField autoComplete={"off"} id="name" name="name" label="Name" />
                        <TextField autoComplete={"off"} id="subject" name="subject" label="Subject" />
                        <TextField autoComplete={"off"} id="message" name="message" label="Message" />
                        <Button id="submit" type="submit">Submit</Button>
                    </FormArea>
                </ContactWrapper>
            </Layout>   
        )
    }
}

export default Contact;