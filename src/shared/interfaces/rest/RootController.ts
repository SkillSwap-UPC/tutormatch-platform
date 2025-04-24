import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class RootController {
  
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Root endpoint', description: 'Returns an empty response with HTTP 204 No Content' })
  @ApiResponse({ status: 204, description: 'No Content' })
  getRoot(): void {
    // El decorador @HttpCode(204) ya maneja la respuesta con código 204 No Content
    return;
  }
}