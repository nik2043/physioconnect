import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app';

describe('app', () => {
  it('returns health response', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns 404 for unknown route', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
