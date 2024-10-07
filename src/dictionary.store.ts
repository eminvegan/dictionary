import { inject } from '@angular/core';
import {
  AddClientGroupEmailResponse,
  DeleteClientGroupEmailResponse,
  DictionaryInsuranceObject,
  UpdateClientGroupEmailResponse,
  DictionaryEmailObject,
} from '@deinrufde/entities/dist';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { uniq } from 'lodash';
import { DateTime } from 'luxon';
import { ClientGroupDictionaryService } from './dictionary.service';
import { initialState } from './dictionary.state';

export const ClientGroupDictionaryStore = signalStore(
  withState(initialState),
  withMethods(
    (store, dictionaryService = inject(ClientGroupDictionaryService)) => ({
      // ****************************************
      // ***** DICTIONARY EMAIL OBJECT
      // ****************************************

      async getEmails(groupId: string) {
        patchState(store, { isLoading: true });

        dictionaryService.getClientGroupEmails(groupId).subscribe({
          next: (next: []) => {
            patchState(store, {
              emails: [...next].sort(
                (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                  if (a.updatedAt && b.updatedAt) {
                    const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                    const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                    return dateB - dateA;
                  }
                },
              ),
              isLoading: false,
            });
          },
          error: (error: unknown) => {
            patchState(store, { error, isLoading: false });
            console.error(error);
          },
          complete: () => {},
        });
      },

      async addEmail(groupId: string, value: string) {
        patchState(store, { isLoading: true });

        dictionaryService
          .addClientGroupEmail({ groupId: groupId, email: value })
          .subscribe({
            next: (next: AddClientGroupEmailResponse) => {
              patchState(store, {
                emails: [...store.emails(), next.emailDictionaryObject].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },

      async updateEmail(
        groupId: string,
        id: string,
        data: Partial<DictionaryEmailObject>,
      ) {
        patchState(store, { isLoading: true });

        dictionaryService
          .updateClientGroupEmail({ groupId, id, data: { ...data } })
          .subscribe({
            next: (next: UpdateClientGroupEmailResponse) => {
              const newEmails = [...store.emails()];
              const foundIndex = newEmails.findIndex(
                (x: DictionaryEmailObject) => {
                  return x.id === next.id;
                },
              );
              newEmails.splice(foundIndex, 1, next.emailDictionaryObject);

              patchState(store, {
                emails: [...newEmails].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },

      async deleteEmail(groupId: string, id: string) {
        patchState(store, { isLoading: true });

        dictionaryService
          .deleteClientGroupEmail({ groupId: groupId, id })
          .subscribe({
            next: (next: DeleteClientGroupEmailResponse) => {
              const foundIndex = store
                .emails()
                .findIndex((x: DictionaryEmailObject) => {
                  return x.id === next.id;
                });

              const emails = [...store.emails()];
              emails.splice(foundIndex, 1);

              patchState(store, {
                emails: [...emails].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },

      // ****************************************
      // ***** DICTIONARY INSURANCE OBJECT
      // ****************************************

      async getInsurances(groupId: string) {
        patchState(store, { isLoading: true });

        dictionaryService.getClientGroupEmails(groupId).subscribe({
          next: (next: []) => {
            patchState(store, {
              emails: [...next].sort(
                (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                  if (a.updatedAt && b.updatedAt) {
                    const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                    const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                    return dateB - dateA;
                  }
                },
              ),
              isLoading: false,
            });
          },
          error: (error: unknown) => {
            patchState(store, { error, isLoading: false });
            console.error(error);
          },
          complete: () => {},
        });
      },

      async addInsurance(groupId: string, value: string) {
        patchState(store, { isLoading: true });

        dictionaryService
          .addClientGroupEmail({ groupId: groupId, email: value })
          .subscribe({
            next: (next: AddClientGroupEmailResponse) => {
              patchState(store, {
                emails: [...store.emails(), next.emailDictionaryObject].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },

      async updateInsurance(
        groupId: string,
        id: string,
        data: Partial<DictionaryEmailObject>,
      ) {
        patchState(store, { isLoading: true });

        dictionaryService
          .updateClientGroupEmail({ groupId, id, data: { ...data } })
          .subscribe({
            next: (next: UpdateClientGroupEmailResponse) => {
              const newEmails = [...store.emails()];
              const foundIndex = newEmails.findIndex(
                (x: DictionaryEmailObject) => {
                  return x.id === next.id;
                },
              );
              newEmails.splice(foundIndex, 1, next.emailDictionaryObject);

              patchState(store, {
                emails: [...newEmails].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },

      async deleteInsurance(groupId: string, id: string) {
        patchState(store, { isLoading: true });

        dictionaryService
          .deleteClientGroupEmail({ groupId: groupId, id })
          .subscribe({
            next: (next: DeleteClientGroupEmailResponse) => {
              const foundIndex = store
                .emails()
                .findIndex((x: DictionaryEmailObject) => {
                  return x.id === next.id;
                });

              const emails = [...store.emails()];
              emails.splice(foundIndex, 1);

              patchState(store, {
                emails: [...emails].sort(
                  (a: DictionaryEmailObject, b: DictionaryEmailObject) => {
                    if (a.updatedAt && b.updatedAt) {
                      const dateA = DateTime.fromISO(a.updatedAt).toMillis();
                      const dateB = DateTime.fromISO(b.updatedAt).toMillis();
                      return dateB - dateA;
                    }
                  },
                ),
                isLoading: false,
              });
            },
            error: (error: unknown) => {
              patchState(store, { error, isLoading: false });
              console.error(error);
            },
            complete: () => {},
          });
      },
    }),
  ),
);