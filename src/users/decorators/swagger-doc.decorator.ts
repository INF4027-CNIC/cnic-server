import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

export function SwaggerGetUsersDoc(single?: boolean) {
  return applyDecorators(
    ApiOkResponse({
      description: `The User${
        single ? '' : 's'
      } has successfully been retrieved.`,
    }),
    ApiNotFoundResponse({
      description: `The User${single ? '' : 's'} has not been found`,
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}

export function SwaggerPostUsersDoc() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'The User has successfully been created.',
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}

export function SwaggerPatchUsersDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: 'The User informations has successfully been updated.',
    }),
    ApiNotFoundResponse({
      description: 'The User has not been found',
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}

export function SwaggerPatchCodeUsersDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: 'The User Numeric Code has successfully been updated.',
    }),
    ApiNotFoundResponse({
      description: 'The User has not been found',
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}

export function SwaggerDeleteUsersDoc() {
  return applyDecorators(
    ApiOkResponse({
      description: 'The User has successfully been deleted.',
    }),
    ApiNotFoundResponse({
      description: 'The User has not been found',
    }),
    ApiForbiddenResponse({ description: 'Not authorized.' }),
  );
}
