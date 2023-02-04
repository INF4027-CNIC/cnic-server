import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export function SwaggerCreateAdminDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: `Admin has successfully been created.`,
    }),
    ApiNotFoundResponse({
      description: `The User ref has not been found`,
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}

export function SwaggerFindAdminDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: `Admin has successfully been retrieved.`,
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}
