import { DictionaryEmailObject, DictionaryInsuranceObject } from '@deinrufde/entities/dist';

type DictionaryState = {
  isLoading?: boolean;
  error?: any;
  companyNames?: string[];
  salutations?: string[];
  titles?: string[];
  fullNames?: { firstName?: string; lastName?: string }[];
  emails?: DictionaryEmailObject[];
  phones?: string[];
  addresses?: {
    street?: string;
    streetNumber?: string;
    zip?: string;
    city?: string;
    country?: string;
  }[];
  insurances?: DictionaryInsuranceObject[];
  insuranceNames?: string[];
  insuranceNumbers?: string[];
  insuranceClaimNumbers?: string[];
};

export const initialState: DictionaryState = {
  isLoading: false,
  companyNames: [],
  salutations: [],
  titles: [],
  fullNames: [],
  emails: [],
  phones: [],
  addresses: [],
  insurances: [],
  insuranceNames: [],
  insuranceNumbers: [],
  insuranceClaimNumbers: [],
};