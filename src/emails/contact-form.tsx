import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Section style={section}>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Hr style={hr} />
            <Text style={text}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const section = {
  padding: "24px",
  backgroundColor: "#f6f9fc",
  borderRadius: "8px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  lineHeight: "42px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "12px 0",
  lineHeight: "24px",
};

const messageStyle = {
  color: "#333",
  fontSize: "16px",
  margin: "12px 0",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}; 