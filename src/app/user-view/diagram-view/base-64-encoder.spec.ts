import {encode64} from './base64-encoder';
import pako from 'pako';

describe('Encode64', () => {
  it('given encoder when encode in base 64 then return correct code', () => {
    expect(encode64(pako.deflate('skinparam Handwritten true\n' +
      'skinparam DefaultTextAlignment center\n' +
      'skinparam NoteBackgroundColor lightyellow\n' +
      'skinparam NoteBorderColor darkgray\n' +
      'note "This diagram still needs to be done" as tbd')))
      .toBe('U9nTopiAmq0C1D3Ufn2-IJv5gbI-' +
      'W6mfwyMo5BHQ7D_U6m8Xf1aOvarPiZxHSOKRAcsU8rWXl79NljEL7rWb1dx5INBIbJLWQi' +
      '7-e-uMVCPfIMvLwM9Y3atFiRE8RV_IdDW_Yj3R2_TEsm3zCES2b36zROai0ifC1S9WP21J' +
      'xW5R7Ua0WQj7m000');
  });
});

