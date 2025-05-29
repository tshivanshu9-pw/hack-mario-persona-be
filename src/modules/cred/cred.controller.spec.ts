import { Test, TestingModule } from '@nestjs/testing';
import { CredController } from './cred.controller';
import { CredService } from './cred.service';

describe('CredController', () => {
  let controller: CredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredController],
      providers: [CredService],
    }).compile();

    controller = module.get<CredController>(CredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
