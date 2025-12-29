import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SumService } from './sum.service';

@Controller('sum')
export class SumController {
  constructor(private readonly sumService: SumService) {}

  @Get('formula')
  sumFormula(@Query('n') n: string) {
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1) {
      throw new BadRequestException('Parameter n must be a positive integer');
    }
    return {
      method: 'formula',
      input: num,
      result: this.sumService.sumToNFormula(num),
      description: 'Mathematical Formula (Gauss\'s Formula)',
      complexity: { time: 'O(1)', space: 'O(1)' },
    };
  }

  @Get('iterative')
  sumIterative(@Query('n') n: string) {
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1) {
      throw new BadRequestException('Parameter n must be a positive integer');
    }
    return {
      method: 'iterative',
      input: num,
      result: this.sumService.sumToNIterative(num),
      description: 'Iterative Loop',
      complexity: { time: 'O(n)', space: 'O(1)' },
    };
  }

  @Get('recursive')
  sumRecursive(@Query('n') n: string) {
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1) {
      throw new BadRequestException('Parameter n must be a positive integer');
    }
    if (num > 1000) {
      throw new BadRequestException(
        'Parameter n must be <= 1000 for recursive method to avoid stack overflow',
      );
    }
    return {
      method: 'recursive',
      input: num,
      result: this.sumService.sumToNRecursive(num),
      description: 'Recursive Approach',
      complexity: { time: 'O(n)', space: 'O(n)' },
    };
  }

  @Get('all')
  sumAll(@Query('n') n: string) {
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1) {
      throw new BadRequestException('Parameter n must be a positive integer');
    }
    if (num > 1000) {
      throw new BadRequestException(
        'Parameter n must be <= 1000 for recursive method to avoid stack overflow',
      );
    }
    return this.sumService.calculateAll(num);
  }
}
