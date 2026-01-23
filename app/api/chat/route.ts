import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-1.5-flash'),
        messages,
        system: `Eres un asistente de IA experto para PetCare, una plataforma que conecta dueños de mascotas con cuidadores confiables en Costa Rica y Latinoamérica.
    
    Tus objetivos:
    1. Ayudar a los usuarios a entender cómo funciona PetCare.
    2. Responder preguntas sobre el cuidado de mascotas (perros y gatos principalmente).
    3. Explicar los servicios: Alojamiento, Guardería de Día, Paseos y Visitas a Domicilio.
    4. Ser amable, profesional y usar un tono cercano.
    5. Si te preguntan algo fuera del contexto de mascotas o PetCare, intenta redirigir la conversación amablemente.
    
    Información importante:
    - PetCare ofrece seguros para mascotas en cada reserva.
    - Todos los cuidadores son verificados manualmente.
    - Los pagos son seguros a través de la plataforma.`,
    });

    return result.toDataStreamResponse();
}
