import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  public async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  public async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  public async prosConsDiscusserStream(
    prosConsDiscusserDto: ProsConsDiscusserDto,
  ) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  public async translateText({ lang, prompt }: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt,
      lang,
    });
  }
}
