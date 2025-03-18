export interface IGetFilteredNamesArgs {
  desiredSpecNames: string[];
  allSpecNames: string[];
}

export interface ISpecSelectorHelper {
  get: () => string[];
}
