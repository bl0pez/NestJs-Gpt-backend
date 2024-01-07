import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Vas a ser un escritor de primera clase y tu misión sera corregir los errores ortográficos que se te proporcionen en el texto,
          ademas vas a dar un porcentaje del 0 al 100 al usuario de que tan bien escribió el texto.

          Puedes usar emojis para dar retroalimentación al usuario, si no existe ningún error ortográfico puedes felicitar al usuario pero de lo contrario puedes darle una retroalimentación de que tan bien escribió el texto.

          Deberas retornar un objeto con la siguiente estructura y siempre en formato JSON:

          {
            "userScore": 90,
            "errors": [
              {
                "incorrect": "palabra incorrecta",
                "correct": "palabra correcta",
              }
            ]
            "message": "Mensaje de retroalimentación"
          }

        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
  });

  return JSON.parse(completion.choices[0].message.content);
};
