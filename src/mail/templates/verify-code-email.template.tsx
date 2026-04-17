import {
  Body,
  Container,
  Heading,
  Html,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from '@react-email/components';

interface VerifyCodeEmailTemplateProps {
  email: string;
  code: string;
}

export const VerifyCodeEmailTemplate = ({
  email,
  code,
}: VerifyCodeEmailTemplateProps) => {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              background: '#f4f4f5',
              card: '#ffffff',
              primary: '#4a4dd0',
              secondary: '#000',
              muted: '#6b7280',
            },
          },
        },
      }}
    >
      <Html lang="es">
        <Body className="bg-background py-6 font-sans">
          <Container className="mx-auto max-w-[480px] rounded-2xl bg-card px-6 py-8">
            <Section className="mb-6">
              <Heading className="text-primary text-4xl font-semibold text-center">
                Verifica tu identidad
              </Heading>

              <Text className="text-secondary mt-2">
                Hemos detectado que alguien ha intentado iniciar sesión con tu
                cuenta desde una nuevo dispositivo. Si has sido tú, necesitamos
                que verifiques tu identidad introduciendo este código:
              </Text>

              {/* OTP */}
              <Text className="mb-6 text-center text-3xl font-bold tracking-[6px]">
                {code}
              </Text>
            </Section>

            {/* Footer */}
            <Section>
              <Text className="text-xs text-muted text-center">
                Este mensaje fue enviado a {email}. No respondas a este correo.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
