import { Controller } from '@nestjs/common';
import { CredService } from './cred.service';

@Controller('cred')
export class CredController {
  constructor(private readonly credService: CredService) {}
}
