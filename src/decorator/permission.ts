import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PERMISSAO_KEY = 'permission';
export const Permission = (value: string): CustomDecorator<string> => {
  return SetMetadata(PERMISSAO_KEY, value);
};
