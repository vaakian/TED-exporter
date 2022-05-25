import { describe, expect, test } from 'vitest';
import { matchID } from '..';

describe('composable', () => {
  test('should match id', () => {
    const url =
      'https://www.ted.com/talks/reshma_saujani_teach_girls_bravery_not_perfection/transcript';
    const url2 =
      'https://www.ted.com/talks/reshma_saujani_teach_girls_bravery_not_perfection';
    expect(matchID(url)).toBe(
      'reshma_saujani_teach_girls_bravery_not_perfection'
    );
    expect(matchID(url2)).toBe(
      'reshma_saujani_teach_girls_bravery_not_perfection'
    );
    const url3 =
      'https://www.tedx.com/talks/reshma_saujani_teach_girls_bravery_not_perfection';
    expect(matchID(url3)).toBeNull();
  });
});
