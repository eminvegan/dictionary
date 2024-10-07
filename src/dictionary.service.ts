import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {
  AddClientGroupEmailRequest,
  AddClientGroupEmailResponse,
  AddClientGroupInsuranceRequest,
  AddClientGroupInsuranceResponse,
  ClientFile,
  DeleteClientGroupEmailRequest,
  DeleteClientGroupEmailResponse,
  DeleteClientGroupInsuranceRequest,
  DeleteClientGroupInsuranceResponse,
  DictionaryEmailObject,
  DictionaryInsuranceObject,
  UpdateClientGroupEmailRequest,
  UpdateClientGroupEmailResponse,
  UpdateClientGroupInsuranceRequest,
  UpdateClientGroupInsuranceResponse,
} from '@deinrufde/entities/dist';
import { DateTime } from 'luxon';
import {
  Observable,
  Subscriber,
  from,
  map,
  shareReplay,
  take
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientGroupDictionaryService {
  private firestore: Firestore = inject(Firestore);

  private groupId = '';
  private clientFiles: ClientFile[] = [];

  constructor() {}

  // ****************************************
  // ***** DICTIONARY EMAIL OBJECT
  // ****************************************

  getClientGroupEmails(groupId: string) {
    const collectionRef = collection(
      this.firestore,
      'groups',
      groupId,
      'emails',
    );

    return collectionData(collectionRef);
  }

  addClientGroupEmail(
    request: AddClientGroupEmailRequest,
  ): Observable<AddClientGroupEmailResponse> {
    return new Observable<AddClientGroupEmailResponse>(
      (observer: Subscriber<AddClientGroupEmailResponse>) => {
        const dictionaryEmailObject = {
          groupId: request.groupId,
          value: request.email.trim().toLowerCase(),
          createdAt: DateTime.now()
            .setZone('Europe/Berlin')
            .setLocale('de-DE')
            .toISO(),
          updatedAt: DateTime.now()
            .setZone('Europe/Berlin')
            .setLocale('de-DE')
            .toISO(),
        };
        const ref = collection(
          this.firestore,
          'groups',
          request.groupId,
          'emails',
        );
        addDoc(ref, {
          ...dictionaryEmailObject,
        })
          .then((docRef) => {
            const documentReference = doc(
              this.firestore,
              `groups/${request.groupId}/emails/${docRef.id}`,
            );
            setDoc(
              documentReference,
              { ...dictionaryEmailObject, id: docRef.id },
              { merge: true },
            )
              .then(() => {
                observer.next({
                  groupId: request.groupId,
                  emailDictionaryObject: {
                    ...dictionaryEmailObject,
                    id: docRef.id,
                  },
                });
                observer.complete();
              })
              .catch((error) => {
                console.error(error);
                observer.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
            observer.error(error);
          });
      },
    );
  }

  updateClientGroupEmail(
    request: UpdateClientGroupEmailRequest,
  ): Observable<UpdateClientGroupEmailResponse> {
    return new Observable<UpdateClientGroupEmailResponse>(
      (observer: Subscriber<UpdateClientGroupEmailResponse>) => {
        const ref = doc(
          this.firestore,
          'groups',
          request.groupId,
          'emails',
          request.id,
        );
        updateDoc(ref, { ...request.data, groupId: request.groupId })
          .then(() => {
            getDoc(ref)
              .then((doc) => {
                const dictionaryEmailObject: DictionaryEmailObject = {
                  ...(doc.data() as DictionaryEmailObject),
                  ...request.data,
                  // value: doc.data().value,
                };

                observer.next({
                  groupId: request.groupId,
                  id: request.id,
                  emailDictionaryObject: dictionaryEmailObject,
                });
                observer.complete();
              })
              .catch((error) => {
                console.error(error);
                observer.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
            observer.error(error);
          });
      },
    );
  }

  deleteClientGroupEmail(
    request: DeleteClientGroupEmailRequest,
  ): Observable<DeleteClientGroupEmailResponse> {
    const docRef = doc(
      this.firestore,
      'groups',
      request.groupId,
      'emails',
      request.id,
    );

    return from(deleteDoc(docRef)).pipe(
      map(() => ({ groupId: request.groupId, id: request.id })),
      take(1),
      shareReplay(),
    );
  }

  // ****************************************
  // ***** DICTIONARY INSURANCE OBJECT
  // ****************************************

  getClientGroupInsurances(groupId: string) {
    const collectionRef = collection(
      this.firestore,
      'groups',
      groupId,
      'insurances',
    );

    return collectionData(collectionRef);
  }

  addClientGroupInsurance(
    request: AddClientGroupInsuranceRequest,
  ): Observable<AddClientGroupInsuranceResponse> {
    return new Observable<AddClientGroupInsuranceResponse>(
      (observer: Subscriber<AddClientGroupInsuranceResponse>) => {
        const dictionaryInsuranceObject = {
          groupId: request.groupId,
          ...(request.fileId && { fileId: request.fileId }),
          createdAt: DateTime.now()
            .setZone('Europe/Berlin')
            .setLocale('de-DE')
            .toISO(),
          updatedAt: DateTime.now()
            .setZone('Europe/Berlin')
            .setLocale('de-DE')
            .toISO(),
          ...request.dictionaryInsuranceObject,
        };
        const ref = collection(
          this.firestore,
          'groups',
          request.groupId,
          'insurances',
        );
        addDoc(ref, {
          ...dictionaryInsuranceObject,
        })
          .then((docRef) => {
            const documentReference = doc(
              this.firestore,
              `groups/${request.groupId}/insurances/${docRef.id}`,
            );
            setDoc(
              documentReference,
              { ...dictionaryInsuranceObject, id: docRef.id },
              { merge: true },
            )
              .then(() => {
                observer.next({
                  groupId: request.groupId,
                  ...(request.fileId && { fileId: request.fileId }),
                  dictionaryInsuranceObject: {
                    ...dictionaryInsuranceObject,
                    id: docRef.id,
                  },
                });
                observer.complete();
              })
              .catch((error) => {
                console.error(error);
                observer.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
            observer.error(error);
          });
      },
    );
  }

  updateClientGroupInsurance(
    request: UpdateClientGroupInsuranceRequest,
  ): Observable<UpdateClientGroupInsuranceResponse> {
    return new Observable<UpdateClientGroupInsuranceResponse>(
      (observer: Subscriber<UpdateClientGroupInsuranceResponse>) => {
        const ref = doc(
          this.firestore,
          'groups',
          request.groupId,
          'insurances',
          request.id,
        );
        updateDoc(ref, { ...request.data, groupId: request.groupId })
          .then(() => {
            getDoc(ref)
              .then((doc) => {
                const dictionaryInsuranceObject: DictionaryInsuranceObject = {
                  ...(doc.data() as DictionaryInsuranceObject),
                  ...request.data,
                };

                observer.next({
                  groupId: request.groupId,
                  id: request.id,
                  dictionaryInsuranceObject: dictionaryInsuranceObject,
                });
                observer.complete();
              })
              .catch((error) => {
                console.error(error);
                observer.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
            observer.error(error);
          });
      },
    );
  }

  deleteClientGroupInsurance(
    request: DeleteClientGroupInsuranceRequest,
  ): Observable<DeleteClientGroupInsuranceResponse> {
    const docRef = doc(
      this.firestore,
      'groups',
      request.groupId,
      'insurances',
      request.id,
    );

    return from(deleteDoc(docRef)).pipe(
      map(() => ({
        groupId: request.groupId,
        ...(request.fileId && { fileId: request.fileId }),
        id: request.id,
      })),
      take(1),
      shareReplay(),
    );
  }
}
